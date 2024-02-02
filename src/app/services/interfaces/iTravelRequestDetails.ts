
export interface travelRequestDetails {

    createdBy: string;
    travelTypeId: string;
    tripPurpose: string;
    departureDate: string;
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
    prefDepartureTime: string;

    mailAttachment: File;
    passportAttachment: File;
    idCardAttachment: File;

    additionalComments: string;

}

