import { Avatar,Grid, Box,Button, Input, Text, Heading, Flex, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,} from "@chakra-ui/react";
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

    const [results , setResults ] = useState([])
    const [ query ,setQuery] = useState("") 
    const navigate = useNavigate();

    const getSingleUser = () =>
    {
      console.log(`${localStorage.getItem('submitquiz_viewid')}`)
      axios
      
        .get(`http://localhost:5000/quizscore/getquizresults/${localStorage.getItem("quiz_viewid")}`)
        .then((res) => {
           setQuizzesScore(res.data)
           setResults(res.data)
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
    const handleBack = () =>
    {
      navigate('/teacher/viewquizzes')
    }


    useEffect(()=>
    {
        getSingleUser();
    },[])



    const handleSearch = async(e) =>
    {
      const query = e.target.value;
      setQuery(query);
      if (query === '') {
        setResults(quizzesScore);
      } else {
        const filteredQuizzesResults = quizzesScore.filter((quiz) =>
          quiz.student_name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredQuizzesResults);
      }
          
    }
 
 
    useEffect(()=>
    {
    
    },[results])

  return (

    
    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box>
        <Heading mb={4} >
          Quiz Results
        </Heading>
      </Box>

    
      <Box width={'80%'} mx="auto" >

        <Flex p={4}>
          <Input 
          type="text"
          placeholder="Student's Name"
          onChange={handleSearch}
          variant={'outlined'} borderColor='orange'
          value={query}
          >
          </Input>
          
        </Flex>
      </Box>

      <Box width={'76%'} mx='auto' py={4}>
        {/* <Heading size={'md'} mb={4}> Students Scores </Heading> */}

        <TableContainer
          px={4} 
          maxHeight='60vh'
          overflowY='scroll'
          sx={{
            '&::-webkit-scrollbar': {
              width: '16px',
              borderRadius: '8px',
              backgroundColor: 'white',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `orange.500`,
              borderRadius: '8px',
            },
          }}>

          <Table variant={'simple'} >
            
            <TableCaption>Student Quiz Scores</TableCaption>
            
            <Thead>
              <Tr>
                <Th>Student Name</Th>
                <Th>Quiz Score</Th>
              </Tr>
            </Thead>

            <Tbody>
              {results.map((score, index) => (
                <Tr key={index}>
                  <Td>{score.student_name}</Td>
                  <Td>{score.quiz_score}/{score.total_questions}</Td>
                </Tr>
              ))}
            </Tbody>

          </Table>
        </TableContainer>
      </Box>

      <Button colorScheme='orange' onClick={handleBack}>
          Back
        </Button>
   
  </Box>

  );
}

export default ViewQuizResults;