import { useState, useEffect, createContext, useContext  } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
import { Select,Input,Box, FormControl,FormLabel,Button, Heading,Flex, Text } from "@chakra-ui/react"
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  const UserContext = createContext()


const QuizQuesionsInfo =(props) =>
{
    //const [ questions, setQuestions] = useState([]);
   
    const [options, setOptions] = useState([]);
    const [answers, setAnswers]= useState([]);
    const [submitStatus , setSubmitStatus] = useState(0);
    const [userID , setUserID] = useState("");
    const [name , setName] = useState("");
    const [campname , setCampName] = useState([]);
    const [ selectedCamp , setSelectedCamp] = useState([]);
    const [quizno , setQuizNo] = useState("");
    const [quizID , setQuizID] = useState("");

    const[questions, setQuestions] = useState(allNewQuestions())
    const navigate = useNavigate();

    const Back = ()=>
    {
     
        // setDetails({
        //     noOfQuestions: 1,
        //     isMade: false,
        // });

        // console.log(details.isMade)
      
    }
    

    function allNewQuestions(){

        const newQuestions = []

        for(let i = 0 ; i < props.noOfQuestions ; i++){
            newQuestions.push({
                id: i+1,
                questionLine: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correctOption: ""  
            })
        }
        
        return newQuestions
    }

    function handleChange1(id,event){

        const { name, value } = event.target

        //console.log(name,value)
        setQuestions( oldQuestions => {
            return oldQuestions.map(question => question.id === id ? {...question,[name]: value} : question)
        })
    }

    const[details,setDetails] = useState({
        noOfQuestions: 1,
        isMade: false
    })

    function handleChange2(event){
        const{name,value} = event.target
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                [name]: value
            }
        })
    }


   

    useEffect(()=>
    {
      //getCurentUser();
      //getCurrentCampName(userID);

    },[])


    const StateContext = createContext();
    const makeQuiz=()=>{
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                isMade: !oldDetails.isMade
            }
        })

        axios.post("http://localhost:5000/quizzes/addquiz",
        {
    //    // campname: selectedCamp,
    //     //teacher:name,
         quizno: quizno,
         nofquestions:details.noOfQuestions,
        }).then(res =>
         {
                 setQuizID(res.data._id);
                 localStorage.setItem("quizID",res.data._id)
        }).catch(err=>
            {
             })

    }


    const createQuiz = (event) => {
        event.preventDefault();
        
        axios.post(`http://localhost:5000/quizzes/addquizques/${localStorage.getItem('quizID')}`,
        {
        questions:questions
        }).then(res =>
         {
             setSubmitStatus(1);
         }).catch(err=>
             {
                 setSubmitStatus(-1)
             })

       
    }


    const StatusAlert = () => {
        if (submitStatus === -1)
          return (
            <Alert status='error'>
            <AlertIcon />
           Quiz was not created!
          </Alert>
          );
        if (submitStatus === 1)
          return (
            <Alert status='success'>
            <AlertIcon />
           Quiz was created Successfully!
          </Alert>
          );
      };

    const questionElements = questions.map( question => 
        <QuizQuestionComponent 
            key={question.id}
            id={question.id}
            questionLine={question.questionLine} 
            optionA={question.optionA} 
            optionB={question.optionB}
            optionC={question.optionC}
            optionD={question.optionD}
            correctOption={question.correctOption}
            onChange={(e) => handleChange1(question.id,e)}/>)

        const handleBack  =() =>
        {
            navigate('/teacher/uploadquiz')
        }
    
    return (

       
            details.isMade ? 
            <QuizQuesionsInfo noOfQuestions={details.noOfQuestions}/>
            :
            <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

                <Box pt={4} pb={2}>
                    <Heading mb={4}>
                    Upload Quiz
                    </Heading>
                </Box>

                <form onSubmit={createQuiz}>

                    <Flex maxW='4xl' mx="auto" flexDirection={'column'}>


                        <Flex boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                            borderRadius='15px'
                            backgroundColor="#FFFFFF"
                            gap={2} 
                            justifyContent='space-around' 
                            height='50vh'
                            p={4} flexWrap='wrap' 
                            overflowY='scroll'
                            sx={{
                                '&::-webkit-scrollbar': {
                                width: '16px',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                backgroundColor: `#F57C00`,
                                borderRadius: '8px',
                                },
                            }}>

                        {questionElements}

                        </Flex>
                    </Flex>

                    <Button mt={4} mx={2} type='submit' colorScheme='orange' variant='solid'> 
                        Create
                    </Button>

                    {/* <Button mt={4} mx={2} onCLick={handleBack} colorScheme='orange' variant='solid'> 
                        Back
                    </Button> */}

                    {/* <Button mt={4} mx={2} onClick={Back} type='button'  colorScheme='orange' variant='solid' display={'inline'}> 
                        Back
                    </Button> */}

                </form>

                    
                
                <Box width={'30%'} m={2} mx='auto'>
                    <StatusAlert />
                </Box>
                
                
            </Box>

    )
}

export default QuizQuesionsInfo