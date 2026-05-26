import './App.css'

import { Container, Flex, Heading, Text } from '@chakra-ui/react'
import { FaPaw } from 'react-icons/fa'

export default function App() {
  return (
    <Container m="8">
      <Flex justifyContent="center" color="white">
        <FaPaw size={32} />
        <Heading pl="4">
          &nbsp;Paw Plan 
        </Heading>
      </Flex>
      
      <Text pt="2">
        App für Tierheime - zur Vereinbarung von Dates mit Hunden (mit Admin Sektion)
      </Text>
    </Container>
  )
}
