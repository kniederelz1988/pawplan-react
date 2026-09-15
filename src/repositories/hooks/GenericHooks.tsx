import { useCallback, useState } from "react"

type PageCursor = {
    id?: string
}

export function usePages<P extends PageCursor>() {
    const [page, setPage] = useState(0)
    const [pageCursors, setPageCursors] = useState<(P | null)[]>([null])

    const setPageCursor = useCallback((page: number, pageCursor: P) => {
        setPageCursors(current => {
            const next = [...current]

            while (next.length <= page)
                next.push(null)

            next[page] = pageCursor

            if (
                next.length === current.length &&
                next.every((value, index) => Object.is(value?.id, current[index]?.id))
            ) {
                return current
            }

            return next
        })
    }, [])

    const activePageCursor = pageCursors[page] ?? null
    const nextPageCursor = pageCursors[page + 1] ?? null
    const previousPageActive = page > 0
    const nextPageActive = nextPageCursor != null

    const previousPage = useCallback(() => {
        if (!previousPageActive)
            return

        setPage(current => current - 1)
    }, [previousPageActive])
    
    const nextPage = useCallback(() => {
        if (!nextPageActive)
            return
        
        setPage(current => current + 1)
    }, [nextPageActive])

    return { 
        page:               page,
        pageControls:       { previousPage, previousPageActive, nextPage, nextPageActive },
        activePageCursor, setPageCursor
    }
}
