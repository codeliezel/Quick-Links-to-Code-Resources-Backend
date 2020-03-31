## Q.L.C.R
<h1> Quick-Links-to-Code-Resources-Backend</h1>

[![Build Status](https://travis-ci.com/funmi5/Quick-Links-to-Code-Resources-Backend.svg?branch=develop)](https://travis-ci.com/funmi5/Quick-Links-to-Code-Resources-Backend)
[![Maintainability](https://api.codeclimate.com/v1/badges/900b6ff6a78a85717f3a/maintainability)](https://codeclimate.com/github/funmi5/Quick-Links-to-Code-Resources-Backend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/900b6ff6a78a85717f3a/test_coverage)](https://codeclimate.com/github/funmi5/Quick-Links-to-Code-Resources-Backend/test_coverage)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

<p> Quick-Links-to-Code-Resources is a <em>fun</em> project which comprises of various links to free code tutorials all around the web.  
<em>You can check out the hosted API endpoints via this link: `https://qlcr-backend.herokuapp.com`</em>
</p>

## :rocket: Quick start

1.  Have Git and Node.js installed on your computer.
2.  Clone the repo using this link: _https://github.com/funmi5/Quick-Links-to-Code-Resources-Backend.git_
3.  cd into the project and run _npm install_ to install the modules.
4.  Create a .env file and add the necessary variables following the _.env.sample_ format.
5.  Run _npm run start:dev_ to start the development server.
6.  Run _npm run test_ to run the test files.
 
## :star: Technologies Used

1. Node.js and Express.js
2. Mongoose ODM
3. MongoDB
4. Git
5. Travis CI
6. Code Climate
7. Hound CI
8. Heroku

## :sunny: Sample .env file format

```

DEV_DATABASE_URI =
PROD_DATABASE_URI = 
SECRET =  
name = 
password = 
dbtable = 
database = 

```

## :cherry_blossom: Sample test format

<h4>1. To sign up:</h4>
   
  POST `localhost:5000/api/v1/user/signup`

   ```
   {
	"firstName": "Tomori",
	"lastName": "Adeleke",
	"email": "tomoriadeleke@gmail.com",
	"password": "tomori.5H",
    "phoneNumber": "08353637788",
	"userName": "tydelz"
}
   ```

<h4>2. To sign in:</h4>
   
  POST `localhost:5000/api/v1/user/signin`

   ```
   {
	"email": "tomoriadeleke@gmail.com",
	"password": "tomori.5H",
}
   ```

<h4>3. To update a user details:</h4>
   
  PATCH `localhost:5000/api/v1/user/settings/:_id`

   ```
   {
	"firstName": "Tomori",
	"lastName": "Adeleke",
	"email": "tomoriadeleke@gmail.com",
	"password": "tomori.5H",
    "phoneNumber": "08353637788",
	"userName": "tydelz"
}
   ```
   
   
<h4>4. To add a link resource:</h4>
   
   *Authentication required after sign up/in*: _Bearer token_
   
  POST `localhost:5000/api/v1/link/add`
   
   ```
   {
	"title": "how to create a sign up form in react",
	"author": "Amanda Lee",
	"comment": "This tutorial is all about signing up with a form uisng react and redux.",
	"tags": "react, redux, html",
	"category": "front-end",
	"link": "https://dev.to/amanda-lee-how-to-"
}
   ```
   
   <h4>5. To update a link resource:</h4>
   
  *Authentication required after sign in*: _Bearer token_
   
  PATCH `localhost:5000/api/v1/link/update/:linkId`

   ```
   {
	"title": "how to create a sign up form in react",
	"author": "Amanda Lee",
	"comment": "This tutorial is all about signing up with a form using react and redux.",
	"tags": "react, redux, html",
	"category": "front-end",
	"link": "https://dev.to/amanda-lee-how-to-sign-up-with-a-form-using-react-and-redux"
}
   ```    
 <h4>6. To get a link resource:</h4>
   
  GET `localhost:5000/api/v1/link/view/:linkId`
  
  <h4>7. To get all link resources:</h4>
   
  GET `localhost:5000/api/v1/link/view/all`

<h4>8. To delete a link resource:</h4>
   
  DELETE `localhost:5000/api/v1/link/delete/:linkId`

*Authentication required after sign in*: _Bearer token_

   
## Developed by
Funmilayo E. Olaiya   