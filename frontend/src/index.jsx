import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme'
import './theme/style.css'
//using CHakra Ui
<script src="https://source.zoom.us/{VERSION_NUMBER}/lib/vendor/lodash.min.js"></script>

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider theme={theme}>
       
    <App />
 
    </ChakraProvider>
)
