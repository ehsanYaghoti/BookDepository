const User = require('app/models/user');
const Book = require('app/models/book');
const Category = require('app/models/category');


class homePageController {

    async single(req , res , next){
        try {

            const books = await Book.find({});
            const book = await Book.findOne({slug : req.params.slug}).populate({path : 'categories' , select : 'name slug _id' , populate : { path: 'books' , select : '-statement -images'}})
            const categories = await Category.find({}).populate('childrens').exec()
        
            const title = book.title

            res.render('home/books/single-book'  , {title , book , books , categories})
            
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async allBooksPage(req , res , next){
        try {

            // const category = await Category.findOne({slug : req.params.slug}).populate('childrens').exec()
            const books = await Book.paginate({} , {select : 'thumb title slug author publicationDate price discount'})
            const categories = await Category.find({}).populate('childrens').exec()



            const title = 'all books'

            res.render('home/books/books'  , {title ,  books , category : undefined , categories })
            
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    
    async categoryPage(req , res , next){
        try {

            const category = await Category.findOne({slug : req.params.slug}).populate('childrens').exec()
            const books = await Book.paginate({categories : category._id} , {select : 'thumb title slug author publicationDate price discount'})
            const categories = await Category.find({}).populate('childrens').exec()



            const title = category.name

            res.render('home/books/books'  , {title ,  books , category , categories })
            
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async search(req , res , next){
        try {
            let data = new RegExp(req.body.data , 'gi')

            const books = await Book.paginate({ $or : [{ title : data } , { author : data } , { isbn : data } , {publisher : data}] } , {select : 'thumb title slug author publicationDate price discount'})
            const categories = await Category.find({}).populate('childrens').exec()

            // return res.json(books)


            const title = 'search'

            res.render('home/books/books'  , {title ,  books , category : undefined  , categories })
            
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getSearch(req , res , next){
        try {
            // return res.json(req.query)

            let data = new RegExp(req.query.search , 'gi')

            const books = await Book.paginate({ $or : [{ title : data } , { author : data } , { isbn : data } , {publisher : data}] } , {select : 'thumb title slug author publicationDate price discount'})
            const categories = await Category.find({}).populate('childrens').exec()

            // return res.json(books)


            const title = 'search'

            res.render('home/books/books'  , {title ,  books , category : undefined  , categories })
            
        } catch (err) {
            console.log(err);
            next(err);
        }
    }



}


module.exports = new homePageController();