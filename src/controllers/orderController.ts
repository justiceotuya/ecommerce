import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Order from '../models/orderModel';
import User from '../models/userModel';
import Product from '../models/productModel';


/**
 *
 * TODO:
 * 1. add pagination
 * 2. add authorization
 * 3. get user id from token
 */
// Display list of all Orders.
export const get_all_orders_by_user = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.find()
        .populate('products')
        .populate('user', 'firstName lastName email')
        res.status(200).send({ "message": 'success', data: order })
    } catch (error) {
        res.status(403).send({ message: "Something Unexpected happened", error :error.message})
    }
}
// Display detail page for a specific Order.
export const get_single_order_by_user = async(req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate('products', `
        isAvailable
        _id
        productName
        productSku
        price
        productPicture
        productDescription`)
        .populate('user', '_id firstName lastName email')
        res.status(200).send({ "message": 'success', data: order })
    } catch (error) {
        res.status(403).send({ message: "Something Unexpected happened", error :error.message})
    }
};

// Handle Order create on POST.

export const create_order = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, products } = req.body
        const userId = mongoose.Types.ObjectId(user);
        const usersData = await User.findById(userId)
        if (!usersData) {
            res.status(404).send({ message: 'Order must have a user' })
        }
        if (!Array.isArray(products) || products.length <= 0) {
            res.status(404).send({ message: 'There must be at least one product in an order' })
        }else{


        //convert ids to mongoose object ids
        const productIds:any = products.map((ele: string) => new mongoose.Types.ObjectId(ele));
        const allProducts: any = await Product.find({ _id: productIds }, 'price').exec();
        const totalPrice: number = allProducts.map((item: { price: string }) => item.price)
            .reduce((a: string, b: string) => parseInt(a) + parseInt(b), 0);

        const newOrder = new Order({
            user: userId,
            created_on: Date.now(),
            price: totalPrice,
            products: productIds
        })

        await newOrder.save()
        res.status(200).send({ data: newOrder, message: 'Order created successfully' });
    }

    } catch (error) {
        res.status(500).send({ message: "Something Unexpected happened", error:error.message })
    }
};


// Handle Order delete on POST.
export const delete_order = async (req:Request, res:Response):Promise<any>  => {
    const orderId = mongoose.Types.ObjectId(req.params.id);

    try {
      const order = await Order.findOneAndDelete({ _id: orderId }, {});
      if (order === null) {
        res.status(403).send({ error: "order does not exist" });
      } else {
         res.status(200).send({ message: 'order successfully Deleted' })
      }
    } catch (error) {
      res.status(400).send({ status: "Error deleting order", error });
    }
  }

// Handle Order update on POST.
export const update_order = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: update order');
};
