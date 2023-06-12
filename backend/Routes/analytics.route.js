const express = require('express');
const router = express.Router();
const AnalyticsController = require('../Controllers/analytics.controller')


router.get('/getretenrate',AnalyticsController.calculateRetentionRate);

router.get('/getgenderatio' , AnalyticsController.analyzeGenderRatio);

router.get('/getdiffabled',AnalyticsController.analyzeDifferentlyAbledPercentage);

router.get('/getgroupedhours' , AnalyticsController.calculateTotalGroupedHours);

router.get('/getonetoone' , AnalyticsController.calculateTotalOneToOneHours);

router.get('/getcity',AnalyticsController.findCityWithMostStudents)

router.get('/getcountry', AnalyticsController.findCountryWithMostStudents)

module.exports = router;