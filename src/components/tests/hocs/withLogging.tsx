import { ReactNode } from "react"

export default function withLogging<P extends React.JSX.IntrinsicAttributes>(Component : React.ComponentType) {
    function f({ ...props } : P): ReactNode {
        console.log("Rendered with ", {...props})
        return <Component {...props} />
    }

    return f
}