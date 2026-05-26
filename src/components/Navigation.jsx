import { Link, VStack } from '@chakra-ui/react';
import { NavLink as ReactRouterLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <VStack w={200}>
            <ReactRouterLink to="/">
                {({isActive}) => (
                    <Link as="span" color="white"
                        textDecoration={isActive ? "underline" : "none"}
                        fontWeight={isActive ? "bold" : "medium"}
                    >
                        Discover
                    </Link>
                )}
            </ReactRouterLink>

            <ReactRouterLink to="/userFavorites">
                {({isActive}) => (
                    <Link as="span" color="white"
                        textDecoration={isActive ? "underline" : "none"}
                        fontWeight={isActive ? "bold" : "medium"}
                    >
                        Favourites (2)
                    </Link>
                )}
            </ReactRouterLink>

            <ReactRouterLink to="/userAppointments">
                {({isActive}) => (
                    <Link as="span" color="white"
                        textDecoration={isActive ? "underline" : "none"}
                        fontWeight={isActive ? "bold" : "medium"}
                    >
                        Appointments
                    </Link>
                )}
            </ReactRouterLink>

            <ReactRouterLink to="/userProfile">
                {({isActive}) => (
                    <Link as="span" color="white"
                        textDecoration={isActive ? "underline" : "none"}
                        fontWeight={isActive ? "bold" : "medium"}
                    >
                        Profile
                    </Link>
                )}
            </ReactRouterLink>
        </ VStack>
    )
}