const express=require('express');

const router=express.Router();
const adminController=require('../controllers/admin')
const path=require('path')

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','AddProduts.html'))
})

router.post('/products',adminController.postAddProduct);

router.get('/getAllProducts',adminController.getProducts);

router.post('/cart',adminController.postAddCart);

router.get('/cart',adminController.getCartProducts)







module.exports=router;