import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-middle-console',
  templateUrl: './middle-console.component.html',
  styleUrls: ['./middle-console.component.css']
})
export class MiddleConsoleComponent {

  subscription: any;
  router: any;

  // constructor(private apiService: SampleApiService) {

  //   private router: Router;

  //   this.subscription = this.apiService.getData().subscribe({

  //     next: (data) => {
  //       console.log(data)
  //     },
  //     error: (error: Error) => {
  //       alert("Error has occured" + error.message);
  //     },
  //     complete: () => {
  //       console.log("COMPLETED");
  //     }

  //   });

  // }


  // ngOnDestroy() {
  //   this.subscription.unSubscribe();
  //   console.log("UNSUBSCRIBED")
  // }


  newReqFormSubMenuValue: number;

  constructor() {
    this.newReqFormSubMenuValue = 1;
  }

  changeNewReqFormSubMenuValue(value: number) {
    this.newReqFormSubMenuValue = value;
  }



  form!: FormGroup;


  ngOnInit() {

    this.form = new FormGroup({

      // phone: new FormControl('', Validators.required),


      //Trip Info
      tripType: new FormControl('', Validators.required),
      tripPurpose: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
      returnDate: new FormControl('', Validators.required),
      sourceCityZipCode: new FormControl('', Validators.required),
      destinationCityZipCode: new FormControl('', Validators.required),
      sourceCity: new FormControl('', Validators.required),
      destinationCity: new FormControl('', Validators.required),
      sourceState: new FormControl('', Validators.required),
      destinationState: new FormControl('', Validators.required),
      sourceCountry: new FormControl('', Validators.required),
      destinationCountry: new FormControl('', Validators.required),


      //Additional Info
      cabService: new FormControl('', Validators.required),
      hotelAccomodation: new FormControl('', Validators.required),
      prefDepartureTime: new FormControl('', Validators.required),
      mailAttachment: new FormControl('', Validators.required),
      passportAttachment: new FormControl('', Validators.required),
      idCardAttachment: new FormControl('', Validators.required),


    })

  }

  onSubmit() {
    console.log(this.form)
    // this.postData(this.form.value);
  }

  // postData(data: any) {
  //   this.apiService.postData(data).subscribe((data) => {
  //     console.log(data);
  //     this.goToMain();
  //   })
  // }




}
