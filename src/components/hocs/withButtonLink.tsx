import React from "react"

import { Button } from "@chakra-ui/react";

type Props = {
    children: React.ReactNode | React.ReactNode[]
    disabled?: boolean
    onClick?: () => void
}
type CompontentProps = {
    children: React.ReactNode | React.ReactNode[]
    active: boolean
    disabled?: boolean
    onClick?: () => void
}

export default function withButtonLink(Component : React.ComponentType<CompontentProps>) {
    return ({ children, disabled, onClick } : Props) => {
        if (disabled) {
            return (
                <Component active={false} disabled={true}>
                    {children}
                </Component>
            )
        }

        return (
            <Button asChild>
                <Component active={false} disabled={false} onClick={onClick}>
                    {children}
                </Component>
            </Button>
        )
    }
}