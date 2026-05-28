import useAuthentification from "@hooks/useAuthentification"

import MainPage from "@components/pages/MainPage"
import UserAuthPage from "@components/pages/UserAuthPage"

export default function App() {
  const { user } = useAuthentification()

  return (
    <>
      { user ? <MainPage /> : <UserAuthPage /> }
    </>
  )
}
