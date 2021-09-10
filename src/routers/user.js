import express from 'express'

import User from '..//models/user.js'
import auth from '../middleware/auth.js'
import multer from 'multer'
import sharp from 'sharp'
import {sendWelcomeEmail,sendCancelationEmail} from '../emails/account.js '
const router=new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        const response = await (await user.save()).getPublicProfile()
        sendWelcomeEmail(response.email,response.name)
        const token=await user.generateAuthToken()
        res.status(201).send({response,token})
    } catch (error) {
        //console.log(error)
        res.status(400).send(error)
    }
    // user.save().then((result) => {
    //     res.status(201).send(result)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // });

})
router.get('/users/me',auth,async (req, res) => {
    const user= await req.user.getPublicProfile()
    res.send(user)

})
router.patch('/users/me',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','age','password']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({'error':'ınvalid update'})
    }

    try {
        
        updates.forEach((update)=>req.user[update]=req.body[update])
        const user=await(await req.user.save()).getPublicProfile()
        // const user=await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        // if(!user){ 

        //     return res.status(404).send()
        // }
        
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/users/me',auth,async(req,res)=>{
    try {
        // const response=await User.findByIdAndDelete(req.user._id)
        // if(!response){
        //     return res.status(404).send()
        // }
        sendCancelationEmail(req.user.email,req.user.name)
        const user=await (await req.user.remove()).getPublicProfile()


        res.send(user)
    } catch (error) {
        res.send(500).send()
    }
})
router.post('/users/logout',auth,async(req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return  token.token  !== req.token
        })
        await req.user.save()
        res.send('logout')
    } catch (error) {
        res.status(500).send()
    }
})
router.post('/users/logoutAll',auth,async(req,res)=>{
    console.log(req.user)
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send('logout')
    } catch (error) {
        res.status(500).send()
    }
})
router.post('/users/login',async(req,res)=>{

    try {
        const user= await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        const newuser= await user.getPublicProfile()
        res.send({user:newuser,token})
    } catch (error) {
        res.status(400).send()
    }
})

const upload=multer({
    //est:'avatars',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
  
            return cb(new Error('please an image'))
        }
        cb(undefined,true)
    }
})
router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    try {
        // req.user.avatar=req.file.buffer
        req.user.avatar=buffer
        await req.user.save()
        res.send()
    } catch (error) {
        res.send(500).send()
    }
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    try {
        req.user.avatar=undefined
        await req.user.save()
        res.send()
    } catch (error) {
        res.send(500).send()
    }
})

router.get('/users/:id/avatar',async(req,res)=>{
    try {
        const user= await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})


export default router