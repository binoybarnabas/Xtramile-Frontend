export interface ResubmitRequest {
    requestId: number;
    empId: number;
    primaryStatusId: number;
    date: Date;
    secondaryStatusId: number;
}
