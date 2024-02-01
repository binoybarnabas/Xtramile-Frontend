import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonAPIService } from '../services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-sampletest',
  templateUrl: './sampletest.component.html',
  styleUrls: ['./sampletest.component.css']
})
export class SampletestComponent {

  subscription: any;
  router: any;

  constructor(private apiService: CommonAPIService) {

    // private router: Router;



  }


  ngOnDestroy() {
    this.subscription.unSubscribe();
    console.log("UNSUBSCRIBED")
  }





  form!: FormGroup;

  // ngOnInit() {

  //   this.form = new FormGroup({


  //     firstName: new FormControl('', Validators.required),
  //     lastName: new FormControl('', Validators.required),
  //     email: new FormControl('', [Validators.required, Validators.email]),

  //     address: new FormGroup({
  //       street: new FormControl('', Validators.required),
  //       city: new FormControl('', Validators.required),
  //       pincode: new FormControl('', Validators.required)
  //     })

  //   })

  // }


  ngOnInit() {

    this.form = new FormGroup({

      countryId: new FormControl('', Validators.required),
      countryCode: new FormControl('', Validators.required),
      countryName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),

    })

  }

  onSubmit() {
    console.log(this.form)
    this.postData(this.form.value);
  }


  postData(data: any) {
    this.apiService.postData(data).subscribe((data) => {
      console.log(data);
      //  this.goToMain();
    })
  }


  // goToMain() {
  //   this.router.navigate(['sample'], { queryParams: { dataAdded: true } });
  // }


}
