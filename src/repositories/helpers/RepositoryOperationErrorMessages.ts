import { getFirestoreErrorMessage } from "@fb/FirebaseErrorHelpers"

export const RepositoryOperationErrorEnum = {
    None: 0,
    UndefinedData: 1
} as const
type RepositoryOperationError = typeof RepositoryOperationErrorEnum[keyof typeof RepositoryOperationErrorEnum]

export function getRepositoryOperationErrorMessage( error: unknown ): string {
    const rError = (error as RepositoryOperationError)
    if (rError) {
        switch (rError) {
            case RepositoryOperationErrorEnum.UndefinedData:
                return "Data not defined."
        }
    }

    return getFirestoreErrorMessage(error)
}