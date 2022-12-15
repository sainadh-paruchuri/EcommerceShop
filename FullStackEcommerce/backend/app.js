const express=require('express')
const bodyParser=require('body-parser');
const path=require('path')
const sequelize=require('./util/database')
const app=express();
const cors=require('cors');

const Product=require('./models/product')
const User=require('./models/user')
const Cart=require('./models/cart')
const CartItem=require('./models/cartItem')
const Order=require('./models/order');
const OrderDetails=require('./models/orderdetails');



app.use(cors())
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended :false}));




app.use((req,res,next)=>{
    User.findByPk(1)
    .then((user) => {
       req.user=user ;
       next();
    }).catch((err) => {
        console.log(err);
    });

})
const adminRoutes=require('./routes/admin');


app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes)
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

Product.belongsTo(User, {constraints :true, onDelete:'CASCADE'});
User.hasMany(Product); 
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{ through : CartItem});
Product.belongsToMany(Cart, { through : CartItem})

Order.belongsToMany(Product, {through: OrderDetails});
Product.belongsToMany(Order,{through: OrderDetails})
User.hasMany(Order);



sequelize
// .sync({ force :true})
.sync()
.then((result) => {
    User.findAll({where:{id:1}});
    
})
.then((user) => {
    console.log(user)
    if(!user){
        return User.create({name :'Sai',email:'sai@gmail.com'});
    }
    return user;
})
.then(user=>{
    user.createCart()
    return user;
   
})
.then(user=>{
    return user.createOrder
     
})
.then(order=>{
    app.listen(3000)
})
.catch((err) => {
    console.log(err);
});

// sequelize.sync()
// .then((result) => {
//     app.listen(3000)
// })
