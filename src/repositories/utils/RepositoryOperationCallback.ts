import { RepositoryOperationStatus } from "@repos/enums/RepositoryOperationStatus";

export type RepositoryOperationCallback = (state: RepositoryOperationStatus, result?: string) => void
