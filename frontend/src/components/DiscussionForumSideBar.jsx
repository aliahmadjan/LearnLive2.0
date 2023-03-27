import React, { useEffect, useState } from 'react'
import {
    Button,
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
  
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings,
    FiSquare,
    FiInfo,
    FiPaperclip,
    FiFileText,
    FiUpload,
    FiUploadCloud,
    FiActivity,
    FiBookmark,
    FiAtSign,
    FiArchive
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import axios from "axios"
import LoginPage from '../pages/LoginPage'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate, useParams} from "react-router-dom";
import { db , db1}  from "./firebase.js"
import { collection,addDoc,getDocs,doc } from  "firebase/firestore";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { enterChannel } from '../features/appSlice'
import TeacherUploadAssignment from './TeacherUploadAssignment'
import { ref, push } from 'firebase/database';

const DiscussionForumSidebar = ({navSize, changeNavSize , id}) =>
{
    
           // To make links active on Sidebar
    const location = useLocation();
    const [showAll, setShowAll] = useState(true);
    const [showChannels , setShowChannels ] =useState(true);
    const route = location.pathname.split("/").pop();
    const [isLoggedin , setIsLoggedIn] = useState(false);
    const [ userID , setUserID] = useState("");
    const [name, setName] = useState("");
    const [ profileimg , setProfileImg] = useState(null);
    const navigate = useNavigate();

    const [showInput, setShowInput] = useState(false); // State variable to track whether input should be shown
    const [newChannelName, setNewChannelName] = useState(''); // State variable to hold the new channel name
  
    const [channelNames ,setChannelNames] = useState([])

    // const dispatch = useDispatch();

    function handleAddChannelClick() {
      setShowInput(true); // Show the input field
    }
  
    function handleNewChannelNameChange(event) {
      setNewChannelName(event.target.value); // Update the new channel name
    }
    function handleNewChannelSubmit(event) {
      event.preventDefault(); // Prevent form submission
    
      try {
        const message = document.getElementById("userInput").value;
        //const message = prompt("Enter your message:");
        console.log(message);
    
        const channelsRef = ref(db1, 'channels');
        push(channelsRef, { name: message });
        console.log("Channel added successfully!");
      } catch (error) {
        console.error(error);
      }
    
      // Do something with the new channel name, e.g. add it to a list of channels
      //console.log('New channel name:', newChannelName);
    
      setNewChannelName(''); // Reset the new channel name
      setShowInput(false); // Hide the input field
    }
    // function handleNewChannelSubmit(event) {
    //   event.preventDefault(); // Prevent form submission

    //   try {
    //     const message = document.getElementById("userInput").value
    //     //const message = prompt("Enter your message:");
    //     console.log(message);
      
    //     const data = {
    //       name: message,
    //     };
      
    //     addDoc(collection(db, "channels"), data);
    //     console.log("Channel added successfully!");
    //   } catch (error) {
    //     console.error(error);
    //   }
  
    //   // Do something with the new channel name, e.g. add it to a list of channels
    //   //console.log('New channel name:', newChannelName);
  
    //   setNewChannelName(''); // Reset the new channel name
    //   setShowInput(false); // Hide the input field
    // }
    

    async function getChannelNames() {
      try {
        const querySnapshot = await getDocs(collection(db, "channels"));
        const channelsData = querySnapshot.docs.map(doc => doc.data());
        setChannelNames(channelsData);
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      //console.log(channelNames);
      getChannelNames()
    }, [channelNames]);
    
    // const selectChannel = () =>
    // {
    //   if(id) {
    //       dispatch(enterChannel({

          
    //         roomId:id
    //       }))
    //   }
    // }
  const handleClick = () => {
    setShowAll(!showAll);
  }

  const handleClickChannels = () =>
  {
        setShowChannels(!showChannels)
  }

 

  const navItems = [
    { icon: 'fa-solid fa-user', title: 'All unreads', route: 'allunreads', description: 'All Unreads' },
    { icon: 'fa-solid fa-user', title: 'Threads', route: 'threads', description: 'Threads' },
    { icon: 'fa-solid fa-user', title: 'Mentions and Reactions', route: 'mandr', description: 'Mentions and Reactions' },
    { icon: 'fa-solid fa-user', title: 'Drafts', route: 'drafts', description: 'Drafts' },

  ];

  const channels = [
    { icon: 'fa-solid fa-user', title: 'Add Channel', description: "Add Channel", onClick: handleAddChannelClick },
    // { icon: 'fa-solid fa-user', title: 'New Channel', inputField: true },
    { icon: 'fa-solid fa-user', title: 'Announcements', route: 'announcements', description: "Announcements" },
    { icon: 'fa-solid fa-user', title: 'Classroom', route: 'classroom', description: "Classroom" },
  ];
  

    return (
        <Flex
            pos="sticky"
            w={navSize == "small" ? "4%" : "20%"}
            mx="14px"
            flexDir="column"     
            justifyContent="space-evenly"
            bgColor=
            "black"
            >

            <IconButton
                background="none"
                mt={4}        
                alignSelf='center'
                color='white'
                _hover={{background: 'gray.100',  color:'orange' }}
                icon={<FiMenu />}
                onClick={() => {
                    if (navSize == "small")
                        changeNavSize("large")
                    else
                        changeNavSize("small")
                }} />

            {/* <Divider variant='dashed' borderColor={'orange.500'} /> */}

            <Flex
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav">
                <div style={{  color: 'yellow', width: '200px', padding: '10px' }}>
               <button color="red" onClick={handleClick} style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', padding: '10px', width: '100%', textAlign: 'left' }}>
          {showAll ? 'Show Less' : 'Show More'}
        </button>
        </div>

       
        {navItems.slice(0, showAll ? navItems.length : 0).map((item, index) => (
    
        <NavItem
          key={index}
          navSize={navSize}
          icon={item.icon}
          title={item.title}
          active={route === item.route}
          route={item.route}
          description={item.description}
        />
      ))}
      <Divider variant='dashed' borderColor={'orange.500'} />
      <div style={{color: 'yellow', width: '200px', padding: '10px' }}>
  <button onClick={handleClickChannels} style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', padding: '10px', width: '100%', textAlign: 'left' }}>
    {showChannels ? 'Channels' : 'Channels'}
  </button>    
</div>
        
          {channels.slice(0, showChannels ? channels.length : 0).map((channel, index) => (
       <div style={{  color: '#fff', width: '200px', padding: '10px' }}>
    
         <Link key={index} to={channel.route} style={{ textDecoration: 'none', color: 'inherit' }}>
           <button onClick={channel.onClick} style={{  border: 'none', display: 'flex', alignItems: 'center', padding: '10px', width: '100%', textAlign: 'left' }}>         
             <p>{channel.description}</p>    
           </button>
         </Link>
  
     </div>
   
      

        ))}
        
      

{/* Show the input field if the "Add Channel" button has been clicked */}
<div style={{ color: '#fff', width: '200px', padding: '10px' }}>
  {showInput && (
    <form onSubmit={handleNewChannelSubmit}>
      <label style={{ textDecoration: 'none', color: 'inherit' }}>
        New channel name:
        <input type="text" id="userInput" value={newChannelName} onChange={handleNewChannelNameChange} 
        style={{ color: '#000' }}
        />
      </label>
      <button type="submit" style={{ textDecoration: 'none', color: 'inherit' , marginRight:'10px' }}>Add </button>
      <button type="button" onClick={() => setShowInput(false)}  style={{marginRight: '10px'}}>  Close</button>
    </form>
  )}
</div>

<div style={{ color: '#fff', width: '200px', padding: '10px' }}> 
  {/* Render a Link component for each channel */}
  {channelNames.slice(0, showChannels ? channelNames.length : 0).map((channel, index) => (
    <Link key={channel.id} to={`/teacher/discussionforum/${channel.name}`}>
      <h3 style={{ textDecoration: 'none', color: 'inherit' }}>{channel.name}</h3>
    </Link>
  ))}
</div>





  </Flex>

</Flex>

    );
}

export default DiscussionForumSidebar