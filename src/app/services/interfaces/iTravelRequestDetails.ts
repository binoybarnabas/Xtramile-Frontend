
export interface TravelRequestDetails {

    createdBy: string;
    travelTypeId: string;
    tripPurpose: string;
    departureDate: string ;
    returnDate: string;
    sourceCityZipCode: string;
    destinationCityZipCode: string;
    sourceCity: string;
    destinationCity: string;
    sourceState: string;
    destinationState: string;
    sourceCountry: string;
    destinationCountry: string;
    cabRequired: string;
    accommodationRequired: string;
    prefDepartureTime: string | undefined;

    travelAuthorizationEmailCapture: File | undefined;
    passportAttachment: File | undefined;
    idCardAttachment: File | undefined;

    additionalComments: string;

    priority?: string

}



export interface TravelRequestDetailViewModel {
    requestId : number;
    createdBy: string;
    travelType: string;
    tripPurpose: string;
    departureDate: string ;
    returnDate: string ;
    sourceCityZipCode: string;
    destinationCityZipCode: string;
    sourceCity: string;
    destinationCity: string;
    sourceState: string;
    destinationState: string;
    sourceCountry: string;
    destinationCountry: string;
    cabRequired: string;
    accommodationRequired: string;
    prefDepartureTime: string ;
    travelAuthorizationEmailCapture: File | undefined;
    passportAttachment: File | undefined;
    idCardAttachment: File | undefined;

    additionalComments: string;

    priority?: string

}


