import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.css']
})
export class DashboardMapComponent implements OnInit, OnChanges {
  // ViewChild decorator to get a reference to the mapSvg element in the template
  @ViewChild('mapSvg') mapSvg!: ElementRef;

  // Input decorator to receive the currentCountry value from the parent component
  @Input() currentCountry: string = '';

  // Variable to store the SVG element
  svg: any;

  // ngOnChanges lifecycle hook to detect changes in input properties
  ngOnChanges(changes: SimpleChanges): void {
    // Check if currentCountry has changed and it's not the first change
    if (changes['currentCountry'] && !changes['currentCountry'].firstChange) {
      // Update the map when the currentCountry changes
      this.updateMap();
    }
  }

  // ngOnInit lifecycle hook to initialize the component
  ngOnInit(): void {
    // Load the map when the component is initialized
    this.loadMap();
    if (this.currentCountry == '') {
      this.currentCountry = 'India';
    }
  }

  // Method to load the map using D3
  loadMap() {
    // Fetch the SVG data
    d3.xml('assets/world.svg').then(data => {
      // Select the mapSvg element from the template
      this.svg = d3.select(this.mapSvg.nativeElement);

      // Extract path data explicitly (assuming pathData is defined elsewhere)
      const pathData = data.documentElement.querySelectorAll('path');

      // Create paths and bind data with conditional filling
      const countries = this.svg.selectAll('path')
        .data(pathData)
        .enter()
        .append('path')
        .attr('d', (d: { getAttribute: (arg0: string) => any; }) => d.getAttribute('d'))
        .attr('fill', (d: { getAttribute: (arg0: string) => any; }) => {
          return d.getAttribute('name') === this.currentCountry ? '#0240bc' : 'lightblue';
        })
        // Mouseover event handling
        .on('mouseover', (event: { currentTarget: Element; pageX: number; pageY: number; }, d: { getAttribute: (arg0: string) => string; }) => {
          // Check if the country is not the current country
          if (d.getAttribute('name') !== this.currentCountry) {
            // Change fill color on mouseover
            d3.select(event.currentTarget as Element).attr('fill', '#2bb2fe');

            // Select the tooltip element
            const hoveredCountry = d3.select('.hoveredCountry');
            const countryName = d.getAttribute('name');

            // Check if the countryName is available
            if (countryName) {
              // Show and populate the tooltip
              hoveredCountry.style('display', 'block');
              hoveredCountry.html(countryName);
            } else {
              // Hide tooltip if name is missing
              d3.select('.hoveredCountry').style('display', 'none');
            }
          }
        })
        // Mouseout event handling
        .on('mouseout', (event: { currentTarget: Element; }, d: { getAttribute: (arg0: string) => string; }) => {
          // Check if the country is not the current country
          if (d.getAttribute('name') !== this.currentCountry) {
            // Restore fill color on mouseout
            d3.select(event.currentTarget as Element).attr('fill', 'lightblue');

            // Hide tooltip on mouseout
            d3.select('.hoveredCountry').style('display', 'none');
          }
        });
    });
  }

  // Method to update the map based on the new currentCountry value
  updateMap() {
    // Update the fill color of each path based on the new currentCountry value
    this.svg.selectAll('path')
      .attr('fill', (d: { getAttribute: (arg0: string) => any; }) => {
        return d.getAttribute('name') === this.currentCountry ? 'orange' : 'lightblue';
      });
  }
}
