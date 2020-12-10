import {sign} from 'jsonwebtoken';
import {compare} from 'bcryptjs';

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
export const genToken = (user:IUser) => {
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


