const con = require('../utils/connection')


//=========================== controller for get top rated movies ===============================================//


const getRatings = ((req, res) => {
    const sqlGet = `SELECT m.tconst, m.primaryTitle, m.genres, r.averageRating
    FROM movies m
    JOIN ratings r ON m.tconst = r.tconst
    WHERE r.averageRating > 6.0
    ORDER BY r.averageRating DESC;`;
    con.query(sqlGet, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: false, message: 'An error occurred while fetching movies data' });
        } else {
            return res.status(200).send({ status: true, message: 'Get an average movies rating successfully', result });
        }
    });
});



module.exports = { getRatings }