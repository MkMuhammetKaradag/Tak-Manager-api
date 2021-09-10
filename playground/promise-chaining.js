import '../src/db/mongoose.js'
import User from '../src/models/user.js'
// User.findByIdAndUpdate('612e0fa085bee8359d64f4a7',{age:1}).then((result) => {
//     console.log(result)
//     return User.countDocuments({age:0})
// }).then((result)=>{
//     console.log("aaaaaaaaaaaa",result)
// }).catch((err) => {
//     console.log(err)
// });


const updateAgeAndCount=async(id,age)=>{
    const user=await User.findByIdAndUpdate(id,{age:age})
    const count=await User.countDocuments({age})
    return count 
}
updateAgeAndCount('612e0fa085bee8359d64f4a7',2).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});
