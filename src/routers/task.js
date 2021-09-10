import express from 'express'
import Task from '..//models/task.js'
import auth from '../middleware/auth.js'
const router=new express.Router()


router.post('/tasks', auth,async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    try {
        const response = await task.save()
        res.status(201).send(response)
    } catch (error) {
        res.status(400).send(err)
    }
    // task.save().then((result) => {
    //     res.status(201).send(result)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // });
})

router.get('/tasks', auth,async (req, res) => {
    const match={}
    const sort={}
    const options={}
    for (var key in req.query) {
        if(key === 'sortBy'){
            const parts=req.query.sortBy.split(':')
            sort[parts[0]]=parts[1] ==='desc' ? -1:1
            options.sort=sort
        }else if( key ==='limit' || key=='skip'){
            options[key]=parseInt(req.query[key])
        }
        
      }
    // console.log(options)
    if(req.query.completed){
        match.completed=req.query.completed ==='true'
    }
    if(req.query.sortBy){
       
    }
    try {
        // const tasks=await Task.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            match,
            options
        })
        if (!req.user.tasks) {
            return res.status(404).send(req.user.tasks)
        }
        res.status(200).send(req.user.tasks)
    } catch (error) {
 res.status(500).send(error)
    }

    // Task.find().then((result) => {
    //     res.status(200).send(result)
    // }).catch((err) => {
    //     res.status(500).send(err)
    // });
})
router.get('/tasks/:id',auth,async (req, res) => {

    const _id = req.params.id
    try {
        //const task=await  Task.find({ _id: id })
        const task =await Task.findOne({_id,owner:req.user._id})
        if (!task) {
            return res.status(404).send(task)
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
    // Task.find({ _id: id }).then((result) => {
    //     if (!result) {
    //         return res.send(result)
    //     }
    //     res.status(200).send(result)

    // }).catch((err) => {
    //     res.status(500).send(err)
    // });
})

router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['description','completed']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({'error':'ınvalid update'})
    }
    const _id=req.params.id
    try {

        // const task=await Task.findById(_id)
        const task =await Task.findOne({_id,owner:req.user._id})
        if(!task){ 

            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        //const task=await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try {
        // const response=await Task.findByIdAndDelete(_id)
        const task =await Task.findOneAndDelete ({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.send(500).send()
    }
})

export default router