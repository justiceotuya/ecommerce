//Import the mongoose module
// const mongoose = require('mongoose');
import mongoose, { connect} from 'mongoose'
// (mongoose).Promise == global.Promise;
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017/ecommerce';

const handleConnectionToDB:any = ():Promise<void>  => {
    return connect(mongoDB,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        console.log("Database conection Ok");
    })
        .catch((err:string) => console.log(err));
}


export default handleConnectionToDB
