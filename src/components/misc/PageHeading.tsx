import { Heading, HeadingProps } from "@chakra-ui/react"
import { useEffect, useRef } from "react"

export function PageHeading(props: HeadingProps) {
    const ref = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        ref.current?.focus()
    }, [])

    return (
        <Heading as="h1"
            ref={ref}
            w="100%"
            tabIndex={-1}
            justifyContent="left" 
            fontSize={"2xl"}
            {...props}
        />
    )
}