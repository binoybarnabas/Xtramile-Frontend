import { Component, Input } from '@angular/core';
import { FileCard } from 'src/app/services/interfaces/iFileCard';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent {


  fileCard?: FileCard[];
  @Input() requestId!: number

  constructor() {

    this.fileCard = [
      {
        fileType: "Travel Auth Doc",
        fileName: "emp_travel_auth.png",
        fileSize: "20KB"
      },
      {
        fileType: "Passport",
        fileName: "emp_passport.pdf",
        fileSize: "20KB"

      },
      {
        fileType: "VISA",
        fileName: "emp_id_card.pdf",
        fileSize: "20KB"
      },
      {
        fileType: "VISA",
        fileName: "emp_id_card.pdf",
        fileSize: "20KB"
      }

    ]

  }

  ngOnInit(){
    console.log(this.requestId)
  }


}