import { Avatar,Grid, Box,Button, Input, Text, Heading, Flex} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";


const ViewQuizResults=()=>
 {
    const [quizID , setQuizID] = useState("")
    const [studentID , setStudentID] = useState([])
    const [campname , setCampname] = useState("")
    const [quizscore , setQuizScore] = useState("")
    const [ totalquestions , setTotalQuestions] = useState("")
    const [ quizzesScore , setQuizzesScore ] = useState([])
    const navigate = useNavigate();

    const getSingleUser = () =>
    {
      console.log(`${localStorage.getItem('submitquiz_viewid')}`)
      axios
      
        .get(`http://localhost:5000/quizscore/getquizresults/${localStorage.getItem("quiz_viewid")}`)
        .then((res) => {
           setQuizzesScore(res.data)
        //   setQuizID(res.data.quiz_id)
           //setStudentID(res.data.student_id)
        //   setCampname(res.data.campname)
          // setQuizScore(res.data.quiz_score)
          // setTotalQuestions(res.data.total_questions)
          
        
        
         
        })
        .catch((err) => {
          console.log(err);
        });
    }


    useEffect(()=>
    {
        getSingleUser();
    },[])

    const Back = ()=>
    {
      navigate("/teacher/viewquizzes");
    }

  return (

    
    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
    <Box pt={4} pb={2}  >
      <Heading mb={4} >
        View Scores
      </Heading>
    </Box>

    
  <Flex mt={4} maxW='4xl' mx="auto" width={'100%'} gap={4} >
  {/* <Flex p={4} pt={0}>
    <Input placeholder="Student's Name" variant={'outlined'} borderColor='orange'></Input>
    <Button colorScheme={'orange'}>Search</Button>
  </Flex> */}
  <Box width={'50%'}>
    <Heading size={'md'} mb={4}> Quiz Scores </Heading>
    <Flex width="100%" border={'1px solid orange'} gap={2} justifyContent='space-around' height='50vh' borderRadius='20px' p={4} flexWrap='wrap' overflow='scroll'>

      {quizzesScore.map((score,index) => (         
        <Box p={2} height="100px">  
          <Text> Name : { score.student_name}</Text>
          <Text> Quiz Score :  {score.quiz_score + "/" + score.total_questions}</Text>   
        </Box>
      ))}   

    </Flex>
  </Box>
  

</Flex>

   
  </Box>

  //       <Box width="80%" mt={8}  mx={"auto"}>
  //       <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>Assignment</Text>
  //           {/* <Grid templateColumns="repeat(3, 1fr)" gap={10} overflow="scroll" height="80%" > */}
            
  //           <Text >
  //                  Campname: {campname}
  //               </Text>
  //           <Text >
  //                  Title: {title}
  //               </Text>
  //               <Text> Description: {description}</Text>
  //               <Text>Total Marks: {tmarks}</Text>
  //               <Text>Uploaded Date: {uploadeddate}</Text>
  //               <Text>Due Date: {duedate}</Text>
                
            // {uplassign.map((assign,index) => (
            //     <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10}>
                
            //     <iframe
            //         src={uplassign[index]}
            //         style={{
            //           height: "200px",
            //           width: "400px",
            //           class: "center",
            //           borderRadous: "50%",
            //         }}
            //       />
                  
            //     </Box>
            // ))} 
  //           <Button  onClick={()=>handleSubmitView(assignments._id)} colorScheme='teal' variant='solid'>

  //                   View Submitted Assignments

  //           </Button>
  //                   <Button  onClick={Back}
  //     style={{
  //       position: 'absolute',
  //       right: 30,
  //       bottom:10,
  //     }}
  //     colorScheme='teal' variant='solid'>
  // Back
  // </Button>
  //           {/* </Grid> */}
  //       </Box>
  );
}

export default ViewQuizResults;