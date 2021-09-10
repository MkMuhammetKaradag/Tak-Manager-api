import mongodb from 'mongodb'
import { ObjectId } from 'mongodb'

const MongoClient = mongodb.MongoClient
const connectionURL = "mongodb+srv://muhammetkaradag:HAnDYGNSavI4WByA@cluster0.qbo2i.mongodb.net/task-manager?retryWrites=true&w=majority"
const database = "task-manager"

// MongodbClient.connect(connectionURL,{ıserNewUrlParser:true},(error,client)=>{
//     if(error){
//         return console.log("unable to connet to database")
//     }
//     console.log("conected corrently")

// })
const mongoConnect = (callback) => {
    MongoClient.connect(connectionURL)
        .then((client) => {
            console.log("connected:");
            callback(client);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

mongoConnect((client) => {
    const db = client.db(database)

    // db.collection('users').insertOne({
    //     name:'Muhammet',
    //     age:23
    // }).then((result)=>{
    //     console.log(result)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })

    // db.collection('users').insertMany([{
    //     name: 'Muhammet',
    //     age: 23
    // },
    // {
    //     name: 'ali',
    //     age: 60
    // }
    // ]).then((result) => {
    //     console.log(result)
    // })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // db.collection('tasks').insertMany([{
    //     description: 'clean the  house',
    //     completed: true
    // },
    // {
    //     description: 'renew  inspection',
    //     completed: false
    // }
    // ]).then((result) => {
    //     console.log(result)
    // })
    //     .catch((err) => {
    //         console.log(err)
    //     })


    // const ObjectId=mongodb.ObjectId
    // const id=new ObjectId()
    // console.log(id)
    // console.log(id.id)
    // console.log(id.id.length)
    // console.log(id.getTimestamp())
    // db.collection('users').insertOne({
    //     name:'Muhammet',
    //     _id:id,
    //     age:23
    // }).then((result)=>{
    //     console.log(result)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })





    // db.collection('users').findOne({ _id: new ObjectId("612c9d2b4470bde833ca6f1d") })
    //     .then((result) => {
    //         console.log(result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // db.collection('users').find({ age:23 }).toArray()
    //     .then((result) => {
    //         console.log(result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // db.collection('tasks').findOne({_id:new ObjectId('612c9aef94689575fbf12994')})
    // .then((result) => {
    //     console.log(result)
    // })
    // .catch((err) => {
    //     console.log(err)
    // })
    // db.collection('tasks').find({completed:true}).toArray()
    // .then((result) => {
    //     console.log(result)
    // })
    // .catch((err) => {
    //     console.log(err)
    // })


    // db.collection('users').updateOne({_id:new ObjectId('612c9da71d56a1662ff1b0f8')},{$set:{
    //     name:'Ali Karadag'
    // }}).then((result) => {
    //         console.log(result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // db.collection('users').updateOne({_id:new ObjectId('612c9da71d56a1662ff1b0f8')},{$inc:{
    //     age:2
    // }}).then((result) => {
    //         console.log(result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // db.collection('tasks').updateMany({completed:true},{$set:{
    //     completed:false
    // }}).then((result) => {
    //         console.log(result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })





        db.collection('tasks').deleteOne({_id:new ObjectId('612c9aef94689575fbf12994')})
        .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })

            // db.collection('users').deleteMany({
            //     age:60
            // })
            // .then((result) => {
            //         console.log(result)
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })
})