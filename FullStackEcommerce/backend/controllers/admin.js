const Product=require('../models/product')
const Cart=require('../models/cart');
const CartItem=require('../models/cartItem');

const ITEMS_PER_PAGE=2;
exports.postAddProduct=(req,res)=>{
    console.log(req.body);
    const productName=req.body.productName;
    const imageName=req.body.imageName;
    const price=req.body.price;
    req.user.createProduct({
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
    // console.log(req.params.productName)
    const page=+req.query.page||1;
    let totalItems;
    
    Product.count()
    .then((total)=>{
        totalItems=total;
        return Product.findAll({ 
        offset:(page-1)*ITEMS_PER_PAGE,
        limit:ITEMS_PER_PAGE
        })

    })
    .then((products) => {   
        res.status(200).json({
            products:products,
            currentPage:page,
            hasNextPage: ITEMS_PER_PAGE*page<totalItems,
            nextPage:page+1,
            hasPreviousPage:page>1,
            previousPage:page-1,
            lastPage:Math.ceil(totalItems/ITEMS_PER_PAGE),

        })
    }).catch((err) => {
        console.log(err);
    });

}
// exports.getProduct=(req,res)=>{
//     Product.findByPk()
// }
exports.postAddCart=(req,res)=>{
     console.log(req.body);
     let fetchedCart;
     const proId=req.body.id;
     req.user
     .getCart()
     .then(cart=>{
        fetchedCart=cart;
        return cart.getProducts({where: {id:proId}})
     })
     .then(products=>{
        let product;
        if(products.lenght>0){
            product=products[0];
            console.log(products[0]);
        }
        let newQuantity=1;
        if(product){
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
        }
        return Product.findByPk(proId)
        .then(product=>{
            return fetchedCart.addProduct(product,{ 
                through :{ quantity: newQuantity}})
        })
        .catch(err=>console.log(err))
     })
     .then(()=>{
        res.redirect('/');
     })
     .catch(err=>console.log(err));
     
    // const productName=req.body.itemName;
    // const imageName=req.body.itemImage;
    // const quantity=req.body.itemQuantity;
    // const price=req.body.itemPrice;
    // Cart.create({
    //     productName:productName,
    //     imageName:imageName,
    //     quantity:quantity,
    //     price:price
    // })
    // .then((result) => {
    //   console.log(result);  
    // }).catch((err) => {
    //     console.log(err);
    // });
    // res.redirect('/');

}

exports.getCartProducts=(req,res)=>{
    req.user.getCart()
    .then(cart=>{
          return cart.getProducts()
        })
        .then((products) => {
            res.status(200).json({
               products:products
            })
        })
    .catch(err=>console.log(err))

    // const page1=+req.query.page1|| 1;
    // let totalItems;
    // Cart.count()
    // .then((total)=>{
    //     totalItems=total;
    //     return Cart.findAll({
    //         offset:(page1-1)*ITEMS_PER_PAGE,
    //         limit:ITEMS_PER_PAGE
    //     })
    // })
    // .then((products) => {
    //      res.status(200).json({
    //         products:products,
    //         currentPage:page1,
    //         hasNextPage: ITEMS_PER_PAGE*page1<totalItems,
    //         nextPage:page1+1,
    //         hasPreviousPage:page1>1,
    //         previousPage:page1-1,
    //         lastPage:Math.ceil(totalItems/ITEMS_PER_PAGE)
    //      })        
    // }).catch((err) => {
    //     console.log(err);
    // });

}


exports.getCartItemProducts=(req,res)=>{
    CartItem.findAll()
    .then(products=>{
        res.status(200).json(products)
    })
    .catch(err=>console.log(err))
}

exports.postOrder=(req,res)=>{
    // console.log(req.body)
    // console.log('hello')
    let fetchedCart;
    req.user
    .getCart()
    .then(cart=>{
        fetchedCart=cart;
        return cart.getProducts()
    })
    .then(products=>{
       return req.user.createOrder()
       .then(order=>{
        order.addProduct(products.map(product=>{
            product.orderdetails={ quantity:product.cartItem.quantity};
            return product;
        }))
       })
       .catch(err=>console.log(err));
    })
    .then(result=>{
         return fetchedCart.setProducts(null)
       
    })
    .then(result=>{
         res.status(200).json({id:result.id ,message :true}); 
        console.log(result);
    })
    .catch(err=>console.log(err))
    
}

exports.getOrders=(req,res)=>{
    console.log('hello');
    req.user.getOrders({include : ['products']})
    .then(orders=>{
        console.log(orders)
        res.status(200).json(orders);
    })
    .catch(err=>console.log(err))
}

exports.deleteCart=(req,res)=>{
    console.log(req.params.id);
    const id=req.params.id
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts({where:{id:id}});
    })
    .then(products=>{
        const product=products[0];
        return product.cartItem.destroy();
    })
    .then(result=>{
        res.status(200).json({message:true})
    })
    .catch(err=>console.log(err))
}