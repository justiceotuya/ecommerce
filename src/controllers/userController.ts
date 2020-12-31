// export {};
import {hashSync, genSaltSync} from 'bcryptjs';
import mongoose from 'mongoose';
import base64url from 'base64url';
import { Request, Response, NextFunction } from 'express';

import User from '../models/userModel';
require('../config/passport')

import {
  validateData,
  genToken,
  handleCheckValidPassword,
} from './utility'

/**
 *
 * TODO:
 * 1. add pagination
 * 2. add authorization
 * 3. get user id from token
 */
// Handle Register User.
export const create_user =  async function (req:Request, res:Response, next:NextFunction) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password } = req.body

  const error =  validateData({ firstName, lastName, phoneNumber, email, password })


  if (error) {
    res.status(403).send({ error });
  } else {
    const hashedPassword = hashSync(req.body.password, genSaltSync(10))
    const user = new User({ ...req.body, password: hashedPassword, createdAt: Date.now() });
    try {
      const userWithEmail = await User.findOne({ email })
      const userWithPhoneNumber = await User.findOne({ phoneNumber})
      if(userWithEmail){
        res.status(403).send({ error: "This email Has already been used to register" });
      }else if(userWithPhoneNumber){
          res.status(403).send({ error: "This number has already been used to register" });
        }else {
        user.save(function (err) {
                if (err) { return next() }
                res.status(200).send({
                  data: user, message: "Registration successful please login to continue" });
              })
      }
    } catch (error) {
      res.status(500).send('something unexpected happened please try again')
      return next()
    }
  }
}


//Handle Login User
export const login_user =  async function (req:Request, res:Response, next:NextFunction) {
  const {email, password } = req.body

  // let error = await validateData({ email, password })


  if (!email || !password) {
    res.status(403).send({ error: 'email and password must be present' });
  } else {
    //find user with the provided email
    const foundUser = await User.findOne({ email });
    try {
      if (!foundUser) {
        res.status(403).send({ error: "The user dos not exist" });
      }else {
        const isValidPassword = await handleCheckValidPassword(password, foundUser.password)
              if (foundUser && !isValidPassword) {
                res.status(403).send({ error: "The email or password is incorrect" });
              }else{
                // Generate JWT token
                const token = genToken(foundUser)
                res.status(200).json({ message: 'sign in successful', token })
              }
            }
    } catch (error) {
      res.status(500).send('something unexpected happened please try again')
      return next()
    }
  }
}


// Handle Update User.
export const update_user = async (req:Request, res:Response) => {
  const userId = mongoose.Types.ObjectId(req.params.id);
  const user = { ...req.body, updated: Date.now() }

  try {
    const data = await User.findOneAndUpdate({ _id: userId }, user, { upsert: true, new: true });
     res.status(200).send({ message: ' user successfully updated', data })
  } catch (error) {
    res.status(400).send({ status: "error updating user", error });
  }
}


// Handle User delete on POST.
export const delete_user = async (req:Request, res:Response) => {
  const userId = mongoose.Types.ObjectId(req.params.id);

  try {
    await User.findOneAndDelete({ _id: userId }, {});
     res.status(200).send({ message: ' User successfully Deleted' })
  } catch (error) {
    res.status(400).send({ status: "Error deleting User", error });
  }
}

export const get_user =  async  (req:Request, res:Response) => {
  try {
    const user = await  User.findById(req.params.id)
    .select('firstName lastName email phoneNumber email createdAt');
    if(user === null){
      res.status(200).send({data: user, message:'user does not exist'})
    }else {
      res.status(200).send({data: user})
    }
  } catch (error) {
    res.status(500).send({message: "user's id is invalid", error: error.message})
  }
}

// Display list of all Users Orders.
export const get_all_users = async (req:Request, res:Response):Promise<void> => {
  try {
    const users = await User.find()
    .select('firstName lastName email phoneNumber email createdAt');
    res.status(200).send({"message": 'success', data:res.paginatedResults})
  } catch (error) {
    res.status(403).send({message: "Something Unexpected happened", error:error.message})
  }
};
