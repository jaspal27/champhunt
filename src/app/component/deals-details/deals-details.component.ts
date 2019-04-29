import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'component-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.scss'],
})
export class DealsDetailsComponent implements OnInit {
  slideMiniOpts = {
    effect: 'flip',
    autoHeight: true,
    speed: 1000,
    spaceBetween: 16,
    loop: true,
    slidesPerView: 5,
};
  constructor() { }

  ngOnInit() {}

}
