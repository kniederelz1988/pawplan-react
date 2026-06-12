import React from "react"
import { NavLink as ReactRouterLink } from 'react-router-dom';

type Props = {
    children: React.ReactNode | React.ReactNode[]
    target: string
    disabled?: boolean
}
type CompontentProps = {
    children: React.ReactNode | React.ReactNode[]
    active: boolean
}

export default function withRouterLink(Component : React.ComponentType<CompontentProps>) {
    return ({ children, disabled, target } : Props) => {
        if (disabled) {
            return (
                <Component active={false}>
                    {children}
                </Component>
            )
        }

        return (
            <ReactRouterLink to={target}>
                {({isActive}) => (
                    <Component active={isActive}>
                        {children}
                    </Component>
                )}
            </ReactRouterLink>
        )
    }
}