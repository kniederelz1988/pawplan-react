import { Link } from '@chakra-ui/react';
import { NavLink as ReactRouterLink } from 'react-router-dom';

export default function NavigationLink({ target, children }: {
    target: string; 
    children: React.ReactNode | React.ReactNode[] 
})
{
    return (
        <ReactRouterLink to={target}>
            {({isActive}) => (
                <Link as="span"
                    textDecoration={isActive ? "underline" : "none"}
                    fontWeight={isActive ? "bold" : "medium"}
                >
                    {children}
                </Link>
            )}
        </ReactRouterLink>
    )
}