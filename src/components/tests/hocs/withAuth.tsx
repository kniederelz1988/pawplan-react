import React from "react";
import { Link, Text } from "@chakra-ui/react";

type AuthProps = { 
    isAuthenticated: boolean
}

export default function withAuth<P extends React.JSX.IntrinsicAttributes>(Component : React.ComponentType) {
    return ({ isAuthenticated, ...props } : AuthProps & P ) => {
        if (!isAuthenticated) {
            return <>
                <Text color="red">
                    User not logged in... <Link target="/login" color="red">please login</Link>
                </Text>
            </>
        }

        return <Component {...props} />
    }
}