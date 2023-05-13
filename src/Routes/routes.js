const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')
const ratingsController = require('../controllers/ratingsController')


router.get('/api/v1/longest-duration-movies', moviesController.getMovies)
router.post('/api/v1/new-movie', moviesController.createMovies)
router.get('/api/v1/top-rated-movies', ratingsController.getRatings)
router.get('/api/v1/genre-movies-with-subtotals', moviesController.subtotalsMovies)
router.put('/api/v1/update-runtime-minutes', moviesController.updateMovies)


module.exports = router








