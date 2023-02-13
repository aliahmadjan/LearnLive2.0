const express = require('express');
const router = express.Router();

const ZoomController = require('../Controllers/zoomMain.controller')

router.post('/addData',ZoomController.AddZoom);
router.get('/getData',ZoomController.GetZoomData);
router.delete('/deleteData',ZoomController.DeleteZoomData)
router.post('/getToken',ZoomController.findAccessToken)
router.put('/updatezoommain/:id',ZoomController.updateZoomToken)
router.get('/zoom-refresh',ZoomController.refreshZoom)
router.post('/connectZoom',ZoomController.ConnectZoom)
router.post('/getMeetings',ZoomController.meetingsInfo)
router.post('/createMeeting',ZoomController.createMeeting)

module.exports = router;