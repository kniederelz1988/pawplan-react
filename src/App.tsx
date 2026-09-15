import { Container, Link } from "@chakra-ui/react"
import Sidebar from "@components/navigation/Sidebar"
import Router from "@components/Router"
import { Toaster } from "@components/ui/components/Toaster"

export default function App() {

  return (
    <>
      <Container as="nav" role="navigation" aria-label="Main navigation" w="max-content">      
        <Link
            href="#main-content"
            position="absolute"
            left="-9999px"
            _focus={{
                left: "1rem",
                top: "1rem",
                zIndex: 1000,
            }}
        >
            Skip to main content
        </Link>
        
        <Sidebar />
      </Container>

      <Container 
          as="main"
          role="main"
          id="main-content" 
          flex="1"
          overflowY="auto"
          pt={6} 
          pb={24}
          pl={{ base: 6, md: 0 }}
          pr={{ base: 0, md: 0 }}
      >
          <Router />
      </Container>

      <Toaster />
    </>
  )
}
