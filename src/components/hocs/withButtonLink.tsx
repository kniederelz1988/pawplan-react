import React from "react"

import { Button } from "@chakra-ui/react";

type Props = {
    children: React.ReactNode | React.ReactNode[]
    disabled?: boolean,
    onClick?: () => void
}
type CompontentProps = {
    children: React.ReactNode | React.ReactNode[]
    active: boolean,
    onClick?: () => void
}

export default function withButtonLink(Component : React.ComponentType<CompontentProps>) {
    return ({ children, disabled, onClick } : Props) => {
        if (disabled) {
            return (
                <Component active={false}>
                    {children}
                </Component>
            )
        }

        return (
            <Button asChild>
                <Component active={false} onClick={onClick}>
                    {children}
                </Component>
            </Button>
        )
    }
}