import { useColorMode } from "./useColorMode"

export function useColorModeValue<T>(light: T, dark: T) : T {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}
