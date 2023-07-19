import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverContentComponent } from './popover-content.component';

describe('PopoverContentComponent', () => {
  let component: PopoverContentComponent;
  let fixture: ComponentFixture<PopoverContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopoverContentComponent]
    });
    fixture = TestBed.createComponent(PopoverContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
