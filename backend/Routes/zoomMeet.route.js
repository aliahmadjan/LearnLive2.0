const express = require('express');
const router = express.Router();

const ZoomController = require('../Controllers/zoomMeet.controller')

router.post('/addData',ZoomController.AddMeetingDetails);
router.get('/getData',ZoomController.GetMeetData);
router.post('/getDataEmail', ZoomController.meetDataByEmail);
router.delete('/deleteclass/:id',ZoomController.deletingMeet);

module.exports = router;