const express=require('express')
const bodyParser=require('body-parser');
const path=require('path')
const sequelize=require('./util/database')
const app=express();
const cors=require('cors');
const Product=require('./models/product')
const User=require('./models/user')


app.use(cors())
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended :false}));


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


sequelize
// .sync({ force :true})
.sync()
.then((result) => {
    User.findByPk(1);
    
})
.then((user) => {
    if(!user){
        return User.create({name :'Sai',email:'sai@gmail.com'});
    }
    return user;
})
.then(user=>{
    console.log(user)
    app.listen(3000)
})
.catch((err) => {
    console.log(err);
});


