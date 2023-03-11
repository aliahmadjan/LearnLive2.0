import { Grid, Image,Img,Box,Button, Heading,Input, Text,Flex,Badge, useColorModeValue,FormControl, FormLabel, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useRef } from "react";
import html2canvas from "html2canvas";


const ViewCertificate = () =>
{
    const [certDetails , setCertDetails ] = useState([])
    const [student_name , setStudentName ] = useState("");
    const [ campname , setCampName] = useState([]);
    const [startdate , setStartDate] = useState ([]);
    const [enddate , setEndDate ] = useState([]);
    const [issued_date , setIssuedDate] = useState("");

    const componentRef = useRef(null);

    const handleDownload = () => {

            // hide the download button before generating the image
            const downloadButton = document.getElementById("download-button");
            downloadButton.style.display = "none";
        
            html2canvas(componentRef.current).then((canvas) => {
              const link = document.createElement("a");
              link.download = "certificate.png";
              link.href = canvas.toDataURL("image/png");
              link.click();
        
              // show the download button again
              downloadButton.style.display = "block";
            });
    };

    const getCertificateDetails = () =>
    {
    axios.get("http://localhost:5000/certificate/getcert")
    .then((res)=>
    {   console.log(res.data)
        setCertDetails(res.data)
        setStudentName(res.data.student_name);
        setCampName(res.data.campname)
        setStartDate(res.data.startdate);
        setEndDate(res.data.enddate);
    })    
    }

    useEffect(()=>
    {
        getCertificateDetails();
    },[])

  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box pt={0} px={5} mx='auto' textAlign={'center'} width='100%' ref={componentRef} backgroundColor='gray.100' 
    borderRadius={30} flexDirection='row' overflowX='hidden' paddingX={5}>
  {certDetails.map((cert) => (
    <Box mx="auto" fontSize="2xl" mb={10}>

      {/* Logos */}
      <Flex alignItems="center" justifyContent="space-between">
  <Image width="340px" src="/LearnLiveLogo.png" />
  {/* <Heading as="h2" textAlign="center" mb={10} color="orange" fontSize="2xl">Certificate of Completion</Heading> */}
  <Image src="/weepro-removebg-preview.png" alt="Logo" width="120px"  />
</Flex>



      
     
      {/* Student Name */}
      <Heading as="h1" fontSize="5xl" textAlign="center" mb={10}>
        Congratulations, 
      </Heading>

      <Text align='center'>{cert.student_name}</Text>

      <Box bg="black" height="3px" mb={10}>
      
      </Box>

      {/* Camp Names */}
      <Box mb={8}>
        <Text textAlign="center" mb={2}>
          This certificate is awarded to {cert.student_name} for successfully completing the camp(s):
        </Text>
        {cert.campname.map((camp, index) => (
          <Text key={index} textAlign="center" fontWeight="bold" mt={2}>
             {camp}
          </Text>
        ))}
      </Box>

      {/* Dates */}
      <Flex align="center" justify="center" mb={8}>
        <Text fontWeight="bold" mr={4}>From:</Text>
        <Text>{cert.startdate[0]}</Text>
        <Text fontWeight="bold" mx={4}>To:</Text>
        <Text>{cert.enddate[cert.enddate.length - 1]}</Text>
      </Flex>

      {/* Issued Date and Supervisor Signature */}
      <Flex align="center" justify="space-between" mb={8}>
  
  <Flex direction="column" align="flex-start">
  <Text fontSize="lg" >{cert.issued_date}</Text>
    <Text fontWeight="bold" fontSize="lg">Issued Date</Text>
  </Flex>

  <Flex align='center'>
  <Button id="download-button" onClick={handleDownload} colorScheme="orange" style={{ display: "block", margin: "0 auto" }}>
        Download Certificate
      </Button>
  </Flex>
  <Flex direction="column" align="flex-start">
  <Image src="/AppLogo.png" alt="Supervisor Signature" width="20px" />
    <Text fontWeight="bold" fontSize="lg">Signature</Text>
          {/* Download Button */}
      
        </Flex>
      </Flex>


      

    

    </Box>
  ))}

</Box>

  );
}



export default ViewCertificate;