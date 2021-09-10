import '../src/db/mongoose.js'
import Task from '../src/models/task.js'
// Task.findByIdAndDelete('612e0656ac0bf95cbe108ba4').then((result) => {
//     console.log(result)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log("aaaaa:",result)
// }).catch((err) => {
//     console.log(err)
// });

const deleteTaskAndCount=async(id,completed)=>{
    const task=await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments({completed})
    return count 
}
deleteTaskAndCount('612e286ce7687e357bd4dc40',false).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});
