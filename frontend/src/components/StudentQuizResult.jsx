import React from 'react'
import { Box, Heading, Text, Link, Flex, Textarea, FormLabel, Input, Select, Divider, Button} from '@chakra-ui/react'
import { useLocation, useParams } from 'react-router-dom'

const StudentQuizResult = () => {

    const {questions, nofquestions, teacher_name, campname, score, selectedOptions} = useLocation().state;


  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Quiz Result
        </Heading>
      </Box>

      <Flex maxW='2xl' mx="auto" justifyContent={'center'} gap={4} p={4} >
              <Text>
              Questions : <Text color={'orange.800'} display={'inline'}> {nofquestions} </Text> 
              </Text>
              <Text>
              Score : <Text color={'orange.800'} display={'inline'}> {score} </Text> 
              </Text>
      </Flex>



      <Flex maxW='4xl' mx="auto" flexDirection={'column'}>


      <Flex boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              borderRadius='15px'
              backgroundColor="#FFFFFF"
              gap={2} 
              justifyContent='space-around' 
              maxHeight='54vh'
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
                                    value={question.optionA} 
                                    backgroundColor={selectedOptions[index].selectedOption == 'A' ?
                                                     question.correctOption =='A' ? 'lightgreen' : 'red.400' : ' ' }
                                                        
                                                      
                            />
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
                                    backgroundColor={selectedOptions[index].selectedOption == 'B' ?
                                                     question.correctOption =='B' ? 'lightgreen' : 'red.400' : ' ' }
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
                                    backgroundColor={selectedOptions[index].selectedOption == 'C' ?
                                                     question.correctOption =='C' ? 'lightgreen' : 'red.400' : ' ' }
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
                                    backgroundColor={selectedOptions[index].selectedOption == 'D' ?
                                                     question.correctOption =='D' ? 'lightgreen' : 'red.400' : ' ' } 
                            />
                        </Box>

                    </Box>

                    <Box display={"flex"} p={4} justifyContent='center' alignItems={'center'} >
                        <FormLabel pt={2} pr={2} htmlFor="correctOption">Correct Option </FormLabel>
                        <Input  isReadOnly
                                textAlign={'center'}
                                focusBorderColor='orange.700' 
                                variant={'outline'} 
                                borderColor='orange'
                                type="text" 
                                width="50px"
                                id="correctOption" 
                                name="correctOption"
                                value={question.correctOption} 
                            />


                    </Box>

                    <Divider p={2} variant='dashed' borderColor={'orange.900'} />
                </Flex>

                
            ))}


        </Flex>
      </Flex>

      {/* <Button mt={2} onClick={submitQuiz} mx={4} type='button'  colorScheme='orange' variant='solid' >
                          Submit 
      </Button>

      <Link to='/student/quizresult' state={{ from: "occupation" }}>
        
      </Link> */}

      {/* <Button mt={2} mx={4} onClick={Back} type='button'  colorScheme='orange' variant='solid' >
            Back 
      </Button> */}


    </Box>
  )
}

export default StudentQuizResult