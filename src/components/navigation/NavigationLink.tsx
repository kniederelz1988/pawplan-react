import { Link } from '@chakra-ui/react';
import { useCallback } from 'react';

type NavigationLinkProps = {
    children: React.ReactNode | React.ReactNode[] 
    active: boolean,
    onClick?: () => void
}

export default function NavigationLink({ children, active, onClick } : NavigationLinkProps)
{
    const handleOnClick = useCallback((e: React.MouseEvent) => {
        if (!onClick)
            return

        e.preventDefault();
        onClick()
    }, [onClick])

    return (
        <Link onClick={handleOnClick}
            width="100%"

            fontSize={"sm"}
            fontWeight={active ? "bold" : "medium"}
            textDecoration={active ? "underline" : "none"}

            px={4}
            py={2}
            borderRadius={32}

            bgColor="Highlight"
            color="HighlightText"
        >
            {children}
        </Link>
    )
}