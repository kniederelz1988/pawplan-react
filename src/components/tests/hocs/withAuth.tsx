import React, { ReactNode } from "react";
import { Link, Text } from "@chakra-ui/react";

type AuthProps = { 
    isAuthenticated: boolean
}

export default function withAuth<P extends React.JSX.IntrinsicAttributes>(Component : React.ComponentType) {
    function f({ isAuthenticated, ...props } : AuthProps & P ) : ReactNode {
        if (!isAuthenticated) {
            return <>
                <Text color="red">
                    User not logged in... <Link target="/login" color="red">please login</Link>
                </Text>
            </>
        }

        return <Component {...props} />
    }

    return f
}