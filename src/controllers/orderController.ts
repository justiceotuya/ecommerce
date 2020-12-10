import { Request, Response } from 'express';
import Order from '../models/orderModel';

// Display list of all Orders.
export const get_all_orders_by_user = async (req:Request, res:Response) :Promise<void> => {
    try {
      const order = await Order.find()
      res.status(200).send({"message": 'success', data:order})
    } catch (error) {
      res.status(403).send({message: "Something Unexpected happened", error})
    }
}
// Display detail page for a specific Order.
export const get_single_order_by_user = function (req:Request, res:Response) {
    res.send('NOT IMPLEMENTED: Order detail: ' + req.params.id);
};

// Handle Order create on POST.
export const create_order = function (req:Request, res:Response) {
    res.send('NOT IMPLEMENTED: create order');
};


// Handle Order delete on POST.
export const delete_order = function (req:Request, res:Response) {
    res.send('NOT IMPLEMENTED: delete order');
};

// Handle Order update on POST.
export const update_order = function (req:Request, res:Response) {
    res.send('NOT IMPLEMENTED: update order');
};
