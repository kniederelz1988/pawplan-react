import { useImmerReducer } from "use-immer"

type StateData  = {
    name: {
        first: string;
        last: string;
    };
    age: number;
    address: {
        street: string;
        number: string;
        postalCode: string;
        city: string;
    };
}
type ActionData = { type: "setFirstName"; firstName: string }
    | { type: "setLastName"; lastName: string }
    | { type: "setAge"; age: number }
    | { type: "setStreet"; street: string }
    | { type: "setStreetNumber"; streetNumber: string }
    | { type: "setPostalCode"; postalCode: string }
    | { type: "setCity"; city: string };

const initialState = {
    name: { 
        first: "",
        last: ""
    }, 
    age: 0, 
    address: { 
        street: "", 
        number: "", 
        postalCode: "", 
        city: ""
    }
}

const eventUserReducer = (draft: StateData, action: ActionData) => {
    switch(action.type) {
        case "setFirstName":
            draft.name.first = action.firstName
            break
        case "setLastName":
            draft.name.last = action.lastName
            break
        case "setAge":
            draft.age = Math.max(action.age, 18)
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
    }
}

export const EventUserForm = () => {
    const [state, dispatch] = useImmerReducer<StateData, ActionData>(eventUserReducer, initialState)

    const updateFirstName   = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ 
            type: "setFirstName",
            firstName: e.target.value 
        })
    }

    const updateLastName    = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ 
            type: "setLastName", 
            lastName: e.target.value
        })
    }

    const updateAge         = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ 
            type: "setAge", 
            age: parseInt(e.target.value)
        })
    }

    const updateStreet      = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ 
            type: "setStreet", 
            street: e.target.value 
        })
    }
    const updateStreetNumber= (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ 
            type: "setStreetNumber", 
            streetNumber: e.target.value 
        })
    }

    const updatePostalCode  = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ 
            type: "setPostalCode", 
            postalCode: e.target.value 
        })
    }

    const updateCity        = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "setCity", 
            city: e.target.value 
        })
    }

    const handleSubmit      = (e: React.MouseEvent) => {
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