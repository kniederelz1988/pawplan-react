import './App.css'

import { Center, HStack, Text } from '@chakra-ui/react'

import Navigation from './components/Navigation'
import Router from './components/Router'
import { useAuth } from './contexts/AuthContexts'

export default function App() {
  const { user } = useAuth()

  return (
    <>
      {
        user ?
            <HStack>
              <Navigation />
              <Router />
            </HStack>
          :
            <Center>
              <Text>No user....</Text>
            </Center>
      }
    </>
  )
}
