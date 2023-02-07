import { useState, useEffect } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
import { Box,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex, Divider} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'


  const ViewSingleQuiz = ()=>
  {
    const navigate = useNavigate();
    const [quizzes , setQuizzes] = useState([]);
    const [questions , setQuestions] = useState([]);
    const [ teacher , setTeacher] =useState('');
    const [nofquestions , setNofQuestions] = useState('');
    const [campname , setCampName] = useState("");
    


    const getSingleUser = () =>
    {
      axios
        .get('http://localhost:5000/quizzes/getquiz/:',{params : {id: localStorage.getItem('quiz_viewid')}})
        .then((res) => {
          console.log(res.data);
          setCampName(res.data.campname);
          setTeacher(res.data.teacher);
          setNofQuestions(res.data.nofquestions);
          setQuestions(res.data.questions);
          console.log(questions);

         
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
      <Box pt={4} pb={2} mt={4} >
        <Heading mb={4} >
          Quiz Detais
        </Heading>
      </Box>

      <Flex maxW='2xl' mx="auto" justifyContent={'center'} gap={4} p={4} >
              <Text>
              Teacher Name: <Text color={'orange.800'} display={'inline'}> {teacher} </Text>
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

        

            {/* {questions.map((question,index) => (   */}
              
           { questions.map((ques,index) =>(

              <Flex flexDirection={'column'} width='90%' mx='auto'>
                <Text p={2} color='orange.900'> Question: {index+1}</Text>
                <Textarea required 
                          focusBorderColor='orange.700' 
                          variant={'outline'} 
                          borderColor='orange' 
                          ml={4} 
                          marginBottom={4} 
                          height={24} 
                          key={index} 
                          value={ques.questionLine} 
                          resize='none' />

                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mx='auto'>

                        <Box display={"flex"} p={1}>
                            <FormLabel margin={"auto"} pr={2} htmlFor="option-a">a: </FormLabel>
                            <Input required
                                    focusBorderColor='orange.700' 
                                    variant={'outline'} 
                                    borderColor='orange'  
                                    placeholder="Option A" 
                                    type="text"
                                    id="optionA" 
                                    name="optionA" 
                                    value={ques.optionA} />
                        </Box>

                        <Box display={"flex"} p={1}>
                            <FormLabel margin={"auto"} pr={2} htmlFor="option-b">b: </FormLabel>
                            <Input  required
                                    focusBorderColor='orange.700' 
                                    variant={'outline'} 
                                    borderColor='orange'
                                    placeholder="Option B" 
                                    type="text" 
                                    id="optionB" 
                                    name="optionB" 
                                    value={ques.optionB} 
                            />
                        </Box>

                        <Box display={"flex"} p={1}>
                            <FormLabel margin={"auto"} pr={2} htmlFor="option-c">c: </FormLabel>
                            <Input  required
                                    focusBorderColor='orange.700' 
                                    variant={'outline'} 
                                    borderColor='orange' 
                                    placeholder="Option C" 
                                    type="text" 
                                    id="optionC" 
                                    name="optionC"   
                                    value={ques.optionC} 
                            />
                        </Box>

                        <Box display={"flex"} p={1}>
                            <FormLabel margin={"auto"} pr={2} htmlFor="option-d">d: </FormLabel>
                            <Input required
                                    focusBorderColor='orange.700' 
                                    variant={'outline'} 
                                    borderColor='orange'
                                    placeholder="Option D" 
                                    type="text" 
                                    id="optionD" 
                                    name="optionD" 
                                    value={ques.optionD} 
                            />
                        </Box>

                    </Box>

                    <Box display={"flex"} p={4} justifyContent='center' alignItems={'center'} >
                        <FormLabel pr={2} htmlFor="correctOption">Correct Option </FormLabel>
                        <Select required
                                focusBorderColor='orange.700' 
                                variant={'outline'} 
                                borderColor='orange'
                                width="20%"
                                id="correctOption"
                                name="correctOption"
                                value={ques.correctOption}                            
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
        //    ))  
         ))} 
            {/* <Flex flexDir={'column'} justifyContent='center'>
                <Button  onClick={()=>handleSubmitView(quiz._id)} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-eye"></i>
                </Button>

                <Button  onClick={onOpen} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-trash"></i>
                </Button>

            </Flex> */}
        


        </Flex>
      </Flex>

      <Button mt={2} onClick={Back} type='button'  colorScheme='orange' variant='solid' >
            Back 
      </Button>

    </Box>

    
//        <Box width="100%" p={4} className="question-container" textAlign={"center"} >
//                   <Text mt={4}>    
//        Teacher Name : {teacher} 
//       </Text>
//       <Text mt={4}>    
//        Camp Name : {campname} 
//       </Text>
//       <Text mt={4}>    
//       No of Questions : {nofquestions} 
//       </Text>

   
//               {questions.map((question,index) => (  
            
//             <>   
//             {question.map((ques,index) =>(
//               <>
//               <Textarea required ml={4} marginBottom={4} placeholder="Enter the question" 
//               className="question-line" name="questionLine" key={index} value={ques.questionLine} 
//               />

// <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} className="options-container">
//                     <Box display={"flex"} p={1}>
//                         <FormLabel margin={"auto"} pr={2} htmlFor="option-a">a: </FormLabel>
//                         <Input required placeholder="Option A" type="text" className="question-options" id="optionA" name="optionA" 
//                         value={ques.optionA} />
//                     </Box>
//                     <Box display={"flex"} p={1}>
//                         <FormLabel margin={"auto"} pr={2} htmlFor="option-b">b: </FormLabel>
//                         <Input placeholder="Option B" type="text" className="question-options" id="optionB" name="optionB" 
//                        value={ques.optionB} 
//                         />
//                     </Box>
//                     <Box display={"flex"} p={1}>
//                         <FormLabel margin={"auto"} pr={2} htmlFor="option-c">c: </FormLabel>
//                         <Input placeholder="Option C" type="text" className="question-options" id="optionC" name="optionC"   
//                     value={ques.optionC} 
//                         />
//                     </Box>
//                     <Box display={"flex"} p={1}>
//                         <FormLabel margin={"auto"} pr={2} htmlFor="option-d">d: </FormLabel>
//                         <Input placeholder="Option D" type="text" className="question-options" id="optionD" name="optionD" 
//                         value={ques.optionD} 
//                         />
//                     </Box>
//                 </Box><Box display={"flex"} p={4}>
                        
//                         <Select
//                             width="50%"
//                             id="correctOption"
//                             name="correctOption"
//                             value={ques.correctOption} 
                            
                           
//                             required
//                         >

//                             <option value="">Select</option>
//                             <option value="A">A</option>
//                             <option value="B">B</option>
//                             <option value="C">C</option>
//                             <option value="D">D</option>
//                         </Select>

//                     </Box>
//               </> 
//             ))}
//             </>
//                  ))}    
//              {/* <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} className="options-container">
//                     <Box display={"flex"} p={1}>
//                         <FormLabel margin={"auto"} pr={2} htmlFor="option-a">a: </FormLabel>
//                         <Input required placeholder="Option A" type="text" className="question-options" id="optionA" name="optionA" 
//                         value={questions[index].optionA} />
//                     </Box>
//                     <Box display={"flex"} p={1}>
//                         <FormLabel margin={"auto"} pr={2} htmlFor="option-b">b: </FormLabel>
//                         <Input placeholder="Option B" type="text" className="question-options" id="optionB" name="optionB" 
//                        value={questions[index].optionB} 
//                         />
//                     </Box>
//                     <Box display={"flex"} p={1}>
//                         <FormLabel margin={"auto"} pr={2} htmlFor="option-c">c: </FormLabel>
//                         <Input placeholder="Option C" type="text" className="question-options" id="optionC" name="optionC"   
//                     value={questions[index].optionC} 
//                         />
//                     </Box>
//                     <Box display={"flex"} p={1}>
//                         <FormLabel margin={"auto"} pr={2} htmlFor="option-d">d: </FormLabel>
//                         <Input placeholder="Option D" type="text" className="question-options" id="optionD" name="optionD" 
//                         value={questions[index].optionD} 
//                         />
//                     </Box>
//                 </Box><Box display={"flex"} p={4}>
                        
//                         <Select
//                             width="50%"
//                             id="correctOption"
//                             name="correctOption"
//                             value={questions[index].correctOption} 
                            
                           
//                             required
//                         >

//                             <option value="">Select</option>
//                             <option value="A">A</option>
//                             <option value="B">B</option>
//                             <option value="C">C</option>
//                             <option value="D">D</option>
//                         </Select>

//                     </Box>          */}
                      
//                    <Button  onClick={Back}
//       style={{
//         position: 'absolute',
//         right: 30,
//         bottom:10,
//       }}
//       colorScheme='teal' variant='solid'>
//   Back
//   </Button>
//         </Box> 
       
    )
  }

  export default  ViewSingleQuiz;