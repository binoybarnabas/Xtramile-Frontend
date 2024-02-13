
export interface TravelRequestDetails {

    createdBy: string;
    projectId: string;

    tripType: string;
    travelModeId: string;
    tripPurpose: string;
    departureDate: string;
    returnDate: string;

    sourceCity: string;
    destinationCity: string;

    sourceCountry: string;
    destinationCountry: string;

    travelTypeId: number;
    projectCode: string;

    cabRequired: string;
    prefPickUpTime: string;

    accommodationRequired: string;
    prefDepartureTime: string | undefined;

    travelAuthorizationEmailCapture: File | undefined;
    passportAttachment: File | undefined;

    additionalComments: string;

    priority?: string

}



export interface TravelRequestDetailViewModel {
    requestId: number;
    createdBy: string;

    requestCode: string;
    projectCode: string;
    tripType: string;
    travelMode: string;
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


