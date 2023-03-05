const express = require('express');
const router = express.Router();
const ZoomClasses = require ('../Models/zoomMeet.model')
const ZoomController = require('../Controllers/zoomMeet.controller')
const TokenTeacher = require('../Middleware/TeacherToken');
const TokenStudent = require('../Middleware/StudentToken');


router.post('/addData',ZoomController.AddMeetingDetails);
router.get('/getData',ZoomController.GetMeetData);
router.post('/getDataEmail', ZoomController.meetDataByEmail);
router.delete('/deleteclass/:id',ZoomController.deletingMeet);


router.get('/getcurrclasses',TokenTeacher, async(req,res)=>
{
  //console.log(req.teacher._id.toHexString())
  const zoomCls =  await ZoomClasses.find()
  const arr = []
   for(let i=0; i<zoomCls.length; i++)
   {
       if (req.teacher._id.toHexString() === zoomCls[i].teacher)
       {
       
        arr.push(zoomCls[i] )      
      }
  }
  res.send(arr)
})

router.get('/getcurrcampclasses',TokenStudent, async(req,res)=>
{
  //console.log(req.teacher._id.toHexString())
  const zoomCls =  await ZoomClasses.find()
  const arr = []
   for(let i=0; i<zoomCls.length; i++)
   {
       if (req.student.campname.includes(zoomCls[i].campname))
       {
       
        arr.push(zoomCls[i])      
      }
  }
  res.send(arr)
})

module.exports = router;