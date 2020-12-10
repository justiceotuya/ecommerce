import { NextFunction, Request, Response } from 'express';
import {Types} from 'mongoose'
import Product from '../models/productModel'

// Display list of all Orders.
export const get_all_products = async (req:Request, res:Response):Promise<void> => {
  try {
    const products = await Product.find()
    res.status(200).send({"message": 'success', data:products})
  } catch (error) {
    res.status(403).send({message: "Something Unexpected happened", error})
  }
};

// Display list of all Orders.
export const get_one_product =  function (req:Request, res:Response) {
  // const productId = mongoose.Types.ObjectId(req.params.id);
  Product.findById(req.params.id, function (err:Error, item) {
    if(err){
      res.status(422).send({message: "product id is invalid"})
    }else{
     if(item === null){
      res.status(404).send({message: "product does not exist"})
     }else{
       res.status(200).send(item)
     }
    }
  });
 }

// Display detail page for a specific Order.
export const create_product = function (req:Request, res:Response, next:NextFunction) {
  const {
    product_name,
    product_sku,
    price,
  } = req.body

  if (!product_name) {
    res.status(403).send({ error: 'product must have a name' })
  }
  if (!product_sku) {
    res.status(403).send({ error: 'product must have an sku' })
  }
  if (!price) {
    res.status(403).send({ error: 'product must have a price' })
  } else {

    const product = new Product({ ...req.body, created_on: Date.now() });

    Product.findOne({ product_sku }).exec((err, found_product) => {
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

// Handle Order delete on POST.
export const delete_product = async (req:Request, res:Response):Promise<any>  => {
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
export const update_product = async (req:Request, res:Response):Promise<any>  => {
  const productId = Types.ObjectId(req.params.id);
  const product = { ...req.body, updated: Date.now() }
  //todo do not update the sku if it is same
  try {
    const data = await Product.findOneAndUpdate(
      { _id: productId }, product, { new: true });
      if(!data){
        res.status(403).send({ error: "Product does not exist" });
      }else{
        res.status(200).send({ message: ' product successfully updated', data })
      }
  } catch (error) {
    res.status(400).send({ status: "error updating product", error });
  }
}
