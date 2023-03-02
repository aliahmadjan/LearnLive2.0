import { Grid, Box,Button, Input, Text, Heading, Flex, FormControl, FormLabel} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";


const StudentSingleViewAssignment=()=>
 {
    const [campname , setCampName] = useState("");
    const [title , setTitle] = useState("");
    const [description , setDescription]= useState("");
    const [tmarks , setTMarks] = useState("");
    const [duedate , setDate] = useState("");
    const[uplassign, setUplAssign] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    const [selectedFiles, setSelectedFiles] = useState([null]);
  const [selected , setSelected] = useState([null])
  var imgURLsArray = []
  const onSelectFile = (e) => {
    const selectedImages = [...e.target.files];
    selectedImages.map(img=> imgURLsArray.push(URL.createObjectURL(img)))
     setSelected(imgURLsArray)
     setSelectedFiles(e.target.files)
  
  };

    const getSingleUser = () =>
    {
      axios
        .get('https://learnlive.onrender.com/tchassignments/singletchassign/:',{params : {id: localStorage.getItem('assignment_viewid')}})
        .then((res) => {
          setCampName(res.data.campname);
          setTitle(res.data.title);
          
          setDescription(res.data.description);
          setTMarks(res.data.tmarks);
          setDate(res.data.duedate);
          setUplAssign(res.data.uplassign);
          

         
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const SubmitAssignment = (e) => {
        e.preventDefault();
    
        axios
        .get('https://learnlive.onrender.com/tchassignments/singletchassign/:',{params : {id: localStorage.getItem('assignment_viewid')}})
        .then((res) => {
          setCampName(res.data.campname);
          setTitle(res.data.title);
          
          setDescription(res.data.description);
          setTMarks(res.data.tmarks);
          setDate(res.data.duedate);
          setUplAssign(res.data.uplassign);
        })
        .catch((err) => {
          console.log(err);
        });

        const formData = new FormData();
        formData.append('campname',campname);
        formData.append('title',title);
        formData.append('description',description)
        formData.append('tmarks',tmarks);
        formData.append('duedate',duedate)
        formData.append('quizid',`${localStorage.getItem('assignment_viewid')}`)
           for (let i = 0; i < selectedFiles.length; i++) {
            formData.append(`uplassign`,selectedFiles[i]);
           }
    
    
        fetch('https://learnlive.onrender.com/stdassignments/submitassigns', {
          method: 'POST',
          
          body: formData,
         // campname:campname,
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
     
    
       
      };

    useEffect(()=>
    {
        getSingleUser();
    },[uplassign])

    const Back = ()=>
    {
      navigate("/student/assignments");
    }

  return (

        <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
          <Box pt={4} pb={2} mt={4} >
            <Heading mb={2} >
              Assignment Details
            </Heading>
          </Box>

          <Flex maxW='2xl' mx="auto" justifyContent={'center'} gap={4} p={1} > 
                  <Text>
                    Camp: <Text color={'orange.800'} display={'inline'}> {campname} </Text> 
                  </Text> 
                  <Text>
                    Marks : <Text color={'orange.800'} display={'inline'}> {tmarks} </Text> 
                  </Text>
                  <Text>
                    Due Date : <Text color={'orange.800'} display={'inline'}> {duedate} </Text> 
                  </Text>
          </Flex>

          <Flex maxW='2xl' mx="auto" justifyContent={'center'} pb={2} > 
                  <Text>
                    Description: <Text color={'orange.800'} display={'inline'}> {description} </Text> 
                  </Text> 
          </Flex>

          <Flex wrap="wrap" 
                overflowY="scroll"
                width='80%'
                mx='auto' 
                height="sm" 
                border='1px solid orange'
                borderRadius='10px'
                gap={4} 
                justifyContent={'space-around'} 
                p={4}
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
                
                  {uplassign.map((assign,index) => (
    
                      <iframe
                          src={uplassign[index]}
                          style={{
                            height: "90%",
                            padding: '10px',
                            width: "100%",
                            border: '1px dashed orange',
                            class: "center",
                            mx: 'auto',
                            borderRadius: "10px",
                          }}
                        />

                  ))} 
        
          </Flex>

                  
          <form onSubmit={SubmitAssignment}>

            <FormControl display='flex' maxW='2xl' mx="auto"  alignItems='center' my={4}>
              <FormLabel fontWeight="bold" color="orange.500" mr={2}>Submission Files</FormLabel>
              <Input
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange'
                type="file"
                multiple
                accept="application/pdf , image/png "
                onChange={onSelectFile}
                name="uplassign"
                isRequired
                width={'50%'} 
                mr={0} ml='auto'
                />

            </FormControl>

              {/* Users Files Preview */}
              {/* {
              selected.map((file, index) => {
                return (
                  <iframe
                    src={file}
                    style={{
                      height: "200px",
                      width: "400px",
                      class: "center",
                      borderRadous: "50%",
                    }}
                  />
                );
              })} */}
            
            <Button mx={4} type='submit' colorScheme='orange' variant='solid'>
                Submit
            </Button>

            <Button mx={4} onClick={Back} type='button' colorScheme='orange' variant='outline'>
                Back
            </Button>
          
          </form>

      </Box>
  );
}

export default StudentSingleViewAssignment;