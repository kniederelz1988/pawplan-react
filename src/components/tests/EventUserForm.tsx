import { useImmerReducer } from "use-immer"

const initialState = { name: { first: "", last: "" }, age: null, address: { street: "", number: "", postalCode: "", city: "" } }

const eventUserReducer = (draft: any, action: any) => {
    switch(action.type) {
        case "setFirstName":
            draft.name.first = action.firstName
            break
        case "setLastName":
            draft.name.last = action.lastName
            break
        case "setAge":
            const newAge = Math.max(action.age, 18)
            draft.age = newAge
            break
        case "setStreet":
            draft.address.street = action.street
            break
        case "setStreetNumber":
            draft.address.number = action.streetNumber
            break
        case "setPostalCode":
            draft.address.postalCode = action.postalCode
            break
        case "setCity":
            draft.address.city = action.city
            break;
        default:
            return new Error("Unexpected action:" + action)
    }
}

export const EventUserForm = () => {
    const [state, dispatch] = useImmerReducer<any, any>(eventUserReducer, initialState)

    const updateFirstName = (e: any) => {
        dispatch({ type: "setFirstName", firstName: e.currentTarget.value })
    }

    const updateLastName = (e: any) => {
        dispatch({ type: "setLastName", lastName: e.currentTarget.value })
    }

    const updateAge = (e: any) => {
        dispatch({ type: "setAge", age: e.currentTarget.value })
    }

    const updateStreet = (e: any) => {
        dispatch({ type: "setStreet", street: e.currentTarget.value })
    }
    const updateStreetNumber = (e: any) => {
        dispatch({ type: "setStreetNumber", streetNumber: e.currentTarget.value })
    }

    const updatePostalCode = (e: any) => {
        dispatch({ type: "setPostalCode", postalCode: e.currentTarget.value })
    }

    const updateCity = (e: any) => {
        dispatch({ type: "setCity", city: e.currentTarget.value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const output = `${state.name.first} ${state.name.last} (${state.age})`
        alert(output)

        const address = `${state.address.street} ${state.address.number} ${state.address.postalCode} ${state.address.city}`
        alert(address)
    }

    return (
        <form className="border">
            <h2>Event User Form</h2>
            <input placeholder="First" value={state.name.first} onChange={updateFirstName} />
            <input placeholder="Last" value={state.name.last} onChange={updateLastName} />
            <input type="number" placeholder="Age" value={state.age} onChange={updateAge} />
            <input placeholder="Street" value={state.address.street} onChange={updateStreet} />
            <input placeholder="0" value={state.address.number} onChange={updateStreetNumber} />
            <input placeholder="12345" value={state.address.postalCode} onChange={updatePostalCode} />
            <input placeholder="City" value={state.address.city} onChange={updateCity} />

            <button onClick={handleSubmit}>Send</button>
        </form>
    )
}