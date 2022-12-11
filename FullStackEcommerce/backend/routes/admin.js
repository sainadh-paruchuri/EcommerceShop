const express=require('express');

const router=express.Router();
const adminController=require('../controllers/admin')
const path=require('path')

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','AddProduts.html'))
})

router.post('/products',adminController.postAddProdutc);

router.get('/getAllProducts',adminController.getProducts);







module.exports=router;