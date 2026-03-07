const express = require('express');
const router = express.Router();
const {
  createPrediction,
  getPredictions,
  getPredictionById,
  getAnalytics
} = require('../controllers/predictionController');

router.get('/analytics', getAnalytics);
router.route('/')
  .get(getPredictions)
  .post(createPrediction);

router.get('/:id', getPredictionById);

module.exports = router;
