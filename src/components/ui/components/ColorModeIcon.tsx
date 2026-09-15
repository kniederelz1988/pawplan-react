import { LuMoon, LuSun } from "react-icons/lu"
import { useColorMode } from "../hooks/useColorMode"

export function ColorModeIcon() : React.ReactElement {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <LuMoon /> : <LuSun />
}
