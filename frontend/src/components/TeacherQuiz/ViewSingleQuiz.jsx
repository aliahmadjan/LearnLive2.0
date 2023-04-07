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
    const [ teacher_name , setTeacherName] =useState("");
    
    const [nofquestions , setNofQuestions] = useState('');
    const [campname , setCampName] = useState("");

    const[uploadeddate , setUploadedDate] = useState("")
    const [q ,setQ] = useState([])
    


    const getSingleUser = () =>
    {
      axios
        .get('http://localhost:5000/quizzes/getquiz/:',{params : {id: localStorage.getItem('quiz_viewid')}})
        .then((res) => {
          setCampName(res.data.campname);
          setTeacherName(res.data.teacher_name);
          setNofQuestions(res.data.nofquestions);
          setQuestions(res.data.questions);
          setUploadedDate(res.data.uploadeddate)

         
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(()=>
    {
        getSingleUser();
    },[])

    const handleSubmitView = (submitquiz_viewid) =>
    {
        localStorage.removeItem('submitquiz_viewid')
         localStorage.setItem('submitquiz_viewid',submitquiz_viewid)
            navigate("/teacher/viewquizresults");
    }

    const Back = ()=>
    {
      navigate("/teacher/viewquizzes");
    }

    return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Quiz Details
        </Heading>
      </Box>

      <Flex maxW='2xl' mx="auto" justifyContent={'center'} gap={4} p={4} >
              <Text>
              Teacher Name: <Text color={'#F57C00'} display={'inline'}> {teacher_name} </Text>
              </Text> 
              <Text>
              Camp: <Text color={'#F57C00'} display={'inline'}> {campname} </Text> 
              </Text> 
              <Text>
              Uploaded Date : <Text color={'#F57C00'} display={'inline'}> {uploadeddate} </Text> 
              </Text>
              <Text>
              Questions : <Text color={'#F57C00'} display={'inline'}> {nofquestions} </Text> 
              </Text>
      </Flex>



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
                          borderColor='#F57C00' 
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
                                    borderColor='#F57C00'  
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
                                    borderColor='#F57C00'
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
                                    borderColor='#F57C00' 
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
                                    borderColor='#F57C00'
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
                                borderColor='#F57C00'
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
      <Box p={4}>
          <Button mx={4} onClick={()=>handleSubmitView(quizzes._id)} colorScheme='orange' variant='solid'>
              Submissions
          </Button>

          <Button mx={4} onClick={Back} type='button' colorScheme='orange' variant='outline'>
              Back
          </Button>
        </Box>

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