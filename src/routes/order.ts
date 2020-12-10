import { get_all_orders_by_user,
get_single_order_by_user,
create_order,
delete_order,
update_order,
} from './../controllers/orderController';
import {Router, Request, Response} from 'express'
const router = Router();
// import {
//   get_all_orders_by_user,
// get_single_order_by_user,
// create_order,
// delete_order,
// update_order,
// } from

/* GET users listing. */
/* GET users listing. */
router.get('/', get_all_orders_by_user);
router.get('/:id', get_single_order_by_user);
router.post('/', create_order);
router.delete('/:id', delete_order);
router.patch('/:id', update_order);

export default router;



// var express = require('express');
// var router = express.Router();
// const User = require('../models/user')
// const http_status_code= require('http-status-codes')

// const { ReasonPhrases,
//   StatusCodes,
//   getReasonPhrase,
//   getStatusCode,
// } = http_status_code;

// /* GET users listing. */
// router.post('/', function(req:Request, res, next) {
// const {orders,
//   firstName,
//   lastName,
//   email,
//   phoneNumber,
//   date_registered} = req.body

//   if(!firstName || !lastName){
//     res.status(StatusCodes.UNAUTHORIZED)
//     .send({ error: "user must have a first name and last name"});
//   }

//   if(!email){
//     res.status(StatusCodes.UNAUTHORIZED)
//     .send({ error: "user must have an email"});
//   }

//   var user =  new User(req.body)
//   console.log(user)
//   user.save(function (err, data) {
//       if (err) {
//         console.log(err)
//         return err;
//       }else {
//         console.log('saved', data);
//       }
// })

//   // res.send('respond with a resource');
//   });

// module.exports = router;
