const TeacherAssignments = require('../Models/teacher-assignments.model')

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
    //console.log(req.teacher._id.toHexString())
  const tchass =   TeacherAssignments.find()
  //console.log(tchass[0])
  const arr = []
   for(let i=0; i<tchass.length; i++)
   {
  
    //for(let j=0; j<tchass[i].teacher.length; j++)
    //{
      //const id = ObjectId();
      //console.log(tchass[i].teacher)
      
       if (req.teacher._id.toHexString() === tchass[i].teacher)
       {
        //console.log("Hello World")
        arr.push(tchass[i] )
       // console.log(tchass[i].campname)
      }
   // }
  }
  //res.send(tchass)
  res.send(arr)
}

//exports.AddPost = AddPost;
exports.GetAssignments=GetAssignments
exports.GetSingleAssignment= GetSingleAssignment;
exports.UpdateAssignments= UpdateAssignments;
exports.DeleteAssignments = DeleteAssignments;
exports.GetCurrTchAssign = GetCurrTchAssign;