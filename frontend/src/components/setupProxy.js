// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCosGzHPfLH2wZ5EI9tk7MyNS8QWK7NZk",
  authDomain: "learnlive-fb183.firebaseapp.com",
  projectId: "learnlive-fb183",
  storageBucket: "learnlive-fb183.appspot.com",
  messagingSenderId: "90715230846",
  appId: "1:90715230846:web:d1927b2555602e5acefe2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

{/* 
    {notifications.map((notification) => (
  <Box
    key={notification._id}
    bg={selectedItem === notification._id ? 'blue.50' : 'red.50'}
    py={2}
    px={4}
    borderRadius={4}
    mb={2}
    _hover={{ bg: 'gray.100', cursor: 'pointer' }}
    onClick={() => {
      if (latestAssignment.some((item) => item._id === notification._id)) {
        handleNotificationAView(notification._id);
      } else if (quizzes.some((item) => item._id === notification._id)) {
        handleNotificationQView(notification._id);
      }
      setSelectedItem(notification._id);
    }}
  >
    <Flex align="center">
      <Avatar size="md" name={notification.campname} src={notification.image} />
      <Box ml={2} flex="1">
        <Text fontSize="md">
          <b>{notification.title}</b> {notification.campname}
        </Text>
        <Text fontSize="md" color="gray.500">
          {notification.uploadeddate}
        </Text>
      </Box>
    </Flex>
  </Box>
))} */}
    {/* {[...latestAssignment].reverse().map((notification) => (
      <Box
        key={notification._id}
        bg={selectedItem === notification._id ? 'blue.50' : 'red.50'}
        py={2}
        px={4}
        borderRadius={4}
        mb={2}
        _hover={{ bg: 'gray.100', cursor: 'pointer' }}
        onClick={() => {
          handleNotificationAView(notification._id);
          setSelectedItem(notification._id);
        }}
      >
       <Flex align="center">
              <Avatar size="md" name={notification.campname} src={notification.image} />
              <Box ml={2} flex="1">
                <Text fontSize="md">
                  <b>{notification.title}</b> {notification.campname}
                </Text>
                <Text fontSize="md" color="gray.500">
                  {notification.date}
                </Text>
              </Box>
            </Flex>
        
      </Box>
    ))}
    {[...quizzes].reverse().map((quiz) => (
      <Box
        key={quiz._id}
        bg={selectedItem === quiz._id ? 'blue.50' : 'red.50'}
        py={2}
        px={4}
        borderRadius={4}
        mb={2}
        _hover={{ bg: 'gray.100', cursor: 'pointer' }}
        onClick={() => {
          handleNotificationQView(quiz._id);
          //setSelectedItem(quiz._id);
        }}
      >
        
        <Flex align="center">
              <Avatar size="md" name={quiz.campname} src={quiz.image} />
              <Box ml={2} flex="1">
                <Text fontSize="md">
                  <b>{quiz.quizno}</b> {quiz.campname}
                </Text>
                <Text fontSize="md" color="gray.500">
                  {quiz.date}
                </Text>
              </Box>
            </Flex>

      </Box>
    ))} */}