const express=require('express')
const bodyParser=require('body-parser');
const path=require('path')
const sequelize=require('./util/database')
const app=express();
const cors=require('cors');

app.use(cors())

const adminRoutes=require('./routes/admin');

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes)
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
sequelize.sync()
.then((result) => {
    app.listen(3000)
}).catch((err) => {
    console.log(err);
});


