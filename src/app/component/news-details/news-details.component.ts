import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'component-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
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
