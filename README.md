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

### GET /api/v1/longest-duration-movies

- Returns the top 10 movies with the longest runtime in JSON format.
- The response includes the following details:

```yaml
{
  "status": true,
  "message": "Top 10 movies access successfully",
  "result":
    [
      {
        "tconst": "tt0000057",
        "titleType": "movie",
        "primaryTitle": "Cortège de tzar allant à Versailles",
        "runtimeMinutes": 10206,
        "genres": "Comedy",
      },
      {
        "tconst": "tt0000058",
        "titleType": "short",
        "primaryTitle": "Cortège de tzar au Bois de Boulogne",
        "runtimeMinutes": 5330,
        "genres": "Comedy",
      },
    ],
}
```

### POST /api/v1/new-movie (Create movie)

- Adds a new movie to the database.
- The request body should be in JSON format with the following details:

```yaml
{
  "tconst": "tt0000102",
  "titleType": "short",
  "primaryTitle": "The Boxing",
  "runtimeMinutes": 190,
  "genres": "short",
}
```

- On successful save, the endpoint returns a success message.

### GET /api/v1/top-rated-movies

- Returns the movies with an averageRating > 6.0, in sorted order by averageRating in JSON format.
- The response includes the following details:

```yaml
{
  "status": true,
  "message": "Get an average movies rating successfully",
  "result":
    [
      {
        "tconst": "tt0000012",
        "primaryTitle": "The Arrival of a Train",
        "genres": "Action",
        "averageRating": "7.4",
      },
      {
        "tconst": "tt0000060",
        "primaryTitle": "Dancing Darkies",
        "genres": "Horror",
        "averageRating": "7.4",
      },
    ],
}
```

### GET /api/v1/genre-movies-with-subtotals

- Returns a list of all movies genre-wise with subtotals of their numVotes.
- The response is in the following format:

```yaml
{
  "status": true,
  "message": "Subtotal movie access successfully",
  "result":
    [
      {
        "Genre": "Action",
        "primaryTitle": "Boat Leaving the Port",
        "numVotes": "1440",
      },
      {
        "Genre": "Action",
        "primaryTitle": "Cordeliers Square in Lyon",
        "numVotes": "1118",
      },
      { "Genre": "Action", "primaryTitle": "TOTAL", "numVotes": "2558" },
      {
        "Genre": "Animation",
        "primaryTitle": "Autour dune cabine",
        "numVotes": "1020",
      },
      {
        "Genre": "Animation",
        "primaryTitle": "Le clown et ses chiens",
        "numVotes": "257",
      },
      { "Genre": "Comedy", "primaryTitle": "TOTAL", "numVotes": "1277" },
    ],
}
```

### POST /api/v1/update-runtime-minutes

- Updates the runtimeMinutes of all movies in the database using SQL queries.
- The endpoint increments the runtimeMinutes by 15 if genre is Documentary, 30 if genre is Animation, and 45 for all other genres.

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

```
