import { Component } from '@angular/core';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css']
})
export class DocumentCardComponent {
  isFlipped: boolean = false;

  // flipCard() {
  //   this.isFlipped = !this.isFlipped;
  // }

  cards = [
    { id: 1, isFlipped: false },
    // { id: 2, isFlipped: false },
    // Add more cards as needed
  ];

  flipCard(card: any) {
    card.isFlipped = !card.isFlipped;
  }
}
