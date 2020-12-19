# movie-rater
This application was created as my capstone project for *[HarvardX's Computer Science for Web Programming](https://www.edx.org/professional-certificate/harvardx-computer-science-for-web-programming) professional certificate program.
YouTube video overview: [https://youtu.be/NRXig6r-McI](https://youtu.be/NRXig6r-McI).

## Description
This web application (nick-named "MovieRater") allows users to login, search/add movies to the web app's database, add reviews to movies, read other user's reviews, as well as view the average review for each movie based on all user's reviews. This web application was created using Django (Python web application framework) and React.js (JavaScript framework for creating single page applications). This minimizes requests and responses sent between client and server, which provides a more seamless experience for the user at the UI level. 

A brief overview of the files in this project may be found below.

### movierater
This folder is the main project folder for the Django web application. This folder contains the required files for a Django web application to run, as well as the web server settings ("settings.py") and top-level URL routes ("urls.py").

### movierater_api
This folder contains the API application of the project. This application contains each of the API routes that allow the React.js-based front-end to communicate with the back-end database. This API application does not have any user interface. It's sole purpose is to listen for requests, and then return data from the database in JSON form. A brief summary of some of the files is included below: 
- **models.py**: This file contains the data models that are used by the Django ORM to map objects to tables in the database. 
- **urls.py**: This file contains the URL routes for the API application. 
- **views.py**: This file contains the functions which are executed when requests are sent to each of the API routes in the "urls.py" file. Each of the functions in this file respond using JSON response objects, which allows for easy use and manipulation of the data at the front-end.

### movierater_app
This folder contains the front-end application of the project. This application handles all of the user interface aspects of the "MovieRater" web app. This application has minimal back-end logic, and it does not communicate with the database other than logging users in/out and registering new users. A brief summary of some of the files is included below: 
- **urls.py**: This file contains the URL routes for the front-end application.
- **views.py**: This file contains the functions which are executed when requests are sent to each of the routes in the "urls.py" file. The functions in this file are primarily used to return user interface content, log users in/out, and register new users. 
- **static/movierater_app**: This folder contains the front-end JavaScript files. These JavaScript files utilize React.js to build the user interface at the client side, rather than sending requests to the server for different web pages. The "app.js," "http.js," and "util.js" files are shared JavaScript files which handle some common logic, as well as initial app loading. The "components" folder contains each of the React.js components which make up this application. 

## A few complexities to note
This project's complexity is enhanced by the following:
1. **Multiple applications**: This project utilizes multiple applications within the Django project. This "MovieRater" project has two separate applications. One application handles the back-end API and database functionality, while the other application handles UI and front-end functionality. 
2. **React.js**: This project utilizes React.js for the user interface. Additionally, this project uses vanilla React.js, not JSX, for UI rendering.
3. **CSRF validation**: This project utilizes CSRF (Cross-Site Request Forgery) validation with the API routes. This "MovieRater" application pulls the CSRF token from the client-side cookies and includes it in all POST requests to the API. This ensures that the "MovieRater" application has CSRF protection. 

## How to run the application
To run this "MovieRater" application, please follow the below steps: 
1. Clone this source code respository. 
2. Run the command `python manage.py makemigrations movierater_api`.
3. Run the command `python manage.py migrate`.
3. Run the command `python manage.py runserver`.
