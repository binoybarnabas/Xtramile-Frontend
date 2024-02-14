import { Component } from '@angular/core';
import { FileCard } from 'src/app/services/interfaces/iFileCard';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent {


  fileCard?: FileCard[];

  constructor() {

    this.fileCard = [
      {
        fileName: "Travel Auth Doc",
        fileDescription: "emp_travel_auth.png",
        fileSize: "20KB"
      },
      {
        fileName: "Passport",
        fileDescription: "emp_passport.pdf",
        fileSize: "20KB"

      },
      // {
      //   fileName: "ID Card",
      //   fileDescription: "emp_id_card.pdf",
      //   fileSize: "20KB"

      // },

    ]

  }


}