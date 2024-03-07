import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-traveller-documents',
  templateUrl: './traveller-documents.component.html',
  styleUrls: ['./traveller-documents.component.css']
})
export class TravellerDocumentsComponent {

  constructor(private router: Router) {}
  navigateTo(){
    this.router.navigate(['employee/add_documents'],{
    })
  }

}
