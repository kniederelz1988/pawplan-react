import { Button, Text } from "@chakra-ui/react"
import { useReducer } from "react"

type StateData = {
  count: number
}
type ActionData = {
  type: "increment" | "decrement" | "reset"
}

const EventCounterReducter = (state: StateData, action: ActionData) => {
  switch  (action.type) {
    case "increment":
      return { count: state.count + 5 }
    case "decrement":
      return { count: state.count - 5 }
    case "reset":
      return { count: 0}
  }
}

export default function ReducedCounter() {
  const [state, dispatch] = useReducer<StateData, [ActionData]>(EventCounterReducter, { count: 0 })

  return (
    <>
      <Text>{state.count}</Text>

      <Button onClick={() => dispatch({ type: "increment" })}>+5</Button>
      <Button onClick={() => dispatch({ type: "decrement" })}>-5</Button>
      <Button onClick={() => dispatch({ type: "reset"})}>Reset</Button>
    </>
  )
}
