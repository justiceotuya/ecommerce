import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose'
import Product from '../models/productModel'

/**
 *
 * TODO:
 * 1. add pagination
 * 2. add authorization
 * 3. get user id from token
 */
// Display list of all Orders.

interface Iresult  {
  next: {
    page:number,
    size:number
  } | any
  previous: {
    page:number,
    size:number
  } | any
}



export const get_all_products = async (req: Request, res: Response): Promise<void> => {
  const { available, page, size } = req.query;
  let products: any = []
  const results:(Iresult | Record<string, unknown>) = {}



  try {
    //avalable flag is present and is a boolean true or false
    if (available) {
      if (available == 'true' || available == 'false') {
        products = await Product.find({ isAvailable: { $eq: available } })
        // results.result = products.slice(startIndex, endIndex)
      } else {
        //avalable flag is present and is not a boolean true or false
        products = []
      }
    }
    else {
      products = await Product.find()
      // results.result = products.slice(startIndex, endIndex)
    }
    res.status(200).send({ "message": 'success', data: res.paginatedResults })
  } catch (error) {
    res.status(403).send({ message: "Something Unexpected happened", error:error.message })
  }
};



// Display list of all Orders.
export const get_one_product = function (req: Request, res: Response) {
  // const productId = mongoose.Types.ObjectId(req.params.id);
  Product.findById(req.params.id, function (err: Error, item) {
    if (err) {
      res.status(422).send({ message: "product id is invalid" })
    } else {
      if (item === null) {
        res.status(404).send({ message: "product does not exist" })
      } else {
        res.status(200).send(item)
      }
    }
  });
}

// Display detail page for a specific Order.
export const create_product = function (req: Request, res: Response, next: NextFunction) {
  const {
    productName,
    productSku,
    price,
  } = req.body

  if (!productName) {
    res.status(403).send({ error: 'product must have a name' })
  }
  if (!productSku) {
    res.status(403).send({ error: 'product must have an sku' })
  }
  if (!price) {
    res.status(403).send({ error: 'product must have a price' })
  } else {

    const product = new Product({ ...req.body, created_on: Date.now() });

    Product.findOne({ productSku }).exec((err, found_product) => {
      if (err) { return next(err); }
      if (found_product) {
        res.status(403).send({ error: "Product already exists" });
      } else {
        product.save(function (err) {
          if (err) { return next(err); }
          res.status(200).send({ data: product, message: 'Product created successfully' });
        })
      }
    })
  }
};

export const create_multiple_products = async function (req: Request, res: Response) {

if(Array.isArray(req.body)){
  req.body.map((item:any )=> item.createdAt= Date.now())
}else {
  req.body.createdAt = Date.now()
}

  try {
    const operation = await Product.insertMany(req.body);
    res.status(200).send({ data: operation,
      message: ` items created successfully`})
  } catch (error) {
    res.status(500).send({ message: 'something unexpected happened', error: error.message })
  }
};

// Handle Order delete on POST.
export const delete_product = async (req: Request, res: Response): Promise<any> => {
  const productId = Types.ObjectId(req.params.id);

  try {
    const product = await Product.findOneAndDelete({ _id: productId }, {});
    if (product === null) {
      res.status(403).send({ error: "Product does not exist" });
    } else {
      res.status(200).send({ message: 'Product successfully Deleted' })
    }
  } catch (error) {
    res.status(400).send({ status: "Error deleting Product", error });
  }
}

// Handle Order update on POST.
export const update_product = async (req: Request, res: Response): Promise<any> => {
  const productId = Types.ObjectId(req.params.id);
  const product = { ...req.body, updated: Date.now() }
  //todo do not update the sku if it is same
  try {
    const data = await Product.findOneAndUpdate(
      { _id: productId }, product, { new: true });
    if (!data) {
      res.status(403).send({ error: "Product does not exist" });
    } else {
      res.status(200).send({ message: ' product successfully updated', data })
    }
  } catch (error) {
    res.status(400).send({ status: "error updating product", error });
  }
}
