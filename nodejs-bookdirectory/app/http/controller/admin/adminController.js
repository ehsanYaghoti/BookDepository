const Controller = require('../controller')
const User = require('app/models/user');
const Book = require('app/models/book');
const Category = require('app/models/category');
const Permission = require('app/models/permission');
const Role = require('app/models/role');
const Article = require('app/models/article');
const Comment = require('app/models/comment');



class adminController extends Controller {
    async maindashboard(req , res){
        try {
            
            const usersCount = await User.countDocuments({})
            const usersAdminCount = await User.countDocuments({admin : true})
            const booksCount = await Book.countDocuments({})
            const categorysCount = await Category.countDocuments({})
            const permissionsCount = await Permission.countDocuments({})
            const rolesCount = await Role.countDocuments({})
            const articlesCount = await Article.countDocuments({})
            const commentsCount = await Comment.countDocuments({})



            res.json({
                data : {
                    usersCount,
                    usersAdminCount,
                    categorysCount,
                    permissionsCount,
                    rolesCount,
                    articlesCount,
                    commentsCount,
                    booksCount,
                },
                success: true
            })
          } catch(err){
            res.json({
              messages : err,
              success: false
            })
        }
    }

    uploaded(req , res , next){
        try {
            return res.json({
                data : req.body,
                success  : true
              })
        } catch (err) {
            console.log(err);
            this.apiError(500 , 'server err')
            next(err);
        }
    }
}

module.exports = new adminController();