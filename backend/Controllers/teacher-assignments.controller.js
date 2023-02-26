const TeacherAssignments = require('../Models/teacher-assignments.model')
const Student = require('../Models/student.model')

const GetAssignments = async(req,res,next)=>
{
   // res.sendFile(__dirname + ".pdf");
    TeacherAssignments.find((error,data)=>
    {
        if(error)
        {
            return next(error);
        }
        else{
            res.json(data);
        }
    })
};

const GetSingleAssignment = async(req,res,next)=>
{
    var x = req.query.id;
    TeacherAssignments.findById(x , (error,data) =>
    {
        if(error)
        {
            return next(error);
        }
        else 
        {
            res.json(data);
        }
    })
};

const UpdateAssignments = async(req,res)=>
{
    TeacherAssignments.findByIdAndUpdate(req.params.id, {
        $set: req.body
          }, (error, data) => {
            if (error) {
              res.send("Error")
              console.log(error)
            } else {
              res.json(data)
            }
          })
}

const DeleteAssignments = async(req,res,next)=>
{
   TeacherAssignments.findByIdAndDelete(req.params.id,(error,data)=> {
        if(error){
            return next(error);
        }
        else {
            res.send("Post Deleted Successfully!")
            res.status(200).json({
                msg:data
            })
        }
    })
}

const GetCurrTchAssign = async(req,res) => 
{
  const tchass =   TeacherAssignments.find()

 
  const arr = []
   for(let i=0; i<tchass.length; i++)
   {
       if (req.teacher._id.toHexString() === tchass[i].teacher)
       {
        
        arr.push(tchass[i] )
       
      }
  }
  res.send(arr)
}

// const GetStdSameAssign = async(req,res)=> // assignment and student camp should be same
// {
//     const tchass = await TeacherAssignments.find()
//     const std = await Student.find()
//     const arr =[]
//     const arr1 =[]
//     const arr2 = []
    
//      for(let i=0;i<tchass.length ;i++)
//      {
//         for (let j=0; j<std.length;j++)
//           { 
//          if(tchass[i].campname === std[j].campname)
//          {
//             //console.log(tchass[i])
//              arr.push(tchass[i])
//           }
//        }
//      }
//     //  for(let k=0;k<std.length ;k++)
//     //  {
//     //     for (let l=0; l<arr.length;l++)
//     //       { 
//     //      if(std[k].campname === arr[l].campname)
//     //      {
//     //         //console.log(tchass[i])
//     //          arr1.push(arr[l])
//     //       }
//     //       else{
                
//     //       }
//     //    }
//     //  }
//      if (arr.length != 0)
//      {
//         res.send(arr)
//      }
//      else{
//         res.send(arr2)
//      }
     
// }

//exports.AddPost = AddPost;
exports.GetAssignments=GetAssignments
exports.GetSingleAssignment= GetSingleAssignment;
exports.UpdateAssignments= UpdateAssignments;
exports.DeleteAssignments = DeleteAssignments;
exports.GetCurrTchAssign = GetCurrTchAssign;
//exports.GetStdSameAssign = GetStdSameAssign