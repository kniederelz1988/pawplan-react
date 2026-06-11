export const RepositoryOperationStatusEnum = {
    Success: 1,
    Error: 2
} as const
export type RepositoryOperationStatus = typeof RepositoryOperationStatusEnum[keyof typeof RepositoryOperationStatusEnum]