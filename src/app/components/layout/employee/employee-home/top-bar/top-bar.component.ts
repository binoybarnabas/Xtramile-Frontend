import { Component } from '@angular/core';
// import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
import { SideNavBarService } from '../../../../../services/layoutServices/side-nav-bar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})



export class TopBarComponent {


  constructor(private sideNavBarService: SideNavBarService) {

  }




}
