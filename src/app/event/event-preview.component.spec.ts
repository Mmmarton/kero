import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPreviewComponent } from './event-preview.component';

describe('EventComponent', () => {
  let component: EventPreviewComponent;
  let fixture: ComponentFixture<EventPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
