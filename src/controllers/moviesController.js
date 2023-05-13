const con = require('../utils/connection')

const isValidString = function (value) {
    if (typeof value !== 'string') return false;
    if (value.trim().length === 0) return false;
    return true
}

const isInteger = function (value) {
    if (typeof value !== 'number') return false;
    if (value % 1 !== 0) return false;
    return true;
}

//============================================= Controller for get top 10 movies ==============================//

const getMovies = ((req, res) => {
    const sqlGet = `SELECT * FROM movies 
                    ORDER BY runtimeMinutes desc 
                    limit 10`;
    con.query(sqlGet, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: false, message: 'An error occurred while fetching movies data' });
        } else {
            return res.status(200).send({ status: true, message: 'Top 10 movies access successfully', result });
        }
    });
});


//============================================ controller for creating movies ===================================//


const createMovies = (req, res) => {
    const data = req.body;

    const { tconst, titleType, primaryTitle, runtimeMinutes, genres } = data

    if (!isValidString(tconst)) {
        return res.status(400).send({ status: false, message: "tconst is required" })
    }
    if (!isValidString(titleType)) {
        return res.status(400).send({ status: false, message: "titleType is required" })
    }
    if (!isValidString(primaryTitle)) {
        return res.status(400).send({ status: false, message: "primaryTitle is required" })
    }
    if (!isInteger(runtimeMinutes)) {
        return res.status(400).send({ status: false, message: "runtimeMinutes is required" })
    }
    if (!isValidString(genres)) {
        return res.status(400).send({ status: false, message: "genres is required" })
    }

    const sqlpost = `INSERT INTO movies(tconst, titleType, primaryTitle, runtimeMinutes, genres) 
    VALUES ('${data.tconst}', '${data.titleType}', '${data.primaryTitle}', '${data.runtimeMinutes}', '${data.genres}')`;
    con.query(sqlpost, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: false, message: 'An error occurred while creating movies data' });
        } else {
            return res.status(201).send({ status: true, message: 'Movie created successfully', result });
        }
    });
}


//====================================== controller for subtotal ================================================//


const subtotalsMovies = (req, res) => {
    const sqlGet = `SELECT m.genres AS Genre, m.primaryTitle, r.numVotes
    FROM movies m
    JOIN ratings r ON m.tconst = r.tconst
    
    UNION ALL
    
    SELECT m.genres AS Genre, 'TOTAL' AS primaryTitle, SUM(r.numVotes) AS numVotes
    FROM movies m
    JOIN ratings r ON m.tconst = r.tconst
    GROUP BY m.genres
    
    ORDER BY Genre ASC, CASE WHEN primaryTitle = 'TOTAL' THEN 1 ELSE 0 END, primaryTitle ASC;`
    con.query(sqlGet, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: false, message: 'An error occurred while fetching movies data' });
        } else {
            return res.status(200).send({ status: true, message: 'Subtotal movie access successfully', result });
        }
    })
}


//=================================== controller for update movies ==============================================//


const updateMovies = (req, res) => {
    const sqlupdate = `UPDATE movies
    SET runtimeMinutes = CASE
    WHEN genres LIKE '%Documentary%' THEN runtimeMinutes + 15
    WHEN genres LIKE '%Animation%' THEN runtimeMinutes + 30
    ELSE runtimeMinutes + 45
    END;`
    con.query(sqlupdate, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: false, message: 'An error occurred while updating movies data' });
        } else {
            return res.status(200).send({ status: true, message: 'Movie updated successfully', result });
        }
    });
}




module.exports = { getMovies, createMovies, subtotalsMovies, updateMovies }