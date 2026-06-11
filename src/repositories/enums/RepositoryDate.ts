export const RepositoryDateCompareEnum = {
    Past: 1,
    Future: 2
} as const
export type RepositoryDateCompare = typeof RepositoryDateCompareEnum[keyof typeof RepositoryDateCompareEnum]

export function getDateCompareOperator(date: RepositoryDateCompare) {
    switch (date) {
        case RepositoryDateCompareEnum.Past:
            return "<"
        case RepositoryDateCompareEnum.Future:
            return ">="
    }
}
export function getDateSortOperator(date: RepositoryDateCompare) {
    switch (date) {
        case RepositoryDateCompareEnum.Past:
            return "desc"
        case RepositoryDateCompareEnum.Future:
            return "asc"
    }
}