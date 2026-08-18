import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { NavigationItemStyles } from './NavigationStyling';

type NavigationLinkProps = {
    children: React.ReactNode
    target: string
    disabled?: boolean
}

export default function NavigationLink({ 
    children, 
    target, 
    disabled = false
} : NavigationLinkProps)
{
    if (disabled) {
        return (
            <Link
                as="span"

                opacity={0.6}
                cursor={"disabled"}
                aria-disabled="true"

                {...NavigationItemStyles}
            >
                {children}                
            </Link>
        )
    }

    return (
        <Link asChild {...NavigationItemStyles}>
            <NavLink
                to={target}
                style={({isActive}) => ({
                    fontWeight: isActive ? "bold" : "inherit",
                    textDecoration: isActive ? "underline" : "none",
                })}
            >
                {children}
            </NavLink>
        </Link>
    )
}