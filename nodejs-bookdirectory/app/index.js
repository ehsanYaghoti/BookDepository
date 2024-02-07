const express = require('express');
const app = express();
const http = require('http');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session)
const config = require('../config');
const helper = require('./helper')

// Middlewares
const rememberMiddleware = require('app/http/middleware/loginMiddleware')
const activeationMiddleware = require('app/http/middleware/activeationMiddleware')


module.exports = class Application {

    constructor(){
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRoutes();
    }

    //Express Configuration
    setupExpress(){
        const server = http.createServer(app);
        server.listen(process.env.port , ()=> console.log(`App is running on port ${process.env.port}`) )
    }

    //Mongoose Configuration
    setMongoConnection(){
        mongoose.connect(config.database.url , {useNewUrlParser : true , useUnifiedTopology : true , useFindAndModify : false , useCreateIndex : true})
        mongoose.Promise = global.Promise
    }
   
    setConfig(){

        //Passports
        require('app/passport/passport-local.js')
        require('app/passport/passport-google.js')
        require('app/passport/passport-jwt.js')
        
        //Body Parser Configuration
        app.use(express.json());
        app.use(express.urlencoded({extended : true}))

        //Front End Configuration 
        // app.use(express.static(path.resolve(__dirname, '../client/build')));
        app.use(express.static('public'))
        app.set('view engine' , config.layout.view_engine)
        app.set('views' , config.layout.view_dir)
        app.use(config.layout.ejs.expressLayouts)
        app.set("layout extractScripts", config.layout.ejs.extractScripts)
        app.set("layout extractStyles", config.layout.ejs.extractStyles)
        app.set('layout' , config.layout.ejs.master_dir)
 
        //Auth Configuration
        app.use(session(config.session))
        app.use(cookieParser(config.cookie_secretkey))
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session())
        app.use(rememberMiddleware.handle)

        //Helpers
        app.use((req , res , next)=>{
            app.locals = new helper(req , res).getObject();
            next();
        })
        
    }

    setRoutes(){
        //Routes Midllewares
        app.use(activeationMiddleware.handle)
        app.use(require('./routes/api'));
        app.use(require('./routes/web'));
    }

}