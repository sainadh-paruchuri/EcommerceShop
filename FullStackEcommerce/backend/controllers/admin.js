const Product=require('../models/product')
const Cart=require('../models/cartItem');

exports.postAddProduct=(req,res)=>{
    console.log(req.body);
    const productName=req.body.productName;
    const imageName=req.body.imageName;
    const price=req.body.price;

    console.log(productName);
    console.log(imageName);

    Product.create({
        productName:productName,
        imageName:imageName,
        price:price
    })
    .then((result) => {
      console.log(result);  
    }).catch((err) => {
        console.log(err);
    });
    res.redirect('/');
}

exports.getProducts=(req,res)=>{
    Product.findAll().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
    });

}
exports.postAddCart=(req,res)=>{
     console.log(req.body);
    const productName=req.body.itemName;
    const imageName=req.body.itemImage;
    const quantity=req.body.itemQuantity;
    const price=req.body.itemPrice;
    Cart.create({
        productName:productName,
        imageName:imageName,
        quantity:quantity,
        price:price
    })
    .then((result) => {
      console.log(result);  
    }).catch((err) => {
        console.log(err);
    });
    res.redirect('/');

}

exports.getCartProducts=(req,res)=>{
    Cart.findAll().then((result) => {
         res.status(200).json(result)        
    }).catch((err) => {
        console.log(err);
    });

}