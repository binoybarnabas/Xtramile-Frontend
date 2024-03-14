export interface TravelRequestDetails {
    accommodationRequired?: string;
    cabRequired?: string;
    createdBy?: number | null;
    departureDate?: string | null;
    destinationCity?: string | null;
    destinationCountry?: string | null;
    prefDepartureTime?: string | null;
    prefPickUpTime?: string | null;
    projectCode?: string | null;
    returnDate?: string | null;
    sourceCity?: string | null;
    sourceCountry?: string | null;
    travelAuthorizationEmailCapture?: string | null;
    travelModeId?: number | null;
    travelType?: string | null;
    tripPurpose?: string | null;
    tripType?: string | null;
    priority?: string | null;
    additionalComments?: string | null;
    projectId?: string | null;
}


// export interface TravelRequestDetails {

//     createdBy: string;
//     projectId: string;
//     tripType: string;
//     travelModeId: string;
//     tripPurpose: string;
//     departureDate: string;
//     returnDate: string;
//     sourceCity: string;
//     destinationCity: string;
//     sourceCountry: string;
//     destinationCountry: string;
//     travelTypeId: number;
//     projectCode: string;
//     cabRequired: string;
//     prefPickUpTime: string;
//     accommodationRequired: string;
//     prefDepartureTime: string | undefined;
//     travelAuthorizationEmailCapture: File | undefined;
//     passportAttachment: File | undefined;
//     additionalComments: string;
//     priority?: string

// }



export interface TravelRequestDetailViewModel {
    requestId: number;
    createdBy: string;

    requestCode: string;
    projectCode: string;
    tripType: string;
    travelMode: string;
    travelModeId:string;
    travelType: string;
    sourceCity: string;
    sourceCountry: string;
    destinationCity: string;
    destinationCountry: string;
    departureDate: string;
    returnDate: string;
    tripPurpose: string;
    prefDepartureTime: string;

    cabRequired: string;
    prefPickUpTime: string;
    accommodationRequired: string;

    travelAuthorizationEmailCapture: File | undefined;
    passportAttachment: File | undefined;

    additionalComments: string;

    priority?: string;


    primaryStatus: string;
    employeeName: string;
    passportFileUrl: string;
    travelAuthMailFileUrl: string;

}


