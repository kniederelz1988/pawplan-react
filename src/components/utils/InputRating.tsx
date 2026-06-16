import { useEffect, useMemo, useState } from "react"
import { IconButton } from "@chakra-ui/react"

import { LuStar } from "react-icons/lu"

type InputRatingProps = {
    value: number
    onValueChanged: (v: number) => void
}

export default function InputRating({ value, onValueChanged } : InputRatingProps) {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)

    const activeRating = useMemo(() => {
        return hoveredRating > 0 ? hoveredRating : rating
    }, [rating, hoveredRating])

    useEffect(() => {
        setRating(value)
    }, [value])

    useEffect(() => {
        onValueChanged(rating)
    }, [rating])

    return (
        Array.from({ length: 5 }).map((_,i) => {
            return (
                <IconButton key={i} variant="plain"
                    onClick={() => setRating(i+1)}
                    onMouseEnter={() => setHoveredRating(i+1) }
                    onMouseLeave={() => setHoveredRating(0) }
                >
                    <LuStar fill={(i+1) <= activeRating ? "currentColor" : "none"} />
                </IconButton>
            );
        })
    )
}
