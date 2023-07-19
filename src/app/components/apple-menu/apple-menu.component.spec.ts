import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleMenuComponent } from './apple-menu.component';

describe('AppleMenuComponent', () => {
  let component: AppleMenuComponent;
  let fixture: ComponentFixture<AppleMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppleMenuComponent]
    });
    fixture = TestBed.createComponent(AppleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
