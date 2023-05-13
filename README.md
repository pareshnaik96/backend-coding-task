## Movie Database API

This project creates an HTTP server that provides API endpoints for accessing and updating movie data stored in a SQL database. The project includes the following functionalities:

- Retrieving movies with the longest runtime
- Adding new movies to the database
- Retrieving top-rated movies
- Retrieving movies by genre with vote count subtotals
- Updating movie runtime using SQL queries

### Technology Stack

This project is developed using the following technologies:

- Node.js
- Express.js
- MySQL

### Installation and Setup

1. Clone the project repository using the command `git clone https://github.com/pareshnaik96/backend-coding-task.git`
2. Install the project dependencies using `npm install`

The CSV data from `movies.csv` and `ratings.csv` files are processed and inserted into two SQL tables `movies` and `ratings` respectively. The `movies` table has the following columns:

- tconst
- primaryTitle
- runtimeMinutes
- genres

The `ratings` table has the following columns:

- tconst
- averageRating
- numVotes

### API Endpoints

The following API endpoints are available in this application:

- GET /api/v1/longest-duration-movies
- POST /api/v1/new-movie
- GET /api/v1/top-rated-movies
- GET /api/v1/genre-movies-with-subtotals
- POST /api/v1/update-runtime-minutes

### SQL Queries

The following SQL queries are used in this project:

```sql
CREATE TABLE movies (
  tconst VARCHAR(10) PRIMARY KEY,
  titleType VARCHAR(255),
  primaryTitle VARCHAR(255),
  runtimeMinutes INT,
  genres VARCHAR(255)
);

CREATE TABLE ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tconst VARCHAR(10),
  averageRating DECIMAL(3,1),
  numVotes INT,
  FOREIGN KEY (tconst) REFERENCES movies(tconst)
);

