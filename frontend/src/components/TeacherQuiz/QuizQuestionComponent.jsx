import { useState } from "react"
import { Box, FormControl, FormLabel, Input, Select, Textarea, Heading, Flex, Divider} from "@chakra-ui/react";
import axios from "axios"


function QuizQuestionComponent(props){

    
    return (

        <Flex flexDirection={'column'} width='90%' mx='auto'>
                
                <FormControl>
                    <FormLabel textAlign={'center'} htmlFor="questionLine" p={2} color='orange.900'>Enter Question: {props.id}</FormLabel>
                    <Textarea name="questionLine" 
                            id='questionLine'
                            value={props.questionLine}
                            onChange={props.onChange}
                            isRequired 
                            focusBorderColor='#F57C00' 
                            variant={'outline'} 
                            borderColor='#F57C00' 
                            ml={4} 
                            marginBottom={4} 
                            height={24} 
                            key={props.id}
                            resize='none' />
                </FormControl>
                

                <Box display="grid" width={'90%'} gridTemplateColumns="1fr 1fr" gap={3} mx='auto'>

                    <Box display={"flex"} p={1}>
                        <FormControl>
                            <FormLabel margin={"auto"} pr={2} htmlFor="optionA">a: </FormLabel>
                            <Input  isRequired
                                    value={props.optionA} 
                                    onChange={props.onChange}
                                    focusBorderColor='#F57C00' 
                                    variant={'outline'} 
                                    borderColor='#F57C00'  
                                    placeholder="Option A" 
                                    type="text"
                                    id="optionA" 
                                    name="optionA" 
                            />
                        </FormControl>
                    </Box>

                        <Box display={"flex"} p={1}>
                            <FormControl>
                                <FormLabel margin={"auto"} pr={2} htmlFor="optionB">b: </FormLabel>
                                <Input  value={props.optionB} 
                                        onChange={props.onChange}
                                        focusBorderColor='#F57C00' 
                                        variant={'outline'} 
                                        borderColor='#F57C00'
                                        placeholder="Option B" 
                                        type="text" 
                                        id="optionB" 
                                        name="optionB"            
                                />
                            </FormControl>
                        </Box>

                        <Box display={"flex"} p={1}>
                            <FormControl>
                                <FormLabel margin={"auto"} pr={2} htmlFor="optionC">c: </FormLabel>
                                <Input  value={props.optionC} 
                                        onChange={props.onChange}
                                        focusBorderColor='#F57C00' 
                                        variant={'outline'} 
                                        borderColor='#F57C00' 
                                        placeholder="Option C" 
                                        type="text" 
                                        id="optionC" 
                                        name="optionC"
                                />
                            </FormControl>     
                        </Box>

                        <Box display={"flex"} p={1}>
                            <FormControl>
                                <FormLabel margin={"auto"} pr={2} htmlFor="optionD">d: </FormLabel>
                                <Input  value={props.optionD} 
                                        onChange={props.onChange}
                                        focusBorderColor='#F57C00' 
                                        variant={'outline'} 
                                        borderColor='#F57C00'
                                        placeholder="Option D" 
                                        type="text" 
                                        id="optionD" 
                                        name="optionD"  
                                />
                            </FormControl>
                            
                        </Box>

                    </Box>

                    <Box display={"flex"} width='100%' p={4} justifyContent='center' alignItems={'center'} >
                        <FormControl display={'flex'} flexDirection={'row'} alignItems='center' justifyContent={'center'}>
                            <FormLabel pr={2} htmlFor="correctOption">Correct Option </FormLabel>
                            <Select isRequired
                                    value={props.correctOption}
                                    onChange={props.onChange}
                                    focusBorderColor='#F57C00' 
                                    variant={'outline'} 
                                    borderColor='#F57C00'
                                    width="20%"
                                    id="correctOption"
                                    name="correctOption"                          
                            >
                                <option value="" disabled>Select</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </Select>
                        </FormControl>
                    </Box>

                    <Divider p={2} variant='dashed' borderColor={'orange.900'} />
                </Flex>

    )
}

export default QuizQuestionComponent