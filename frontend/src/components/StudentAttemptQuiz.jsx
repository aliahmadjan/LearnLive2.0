import { useState, useEffect } from "react"
import { Box,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex, Divider} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate, useParams, Link} from "react-router-dom";


import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'


  const StudentAttemptQuiz = ()=>
  {

    const navigate = useNavigate();
    const [ name ,setName] = useState("");
    const [quizzes , setQuizzes] = useState([]);
    const [questions , setQuestions] = useState([]);
    const [teacher_name , setTeacherName] =useState('');
    const [nofquestions , setNofQuestions] = useState('');
    const [campname , setCampName] = useState("");

    const [isClicked, setIsClicked] = useState(false);

    const [userID , setUserID] = useState("");
    
    // ---------------------------------------------------------------------------------------------
    const [selectedOptions, setSelectedOptions] = useState([]);


    const allNewSelectedOptions = () => {
      const newOptions = [];

      for (let i = 0; i < nofquestions; i++) {
        newOptions.push({
          id: i + 1,
          selectedOption: '',
        });
      }
        return newOptions;
    };


    function handleChange(questiondId,event){
      const { name, value } = event.target;

      setSelectedOptions( oldOptions => oldOptions.map(
          option => option.id == questiondId ? {...option, selectedOption: value} : option
      ))
    
    }

    const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("ltoken")
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/student/viewprofile")
      .then(res=> {
              setUserID(res.data._id);
              setName(res.data.name)
      }).catch (err=> {
          console.log(err) })
  }

  

  useEffect(()=>
  {
      getCurentUser();
     
  })

    function submitQuiz(){

      // console.log(selectedOptions)

      let score = 0;


      for(let i = 0 ; i < questions.length; i++){
          if(questions[i].correctOption == selectedOptions[i].selectedOption)
          {
              score++
             
          }
      }
      const formData = new FormData();
      // formData.append('quiz_id',`${localStorage.getItem('quiz_viewid')}`)
      // fetch('http://localhost:5000/quizscore/addquizscore',
      // {
      // method: 'POST',
      // body: formData,
      // })
      axios.post('http://localhost:5000/quizscore/addquizscore',
      {
        //body: formData
        quiz_id: `${localStorage.getItem('quiz_viewid')}`,
        student_name : name,
        student_id : userID,
        campname:campname,
        quiz_score: score,
        total_questions: questions.length
     }).then(res =>
        {
          setIsClicked(true);
        }).catch(err=>
          {
            console.log(err)
          })

         
          axios.post('http://localhost:5000/leaderboard/addquizscore',
          {
            campname: campname,
            student_name : name,
            student_id: userID,
             quiz_score: score,
            total_quizscore: questions.length,
            tchquiz_id: `${localStorage.getItem('quiz_viewid')}`
            
          }).then (res =>
            {

            }).catch(err => 
              {
                console.log(err)
              })
   
    

      //console.log('score : ' , score)
      
      navigate('/student/quizresult', {state: {questions, nofquestions, teacher_name, campname, score, selectedOptions}})

      //console.log(selectedOptions)
      //setResultMarks(score)
      //setQuizSubmitted(true)
      //console.log(resultElements)
      }
    
    // -----------------------------------------------------------------------------------------------------

    const getSingleUser = () =>
    {
      axios
        .get('http://localhost:5000/quizzes/getquiz/:',{params : {id: localStorage.getItem('quiz_viewid')}})
        .then((res) => {
          setCampName(res.data.campname);
          setTeacherName(res.data.teacher_name);
          setNofQuestions(res.data.nofquestions);
          setQuestions(res.data.questions);
          //console.log(questions);
        })
        .catch((err) => {
          console.log(err);
        });
    }


    useEffect(()=>
    {
        getSingleUser();
        
    },[])

    useEffect(() =>{
      setSelectedOptions(allNewSelectedOptions())
    }, [questions])

    

    const Back = ()=>
    {
      navigate("/student/quizzes");
    }



    //console.log(questions);
    //console.log(selectedOptions)
    


    

  //setSelectedOptions(allNewSelectedOptions());


    return (

    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2} mt={4} >
        <Heading mb={4} >
          Attempt Quiz
        </Heading>
      </Box>

      <Flex maxW='2xl' mx="auto" justifyContent={'center'} gap={4} p={4} >
              <Text>
              Teacher Name: <Text color={'orange.800'} display={'inline'}> {teacher_name} </Text>
              </Text> 
              <Text>
              Camp: <Text color={'orange.800'} display={'inline'}> {campname} </Text> 
              </Text> 
              <Text>
              Questions : <Text color={'orange.800'} display={'inline'}> {nofquestions} </Text> 
              </Text>
      </Flex>



      <Flex maxW='4xl' mx="auto" flexDirection={'column'}>


        <Flex border={'1px solid orange'} 
              gap={2} 
              justifyContent='space-around' 
              height='50vh' borderRadius='10px' 
              p={4} flexWrap='wrap' 
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

        

            {questions.map((question,index) => (  
              
           
              <Flex flexDirection={'column'} width='90%' mx='auto'>
                <Text p={2} color='orange.900'> Question: {index+1}</Text>
                <Textarea isReadOnly 
                          focusBorderColor='orange.700' 
                          variant={'outline'} 
                          borderColor='orange' 
                          ml={4} 
                          marginBottom={4} 
                          height={24} 
                          key={index} 
                          value={question.questionLine} 
                          resize='none' />

                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mx='auto'>

                        <Box display={"flex"} p={1}>
                            <FormLabel margin={"auto"} pr={2} htmlFor="option-a">a: </FormLabel>
                            <Input  isReadOnly
                                    focusBorderColor='orange.700' 
                                    variant={'outline'} 
                                    borderColor='orange'  
                                    placeholder="Option A" 
                                    type="text"
                                    id="optionA" 
                                    name="optionA" 
                                    value={question.optionA} />
                        </Box>

                        <Box display={"flex"} p={1}>
                            <FormLabel margin={"auto"} pr={2} htmlFor="option-b">b: </FormLabel>
                            <Input  isReadOnly
                                    focusBorderColor='orange.700' 
                                    variant={'outline'} 
                                    borderColor='orange'
                                    placeholder="Option B" 
                                    type="text" 
                                    id="optionB" 
                                    name="optionB" 
                                    value={question.optionB} 
                            />
                        </Box>

                        <Box display={"flex"} p={1}>
                            <FormLabel margin={"auto"} pr={2} htmlFor="option-c">c: </FormLabel>
                            <Input  isReadOnly
                                    focusBorderColor='orange.700' 
                                    variant={'outline'} 
                                    borderColor='orange' 
                                    placeholder="Option C" 
                                    type="text" 
                                    id="optionC" 
                                    name="optionC"   
                                    value={question.optionC} 
                            />
                        </Box>

                        <Box display={"flex"} p={1}>
                            <FormLabel margin={"auto"} pr={2} htmlFor="option-d">d: </FormLabel>
                            <Input  isReadOnly
                                    focusBorderColor='orange.700' 
                                    variant={'outline'} 
                                    borderColor='orange'
                                    placeholder="Option D" 
                                    type="text" 
                                    id="optionD" 
                                    name="optionD" 
                                    value={question.optionD} 
                            />
                        </Box>

                    </Box>

                    <Box display={"flex"} p={4} justifyContent='center' alignItems={'center'} >
                        <FormLabel pr={2} htmlFor="correctOption">Correct Option </FormLabel>
                        <Select
                                focusBorderColor='orange.700' 
                                variant={'outline'} 
                                borderColor='orange'
                                width="20%"
                                id="correctOption"
                                name={'selectedOption'}
                                defaultValue={''}
                                onChange={(event) => handleChange(question.id, event)}                     
                        >
                            <option value="" disabled>Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </Select>

                    </Box>

                    <Divider p={2} variant='dashed' borderColor={'orange.900'} />
                </Flex>

                
            ))}


        </Flex>
      </Flex>

      <Button mt={2} onClick={submitQuiz} disabled={isClicked} mx={4} type='button'  colorScheme='orange' variant='solid' >
                          Submit 
      </Button>

      <Link to='/student/quizresult' state={{ from: "occupation" }}>
        
      </Link>

      <Button mt={2} mx={4} onClick={Back} type='button'  colorScheme='orange' variant='solid' >
            Back 
      </Button>

    </Box>

    )
  }

  export default  StudentAttemptQuiz;