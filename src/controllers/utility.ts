import {sign} from 'jsonwebtoken';
import {compare} from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { type } from 'os';

interface IValidateData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

//validates users
export const validateData = (userDetails:IValidateData) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  } = userDetails

  if (!firstName || !lastName) {
    return "user must have a first name and last name"
  } if (!phoneNumber || phoneNumber.length !== 11) {
    return "Users Phone number must have 11 characters"
  }
  if (!email) {
    return "user must have an email"
  } if (!password) {
    return "user must include a password"
  } else {
    return null
  }
}

interface IUser  {
  id:string
}

//generates users token
export const genToken:any = (user:IUser) => {
  const {id} = user;
  return sign({
    sub: id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
  }, 'ecommerce');
}

//check if users password is valid
export const handleCheckValidPassword = async function (password:string, userPassword:string) {
  const result = await compare(password, userPassword);
  return result;
}

declare module "express-serve-static-core" {
  // first, declare that we are adding a method to `Response` (the interface)
  export interface Response {
    paginatedResults:any
  }
}
export const paginatedResult:any  = (model:any) => async(
  req:Request, res:Response, next:NextFunction) => {

    const page = req.query.page || 1
    const size = req.query.size || await model.countDocuments().exec()
   const  startIndex = (+page - 1) * (+size)
   const endIndex = (+page)  * (+size)

   const results:any = {}

   if(endIndex < await model.countDocuments().exec()){
    results.next = {
      page: +page + 1,
      size: +size
    }
  }

  if(startIndex > 0){
    results.previous = {
      page: +page - 1,
      size:+size
    }
  }

    try {
      results.results = await model.find().limit(parseInt(size)).skip(startIndex).exec()
     results.totalCount =  await model.countDocuments().exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
}
