# REST-API
 REST API

# OverView
REST API is the backend for a future React project. It utilizes sequelize as an ORM to connect with a database. It also utilizes authentication so that only registered user can create, update, and delete courses. The app also uses bcrypt to hash the passwords of users.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run seed`

Creates and seeds a SQLite database.<br />

## Built With

* [Express](http://expressjs.com/) - The web framework used
* [SQLite](https://www.sqlite.org/index.html) - The database used for development
* [Postgres](https://www.postgresql.org/) - The database used in production
* [Sequelize](https://pugjs.org/api/getting-started.html) - The ORM  used to interact with the database.


## API Endpoints
* [GET Course] https://cori-course-api.herokuapp.com/api/courses/
* [GET User] https://cori-course-api.herokuapp.com/api/users/ - Must be authenticated to access route.
* [POST User] https://cori-course-api.herokuapp.com/api/users/
* [POST Course] https://cori-course-api.herokuapp.com/api/courses/ - Must be authenticated to access route.
* [UPDATE Course] https://cori-course-api.herokuapp.com/api/courses/:id - Must be authenticated to access route. Must be the creator of the course and have the id.
* [DELETE Course] https://cori-course-api.herokuapp.com/api/courses/:id - Must be authenticated to access route. Must be the creator of the course and have the id.

## Authors

* **Cori Mims** - *Initial work* - [cdmims23](https://github.com/cdmims23)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
