import { Select,Box, Input, Text, FormControl, FormLabel, Button, Flex, Heading, Divider} from "@chakra-ui/react"
import { useEffect } from "react";
import { useState } from "react"
import axios from "axios"
import QuizQuesionsInfo from "./QuizQuestionsInfo"

const QuizInfo = () => {
   
    const [name, setName] = useState("");
    const [ userID, setUserID] = useState("");
    const [quizno , setQuizNo] = useState("");
    const [campname , setCampName] = useState([]);
    const [quizID , setQuizID] = useState("");
    const [selectedCamp , setSelectedCamp] = useState("");
    const[details,setDetails] = useState({
        noOfQuestions: 1,
        isMade: false
    })

    const getCurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      //axios.get("http://learnlive.onrender.com/teacher/viewprofile")
      axios.get("https://learnlive.onrender.com/teacher/viewprofile")
        .then(res=> {
                setUserID(res.data._id);
                setName(res.data.name);
        }).catch (err=> {
            console.log(err) })
    }
  
  
    const getCurrentCampName = (userID) =>
    {
      localStorage.setItem('userID',userID)
      //axios.get('http://localhost:5000/camp/getcampteacher/:',{params : {id:localStorage.getItem('userID')}}).then(res =>
      axios.get(`https://learnlive.onrender.com/camp/getcampteacher/${localStorage.getItem('userID')}`).then(res =>
      {
        setCampName(res.data);
  
      }).catch(err =>
        {
          console.log(err);
        })
    }
 

    function handleChange(event){
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
          getCurentUser();
          getCurrentCampName(userID);
    
        })


    function makeQuiz(){
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                isMade: !oldDetails.isMade
            }
        })
        
        axios.post("https://learnlive.onrender.com/quizzes/addquiz",
        {
         campname: selectedCamp,
         teacher:userID,
         teacher_name: name,
         quizno: quizno,
         nofquestions:details.noOfQuestions,
        }).then(res =>
         {
                 setQuizID(res.data._id);
                 localStorage.setItem("quizID",res.data._id)
                 //setQuizID(res.data._id);
                 // console.log(quizID);
                // console.log(res.data._id); 
 
                    
             //setSubmitStatus(1);
         }).catch(err=>
             {
                 //setSubmitStatus(-1)
             })


    }


  

    return (
        details.isMade ? 
        <QuizQuesionsInfo noOfQuestions={details.noOfQuestions}/>
        :

        <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
            <Box pt={4} pb={2} mt={4}  >
                <Heading mb={4} >
                Upload Quiz
                </Heading>
                <Text>
                Please Fill Out Details 
                </Text>
            </Box>

            <form onSubmit={makeQuiz}>
                <Box p={5} mt={8} maxW="lg" mx="auto" textAlign={'start'} position={'relative'} border='1px solid orange' borderRadius={10}>
                    
                    <FormControl mb={2} display={'flex'} alignItems='center'>
                        <FormLabel htmlFor="Camp" fontWeight="bold" color="orange.500" mr={2} >Camp</FormLabel>
                        <Select textAlign={'center'}
                                focusBorderColor='orange.700' 
                                variant={'flushed'} 
                                borderBottomColor='orange' 
                                isRequired
                                width={'60%'} 
                                mr={0} ml='auto'
                                id='Camp'
                                name='Camp'
                                value={selectedCamp}
                                onChange={e => setSelectedCamp(e.target.value)}>
                                    
                                    <option value="" disabled>
                                        Select
                                    </option>

                                    {Array.isArray(campname) && campname.map((campname) => (  
                                    <> 
                                        <option value={campname}>{campname}</option>
                        
                                        </>
                                    ))} 
                        </Select>
                    </FormControl>

                    <FormControl mb={2} display={'flex'} alignItems='center'>
                        <FormLabel htmlFor="Camp" fontWeight="bold" color="orange.500" mr={2} >Quiz No</FormLabel>
                        <Input 
                            textAlign={'center'}
                            focusBorderColor='orange.700' 
                            variant={'flushed'} 
                            borderBottomColor='orange' 
                            isRequired
                            width={'60%'} 
                            mr={0} ml='auto'
                            id='quizno'
                            name='quizno'
                            onChange={e=>setQuizNo(e.target.value)}
                            placeholder= "e.g Quiz 1"
                        /> 

                    </FormControl>

                    <FormControl mb={2} display={'flex'} alignItems='center'>
                        <FormLabel htmlFor="noOfQuestions" fontWeight="bold" color="orange.500" mr={2} >No of Questions</FormLabel>
                        <Input type="number"
                            textAlign={'center'}
                            focusBorderColor='orange.700' 
                            variant={'flushed'} 
                            borderBottomColor='orange' 
                            isRequired
                            width={'60%'} 
                            mr={0} ml='auto'
                            id='noOfQuestions'
                            name='noOfQuestions'
                            onChange={handleChange}
                            placeholder= "e.g 2"
                            
                        /> 

                    </FormControl>

                </Box>

                <Button mt={4} type='submit' colorScheme='orange' variant='solid'>Proceed</Button>

            </form>
                
        </Box>

    )
}

export default QuizInfo