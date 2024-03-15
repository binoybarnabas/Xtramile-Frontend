import { Component, EventEmitter, Output } from '@angular/core';
import { toTitleCase } from 'src/app/utils/TitleCasing';
@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent {
  // data to be used are selected date, selectedSortOption and searchByName
  selectedDate: any;
  selectedSortOption: string = 'select';
  searchName: string = ''

  @Output() dateSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortOptionSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchByName: EventEmitter<string> = new EventEmitter<string>();
  @Output() seeAllClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit(): void {
  }

  // to send date to the parent
  onDateSelected(): void {
    this.dateSelected.emit(this.selectedDate);
  }

  //to send sort option to the parent
  onSortOptionSelected(): void {
    this.sortOptionSelected.emit(this.selectedSortOption);
  }

  //to send value or name to get the name
  OnNameSearch(): void {
    // all the name should be converted to title case since the first and last name in db are added as that
    this.searchByName.emit(toTitleCase(this.searchName));
  }

  onSeeAllClick(): void {
    this.selectedDate = null;
    this.selectedSortOption = 'select';
    this.searchName = ''
    this.seeAllClicked.emit();
  }
}
