import { Component } from '@angular/core';
import { CustomLoaderService } from 'src/app/services/helperServices/commonUIServices/custom-loader-service/custom-loader.service';
@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrls: ['./custom-loader.component.css']
})
export class CustomLoaderComponent {

  isLoading = false;

  constructor(private loaderService: CustomLoaderService) {}

  ngOnInit() {
    this.loaderService.isLoading.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }

}
