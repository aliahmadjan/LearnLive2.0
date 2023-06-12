const moment = require('moment');
//const students = require('./students.json'); // Assuming student data is stored in a JSON file
const Student =require('../Models/student.model')

const calculateRetentionRate = async (req, res, next) => {
    try {
      const totalStudents = await Student.countDocuments();
      let retainedStudents = 0;
  
      const students = await Student.find();
  
      students.forEach((student) => {
        const frequency = student.frequency; // Replace 'frequency' with the actual property name in your student data
  
        if (frequency !== 1) {
          retainedStudents++;
        }
      });
  
      const retentionRate = ((retainedStudents / totalStudents) * 100).toFixed(2);
      res.status(200).json({ retentionRate });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
//   // Call the function and log the retention rate
//   calculateRetentionRate()
//     .then((retentionRate) => {
//       console.log(`Retention Rate: ${retentionRate}%`);
//     })
//     .catch((error) => {
//       console.error('Error calculating retention rate:', error);
//     });

const analyzeGenderRatio = async (req, res, next) => {
    try {
      const totalStudents = await Student.countDocuments();
      const maleStudents = await Student.countDocuments({ gender: 'male' });
      const femaleStudents = await Student.countDocuments({ gender: 'female' });
  
      const maleRatio = ((maleStudents / totalStudents) * 100).toFixed(2);
      const femaleRatio = ((femaleStudents / totalStudents) * 100).toFixed(2);
  
      res.status(200).json({ maleRatio, femaleRatio });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const analyzeDifferentlyAbledPercentage = async (req, res, next) => {
    try {
      const totalStudents = await Student.countDocuments();
      //console.log(totalStudents)
      const differentlyAbledStudents = await Student.countDocuments({ differently_abled: "Yes" });
      const notdifferentlyAbledStudents = await Student.countDocuments({ differently_abled : "No"});
      
      //console.log(notdifferentlyAbledStudents)
      const differentlyAbled = ((differentlyAbledStudents / totalStudents) * 100).toFixed(2);
      const notdifferentlyAbled = ((notdifferentlyAbledStudents / totalStudents) * 100).toFixed(2)
        

      res.status(200).json({ differentlyAbled , notdifferentlyAbled });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const calculateTotalGroupedHours = async (req, res, next) => {
    try {
      const students = await Student.find();
      let totalGroupedHours = 0;
  
      students.forEach((student) => {
        totalGroupedHours += student.grouped_hours;
      });
  
      res.status(200).json({ totalGroupedHours });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const calculateTotalOneToOneHours = async (req, res, next) => {
    try {
      const students = await Student.find();
      let totalOneToOneHours = 0;
  
      students.forEach((student) => {
        totalOneToOneHours += student.one_to_one;
      });
  
      res.status(200).json({ totalOneToOneHours });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


  const findCountryWithMostStudents = async (req, res, next) => {
    try {
        const students = await Student.find();
        const countryCounts = {};
    
        students.forEach((student) => {
          const country = student.country; // Replace 'country' with the actual property name in your student data
    
          if (country) {
            if (countryCounts[country]) {
                countryCounts[country]++;
            } else {
                countryCounts[country] = 1;
            }
          }
        });
    
        res.status(200).json(countryCounts);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

  const findCityWithMostStudents = async (req, res, next) => {
    try {
      const students = await Student.find();
      const cityCounts = {};
  
      students.forEach((student) => {
        const city = student.city; // Replace 'city' with the actual property name in your student data
  
        if (city) {
          if (cityCounts[city]) {
            cityCounts[city]++;
          } else {
            cityCounts[city] = 1;
          }
        }
      });
  
      res.status(200).json(cityCounts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  



exports.calculateRetentionRate = calculateRetentionRate;
exports.analyzeGenderRatio = analyzeGenderRatio;
exports.analyzeDifferentlyAbledPercentage = analyzeDifferentlyAbledPercentage;
exports.calculateTotalGroupedHours = calculateTotalGroupedHours;
exports.calculateTotalOneToOneHours = calculateTotalOneToOneHours;
exports.findCityWithMostStudents = findCityWithMostStudents;
exports.findCountryWithMostStudents = findCountryWithMostStudents;

