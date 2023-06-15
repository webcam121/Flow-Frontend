export enum CertificateStatus {
    Requested = 'requested',
    PendingContractor = 'pending-contractor',
    Assigned = 'assigned',
    InProgress = 'in-progress',
    Approved = 'approved',
    ApprovedBlockchainRegistered = 'approved-blockchain-registered',
    ApprovedBlockchainError = 'approved-blockchain-error',
    Rejected = 'rejected',
    RejectedBlockchainRegistered = 'rejected-blockchain-registered',
    RejectedBlockchainError = 'rejected-blockchain-error',
    Cancelled = 'cancelled',
    Expired = 'expired'
}

export enum UserRole {
    Root = 'root',
    SystemAdmin = 'system-admin',
    CompanyAdmin = 'company-admin',
    User = 'user'
}

export enum CompanyType {
    Admin = 'admin',
    Authority = 'authority',
    Contractor = 'contractor'
}

export type UserData = {
    firstName?: string,
    lastName?: string,
    email?: string,
    role?: string,
    companyType?: string,
    state?: string
}