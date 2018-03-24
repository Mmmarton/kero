import { Component, OnInit } from '@angular/core';
import { ScrollToAnimationEasing } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public ngxScrollToEasing: ScrollToAnimationEasing;

  ngOnInit() {
    this.ngxScrollToEasing = "easeOutQuint";
  }

}
