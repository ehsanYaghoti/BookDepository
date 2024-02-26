<h1 align="center">

  ![icons8-books-48](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/2b101e7b-3aef-486b-954f-b11c8321f50b) BookDepository

</h1>
<p align="center">
  MongoDB, Expressjs, React, Nodejs
</p>

> BookDepository is a  fullstack implementation in MongoDB, Expressjs, React , Nodejs.

BookDepository is the Ecommerce website  using Javascript/Node restful api for fullstack web development. in this app for front end reactjs is used for some routes and for others ejs is used.

## clone or download
```terminal
$ git clone https://github.com/ehsanYaghoti/BookRepositoryProject
```

## project structure
```terminal
nodejs-bookdirectory/
   package.json
   .env
bookdirectory-react/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^16.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd bookdirectory-react   // go to bookdirectory-react folder
$ yarn # or npm i    // npm install packages
$ npm  start // this will run the files in docs
```

## Server-side usage(PORT: 4000)

### Prepare your database

run the script at the first level:

```terminal
// in the root level
$ cd nodejs-bookdirectory
$ mongod
```

### Start

open another terminal and run the script:

```terminal
$ cd nodejs-bookdirectory   // go to nodejs-bookdirectory server folder
$ npm i       // npm install packages
$ npm start // run it locally(if there is timeout conection to mongodb error save a js file in server folder to restart with nodemon)
```
# Dependencies and devDependencies
Server-side | Client-side
--- | ---
app-module-path: ^2.2.0 | @fortawesome/react-fontawesome: ^0.2.0
auto-bind: ^4.0.0| @ckeditor/ckeditor5-build-classic: ^35.0.1
autoprefixer: ^10.4.16 | @ckeditor/ckeditor5-react: ^5.0.2
bcryptjs: ^2.4.3 | @fortawesome/fontawesome-svg-core: ^6.1.2
body-parser: ^1.19.0 | @fortawesome/free-solid-svg-icons: ^6.1.2
connect-flash: ^0.1.1 | axios: ^0.27.2
connect-mongo ^5.0.0 | babel-plugin-macros: ^3.1.0
cookie-parser: ^1.4.6 | react: ^18.2.0
cors: ^2.8.5 | react-dom: ^18.2.0
express: ^4.18.2 | react-router-dom: ^5.2.0
express-ejs-layouts: ^2.5.0 | react-bootstrap: ^2.5.0
express-layout: ^0.1.0 | bootstrap: ^5.2.0
express-session: ^1.17.1 | jalali-moment: ^3.3.11
express-validator: ^6.9.2 | react-scripts: ^5.0.1
jsonwebtoken: ^8.5.1 | react-select: ^5.4.0
mkdirp: ^1.0.4 | sass: ^1.54.4
mongoose: ^7.5.2 | 
mongoose-paginate-v2: ^1.7.4 | 
multer: ^1.4.5-lts.1 | 
passport: ^0.6.0 | 
nodemon: ^2.0.0 |
sass: ^1.66.1


# Screenshots of this project

User visit Home page
![Screenshot (93)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/9b195cd0-1287-4b65-b6e5-222783914f22)

![Screenshot (94)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/098d7601-d848-4d54-8d9f-3ff791739fed)

User visit books page
![Screenshot (95)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/bdfd2d08-c364-45ea-9a9e-5242c4876e19)

User visit book single page
![Screenshot (96)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/37643311-b042-4ff7-a57c-6b43997937b6)

![Screenshot (97)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/88b6aa61-af47-499b-ac55-6911d35c98b9)

User dashboard page
![Screenshot (100)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/3c1bcdb3-7308-44e0-9340-5152e2579730)

Admin panel page
![Screenshot (103)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/e5222370-b39e-4994-a725-10dba0185b80)

![Screenshot (104)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/ee879da1-39c9-4f50-95ba-af34ef6eb39d)

![Screenshot (105)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/e9b8392b-6f46-40c1-bfda-ef000cd7764f)

![Screenshot (107)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/0ffd3262-66ed-47bc-a3b5-684c5cf4fe1c)

User can sign in or sign up
![Screenshot (101)](https://github.com/ehsanYaghoti/BookRepositoryProject/assets/89301662/8201640d-7ae7-4e11-9390-1c07710aa52b)

## BUGs or comments

[Create new Issues](https://github.com/ehsanYaghoti/Weblog/issues) (preferred)

Email Me: ehsan.yaghoti@yahoo.com
