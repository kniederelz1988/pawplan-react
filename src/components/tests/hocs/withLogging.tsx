export default function withLogging<P extends React.JSX.IntrinsicAttributes>(Component : React.ComponentType) {
    return ({ ...props } : P) => {
        console.log("Rendered with ", {...props})
        return <Component {...props} />
    }
}