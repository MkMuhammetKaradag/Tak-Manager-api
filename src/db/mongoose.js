import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connectionURL = process.env.CONNECTION_URL

mongoose.connect(connectionURL)
    .then(() => {
        console.log("connected:");

    })
    .catch((err) => {
        console.log(err);

    });


// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required:true,
//         trim:true

//     },
//     email:{
//         type:String,
//         required:true,
//         validate(value){
//             if(!validator.isEmail(value)) {
//                 throw new Error('Email is   invalid')
//             }
//         },
//         trim:true,
//         lowercase:true
//     },
//     age: {
//         type: Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new   Error('age must  be a postive number')
//             }
//         }

//     },
//     password:{
//         type:String,
//         required:true,
//         minlength:7,
//         trim:true,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('pasword   cannot  contain  "password')
//             }
//         }
//     }
// })

// const me = new User({
//     name: '   Muhammet   ',
//     email:"deneme@gmail.com",
//     password:' 123456789   '
// })
// me.save().then((me) => {
//     console.log(me)
// }).catch((err) => {
//     console.log(err.message)
// })


// const Task=mongoose.model('Task',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const task=new Task({
//     description:'açıklma muhammet Deneme   '
// })
// task.save().then((task) => {
//         console.log(task)
//     }).catch((err) => { 
//         console.log(err.message)
//     })






