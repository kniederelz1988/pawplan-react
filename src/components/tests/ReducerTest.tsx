import { Button, Text } from "@chakra-ui/react"
import { useReducer } from "react"

const EventCounterReducter = (state: any, action: any) => {
  switch  (action.type) {
    case "increment":
      return { count: state.count + 5 }
    case "decrement":
      return { count: state.count - 5 }
    case "reset":
      return { count: 0}
  }

  throw new Error("Unknown action:" + action)
}

export default function ReducedCounter() {
  const [state, dispatch] = useReducer(EventCounterReducter, { count: 0 })

  return (
    <>
      <Text>{state.count}</Text>

      <Button onClick={() => dispatch({ type: "increment" })}>+5</Button>
      <Button onClick={() => dispatch({ type: "decrement" })}>-5</Button>
      <Button onClick={() => dispatch({ type: "reset"})}>Reset</Button>
    </>
  )
}
