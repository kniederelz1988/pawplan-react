import "./App.css"

import { useAuth } from "./contexts/AuthContexts"

import MainPage from "./components/pages/MainPage"
import UserAuthPage from "./components/pages/UserAuthPage"

export default function App() {
  const { user } = useAuth()

  return (
    <>
      { user ? <MainPage /> : <UserAuthPage /> }
    </>
  )
}
