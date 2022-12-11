const Product=require('../models/product')

exports.postAddProdutc=(req,res)=>{
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