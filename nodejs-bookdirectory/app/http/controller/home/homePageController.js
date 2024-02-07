const User = require('app/models/user');
const Book = require('app/models/book');
const Category = require('app/models/category');


class homePageController {

    async index(req , res , next){
        try {
            const books = await Book.find({}).select('-statement -images').populate('categories' , 'name slug parent').exec()
            // const booksByCategories = await Book.find()
            // const categories = await Category.find({})
            const categories = await Category.find({}).populate('childrens').exec()

            const categoriesWithBooks = await Category.find({}).where({parent : null}).populate('books' , '-statement -images').exec()
                    
            const title = 'صفحه اصلی'
            
            res.render('home/index' , { title , books  , categories , categoriesWithBooks })
            
        } catch (err) {
            console.log(err);
            next(err);
        }
    }


}

module.exports = new homePageController();