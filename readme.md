
<!--  README LEARN FLOW  -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/velvi-stud/LearnFlow-v2">
    <img src="/static/img/icon-512.jpeg" alt="Logo" width="126" height="126">
  </a>
</p>
  <h3 align="center">LearnFlow</h3>

  <p align="center">
    <br />
    <a href="https://github.com/velvi-stud/LearnFlow-v2"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/velvi-stud/LearnFlow-v2/issues">Report Bug</a>
    <br />
    <a href="https://github.com/velvi-stud/LearnFlow-v2/issues">Request Feature</a>
  </p>




<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#road-map">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
LearnFlow is the new way to learn programming through flow chart.
LearnFlow is a project developed for a modern Web Technologies course, attended at University of Naples "Parthenope".
A demo of the project and a video ([mock-idea](https://www.youtube.com/watch?v=23itJesVfn0&t=4s)) 
has been presented at the Hackathon "Gamification in Programming Education".



### Built With
This project was built using various programming lenguages, technologies, frameworks and libraries.
####_Client-Side_ <br>
* HTML and CSS with [Bootstrap](https://getbootstrap.com) for a better wab app approach experience
* [JavaScript](https://www.javascript.com/) as scripting lenguage to make a dynamic page and handle of events (such us button click, page reload, etc...)
    * [JQuery](https://jquery.com) as JS library to help and simplify the manipulation and management of DOM
      standing the browsers compatibility "write less do more".
    * [AJAX](https://api.jquery.com/jquery.ajax/) for the creation of interactive web applications, based on an exchange 
      of data in the background between web browsers and, thus, allowing the dynamic updating of a web page without reloading by the user.
####_Server-Side_ <br>
* [Pyton](https://www.python.org/) choice as a server-side scripting tool was motivated considering the typical
  architecture of a current web application using flask. 
    * [Flask](https://flask.palletsprojects.com) it is a microframework for the realization of web apps which it is possible to return the output of the 
  function associated with a specific url in the form of html, string or json using jinja2 as the template engine
* [MongoDB](https://www.mongodb.com/) it is a non-relational dbms oriented to documents for data storage. 
    * [PyMongo](https://pypi.org/project/pymongo/) library to link with the DB to python/flask we use the 



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* Web Browser to show the application wab
> Install a browser such as [Chrome](https://www.google.com/intl/it_it/chrome/), [Edge](https://www.microsoft.com/it-it/edge) or [Firefox](https://www.mozilla.org/it/firefox/new/)

* Pyhton to start a local server
> To install python follow this [link](https://www.python.org/downloads/)
> To manipolate better the code we raccomand [PyCharm](https://www.jetbrains.com/pycharm/)

### Installation
1. Clone the repo on a specific folder
  ```sh
  $ git clone https://github.com/velvi-stud/LearnFlow-v2
  ```
2. Activate the virtual environment python (venv)
  ```sh
  $ .\venv\Scripts\activate
  ```
>     Eventually, you can find all libreries listed into file "requirement.txt" in a folder
  ```sh
  $ pip install -r requirements.txt
  ```
3. Make sure your internet connection is on (for DB connection) and start Flask (on port 5000)
  ```sh
  $ flask run -p 5000
  ```
4. After that the terminal will show you an address (usually ``` 127.0.0.1:5000 ```), where you can copy and paste into url bar of the browser. That link will show you the web app FlowChart.



<!-- USAGE EXAMPLES -->
## Usage
When web app is open you can see the index page that show you a 
brief introduction on the purpose of LearnFlow and can allow you to start 
learning how algorithm works through flow charts.
If you already logged, you will see directly the main game page,
otherwise you have to sing in or sing up to be identified.
When you are in a main game page you can see various information:
* User profile that show you actual level and score done
* Rank list that show a list of users with the highest score
* Levels to complete
    * Each level will be divided into three parts:
        * Theory
        * Multiple choice questions
        * Flow chart to compose
To unlock levels you have to achieve score reachable compiling the exercise.


<!-- LICENSE -->
## License
_Apache license_


## Element explanation

#### MongoDB schema
The Database used ```LearnFlow_mongoDB``` is composed by two collection
* ```LF_login``` is the first element of collection that store the login data such as:
    * Email
    * Username
    * Password
* ```LF_user_info``` is the second collection and it's used to store user game info:
    * Username
    * Level
    * Score
#### Python Route
Routes decorator used in python are used for:
* ``` @app.route('/') ``` return the main html page (index.html)
  <br>
  <br>
* ``` @app.route('/registration', methods=['POST', 'GET']) ``` route used to return registration page and logic behind it. 
  If sent data are valid, those will be stored into database and user will be redirected to a login page,
  otherwise will return registration page with the error message.
  <br>
  <br>
* ``` @app.route('/login/', methods=['GET', 'POST']) ``` route used to return login page and logic behind it.
  to return the page main game page in case of success and user data info are saved into session otherwise return login page with the error message.
  <br>
  <br>
* ``` @app.route('/MainGame/', methods=['GET', 'POST']) ```  route used to return main game page and logic behind it.
  If user is already logged (session variables are setted) then return main game page, otherwhise the user will be redirected to login page
  <br>
  <br>
* ``` @app.route('/logout') ``` routes used to clear session variables and redirect to login page
  <br>
  <br>
* ``` @app.route('/update_data/<username>/<lvl>/<pnt>', methods=['POST']) ``` it is a route used to update user data on
  database
  <br>
  <br>
* ``` @app.route('/get_top', methods=['GET']) ``` route used to return a json file containing the users with the highest score
  <br>
  <br>
* ``` @app.route('/exercise_flow_chart/<pt>/<pnt>', methods=['GET']) ``` route used to return the flow chart exercise page included 
  the json exercise (in case of user already logged in, otherwise will redirect to login)
  <br>
  <br>
* ``` @app.route('/exercise_multiple_question/<pt>/<pnt>', methods=['GET']) ``` route used to return the multiple choice exercise page included
  the json exercise (in case of user already logged in, otherwise will redirect to login)
  <br>
  <br>
* ``` @app.route('/theory/<pt>', methods=['GET']) ``` route used to return the theory page (in case of user already logged in, otherwise will redirect to login)
  <br>
  <br>
* ``` @app.route('/end_exercise/<pnt>', methods=['GET']) ``` route used to return the endig exercises page that show the points done making exercises and the actual score (updated)


<!-- CONTACT -->
## Contact

Romeo Velvi - romeo.velvi001@studenti.uniparthenope.it <br>
Pasquale Casoria - pasquale.casoria001@studenti.uniparthenope.it <br>
Crescenzo Bencivenga - crescenzo.bencivenga001@studenti.uniparthenope.it <br>

Project Link: [https://github.com/velvi-stud/LearnFlow-v2](https://github.com/velvi-stud/LearnFlow-v2)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)
