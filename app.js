if(process.env.NODE_ENV !="production"){ 
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override'); // middleware for overriding methods
const ejsMate = require('ejs-mate'); // for ejs layouts
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

//---------modules ------------//
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

// --------------------------------- MongoDB connection----------------------------------------------------------
const dbUrl = process.env.ATLASDB_URL;
async function main() {
    mongoose.connect(dbUrl);  //db name
}
main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log(err)
    });
// ---------------------------------------------------------------------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // to use PUT and DELETE methods via forms 
app.engine('ejs', ejsMate); // for ejs layouts 
app.use(express.static(path.join(__dirname, 'public'))); // to serve static files like css, images etc.

const secret = process.env.SECRET;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: secret,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err)=>{
    console.log("SESSION STORE ERROR", err)
});

const sessionOptions = {
    store,
    secret: secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
}
//-------------------------------------------------------------------------------------------------------------

app.use(session(sessionOptions));
app.use(flash());    

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currentUser = req.user;
    next();
});


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message }); // res.status(statusCode).send(message);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

