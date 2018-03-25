import { Component, OnInit } from '@angular/core';
import { ScrollToAnimationEasing, ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public ngxScrollToEasing: ScrollToAnimationEasing;
  private slides = ['promo', 'meet', 'share', 'build'];
  private currentSlide;
  private previousScrollTop;
  scrolling;

  constructor(private scrollToService: ScrollToService) {

  }

  ngOnInit() {
    this.scrolling = false;
    document.getElementsByClassName('scroller')[0].scrollTop = 0;
    this.previousScrollTop = 0;
  }

  onScroll(event) {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;

    let delta = this.previousScrollTop - event.target.scrollTop;
    //console.log(this.previousScrollTop + " - " + event.target.scrollTop);
    this.previousScrollTop = event.target.scrollTop;

    let index;
    if (delta <= 0) {
      index = Math.ceil(event.target.scrollTop / event.target.clientHeight);
    }
    else if (delta > 0) {
      index = Math.floor(event.target.scrollTop / event.target.clientHeight);
    }
    console.log(index);
    this.scrollTo(index, index * event.target.clientHeight);
  }

  scrollTo(index, position) {
    const config: ScrollToConfigOptions = {
      target: this.slides[index],
      easing: 'easeOutCubic'
    };
    this.scrollToService.scrollTo(config).subscribe(
      value => {
        if (value == Math.round(value)) {
          Observable.timer(10).subscribe(i => {
            this.scrolling = false;
            this.previousScrollTop = position;
          })
        }
      }
    );
  }
}
