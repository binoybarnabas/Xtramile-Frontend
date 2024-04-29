import { Component } from '@angular/core';
import { PerdiemCard } from 'src/app/services/interfaces/iPerdiemCard';

@Component({
  selector: 'app-perdiem-card',
  templateUrl: './perdiem-card.component.html',
  styleUrls: ['./perdiem-card.component.css']
})
export class PerdiemCardComponent {

  perdiemCard?: PerdiemCard[];

  constructor() {

    this.perdiemCard = [
      {
        inrAmount: "1000",
        destinationCurrency: "USD",
        destinationAmount: "15.50",
        validFrom: "2024-02-05",
        validThru: "2024-02-10",
        totalDays: 10
      },
      {
        inrAmount: "2000",
        destinationCurrency: "EUR",
        destinationAmount: "20.75",
        validFrom: "2024-02-11",
        validThru: "2024-02-15",
        totalDays: 15

      },

    ]


  }

}
