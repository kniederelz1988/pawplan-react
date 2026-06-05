import { Link, Text } from '@chakra-ui/react';
import { NavLink as ReactRouterLink } from 'react-router-dom';

type NavigationLinkProps = {
    target: string,
    children: React.ReactNode | React.ReactNode[] 
    disabled?: boolean
}

export default function NavigationLink({ target, children, disabled = false } : NavigationLinkProps)
{
    if (disabled) {
        return (
            <Link as="span"
                cursor="not-allowed"
                textDecoration={"none"}
                fontSize={"sm"}
                fontWeight={"medium"}
                bgColor="Highlight"
                color="HighlightText"
                px={4}
                py={2}
                borderRadius={32}
                w="100%"
                opacity={0.6}
            >
                {children}
            </Link>
        )
    }

    return (
        <ReactRouterLink to={target}>
            {({isActive}) => (
                <Link as="span"
                    textDecoration={isActive ? "underline" : "none"}
                    fontSize={"sm"}
                    fontWeight={isActive ? "bold" : "medium"}
                    px={4}
                    py={2}
                    borderRadius={32}
                    bgColor="Highlight"
                    color="HighlightText"
                    w="100%"
                >
                    {children}
                </Link>
            )}
        </ReactRouterLink>
    )
}