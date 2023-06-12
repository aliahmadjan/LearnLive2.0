import React , { useState, useEffect, useRef} from "react";
//import { Chart, CategoryScale, LinearScale, PointElement, ArcElement, Legend } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import {Text,Box} from '@chakra-ui/react'
import { Bar,Pie } from 'react-chartjs-2';
import 'chart.js/auto';

import { PieChart } from 'react-minimal-pie-chart';
import { Chart } from "react-google-charts";

import axios from 'axios'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


  
const Analytics = () =>
{
    const [retentionRate , setRetentionRate] = useState()
    const [unretentionRate , setUnRetentionRate] = useState()

    const [maleRatio , setMaleRatio] = useState()
    const [femaleRatio , setFemaleRatio] = useState()

    const [differentlyAbled, setDifferentlyAbled] = useState()
    const [notdifferentlyAbled , setNotDifferentlyAbled] = useState()

    const [groupedHours , setGroupedHours] = useState()
    
    const [onetoone , setOnetoOne] = useState()
    
    const [cities , setCities]  = useState()
    const[cities_count , setCitiesCount] = useState()

    const [countries , setCountries] = useState()
    const[countries_count , setCountriesCount] = useState()

    const chartRef = useRef(null);

    const getAnalyticalData = () =>
    {
        axios.get('http://localhost:5000/analytics/getretenrate').then(res =>
        {
                //console.log(res.data)
                 setRetentionRate(res.data.retentionRate)
                 //console.log(retentionRate)
                 setUnRetentionRate(100-retentionRate)
                 //console.log(unretentionRate)
                
        }).catch(err =>
            {
                console.log(err)
            })
        axios.get('http://localhost:5000/analytics/getgenderatio').then(res =>
            {
                    //console.log(res.data)
                    setMaleRatio(res.data.maleRatio)
                    //console.log(maleRatio)
                    setFemaleRatio(res.data.femaleRatio)
                    //console.log(femaleRatio)

        }).catch(err =>
            {
                    console.log(err)
            }) 
        axios.get('http://localhost:5000/analytics/getdiffabled').then(res =>
            {
                    console.log(res.data)
                    setDifferentlyAbled(res.data.differentlyAbled)
                    setNotDifferentlyAbled(res.data.notdifferentlyAbled)
        }).catch(err =>
            {
                    console.log(err)
            })
        axios.get('http://localhost:5000/analytics/getgroupedhours').then(res =>
            {
                        console.log(res.data)
                        
        }).catch(err =>
            {
                        console.log(err)
            })
                    
        axios.get('http://localhost:5000/analytics/getonetoone').then(res =>
                {
                        console.log(res.data)
        }).catch(err =>
                {
                        console.log(err)
                })

                axios.get('http://localhost:5000/analytics/getcity').then(res => {
                    const cityData = res.data;
                    const labels = Object.keys(cityData);
                    const data = Object.values(cityData);
                  
                    setCities(labels);
                    setCitiesCount(data);
                  
                    // console.log(labels);
                    // console.log(data);
                        
        }).catch(err =>
                {
                        console.log(err)
        })

        axios.get('http://localhost:5000/analytics/getcountry').then(res =>
                {
                        //console.log(res.data)
                        const countryData = res.data;
                        const labels = Object.keys(countryData);
                        const data = Object.values(countryData);
                      
                        setCountries(labels);
                        setCountriesCount(data);
                      
                         //console.log(labels);
                        //console.log(data);
        }).catch(err =>
                {
                        console.log(err)
        })
    }

    useEffect(()=>
    {
        getAnalyticalData()
    },[])

   
    const options = {
        responsive: true,
        maintainAspectRatio: false
      };
       
       
    // Data for Cities
        const data = {
            labels: cities,
            datasets: [
              {
                label: 'Count',
                data: cities_count,
                backgroundColor: ['Black']
              }
            ]
          };


         // Data for Countries 
         const data1 = {
            labels: countries,
            datasets: [
              {
                label: 'Count',
                data: countries_count,
                backgroundColor: ['Black']
              }
            ]
          };

          // Data for Retention Rate
          const data2 = {
            labels: ['Retention Rate' , 'UnRetention Rate'],
            datasets: [
              {
                data: [retentionRate , unretentionRate],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                   
                  ],
                  borderWidth: 1,
              }
            ]
          };

          // Data for Male:Female Ratio
          
          const data3 = {
            labels: ['Male' , 'Female'],
            datasets: [
              {
                data: [maleRatio , femaleRatio],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                   
                  ],
                  borderWidth: 1,
              }
            ]
          };
          
          
         // Data for Differently Abled 
         const data4 = {
            labels: ['Differently Abled' , 'Not Differently Abled'],
            datasets: [
              {
                data: [differentlyAbled , notdifferentlyAbled],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                   
                  ],
                  borderWidth: 1,
              }
              
            ]
          };

          
          return (
            
            <>
             {/* Retention Rate */}
                  <Box
                      position="fixed"
                      bottom={10}
                      left={230}
                      width={300}
                      height={200}
                      
                      borderRadius="md"
                      boxShadow="md"
                  >
                    
                      <Pie data={data2} options={options} />
                  </Box>

                   {/* Male:Female */}
                   <Box
                      position="fixed"
                      bottom={300}
                      right={390}
                      width={300}
                      height={200}
                      
                      borderRadius="md"
                      boxShadow="md"
                  >
                    
                      <Pie data={data3} options={options} />
                  </Box>

                   {/* For Differently Abled */}
                   <Box
                      position="fixed"
                      bottom={500}
                      right={390}
                      width={300}
                      height={200}
                    //   backgroundColor="white"
                      borderRadius="md"
                      boxShadow="md"
                  >
                      {/* <Text color="black" fontSize="md" fontWeight="bold" mb={2}>
                          Differently Abled Students
                      </Text> */}
                      <Bar data={data4} options={options} />
                  </Box>

                 



                 {/* For Cities */}
                  <Box
                      position="fixed"
                      bottom={10}
                      right={6}
                      width={300}
                      height={200}
                    //   backgroundColor="white"
                      borderRadius="md"
                      boxShadow="md"
                  >
                      <Text color="black" fontSize="md" fontWeight="bold" mb={2}>
                          Most Students Belonging from a City
                      </Text>
                      <Bar data={data} options={options} />
                  </Box>
                
                {/* For Countries */}
                  <Box
                      position="fixed"
                      bottom={80}
                      right={20}
                      width={300}
                      height={200}
                    //   backgroundColor="white"
                      borderRadius="md"
                      boxShadow="md"
                  >
                      <Text color="black" fontSize="md" fontWeight="bold" mb={2}>
                          Most Students Belonging from a Country
                      </Text>
                      <Bar data={data1} options={options} />
                  </Box>
                  
                  </>
            
            );
       
};

export default Analytics;