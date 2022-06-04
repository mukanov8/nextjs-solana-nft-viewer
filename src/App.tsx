import { Box } from '@chakra-ui/react'
import React from 'react'
import ModeButton from './components/ModeButton'
import SearchPage from './pages/SearchPage'

const App = () => {
  return (
    <Box w="100vw" h="100vh">
      <ModeButton position="fixed" right="0" mr="24px" mt="24px" />
      <SearchPage />
    </Box>
  )
}

export default App
