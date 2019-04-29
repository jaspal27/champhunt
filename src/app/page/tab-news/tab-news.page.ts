import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/firebase/app.services';


@Component({
  selector: 'app-tab-news',
  templateUrl: './tab-news.page.html',
  styleUrls: ['./tab-news.page.scss'],
})
export class TabNewsPage implements OnInit {
  newsPayload:any;
  constructor(
    public appService:AppService,
  ) {
  
   }

  async ngOnInit() {
    let newsData:any = await this.appService.getNewsData();
    this.newsPayload = JSON.parse(newsData.news); 
  }

}
