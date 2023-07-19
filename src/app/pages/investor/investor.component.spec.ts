import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorComponent } from './investor.component';

describe('InvestorComponent', () => {
  let component: InvestorComponent;
  let fixture: ComponentFixture<InvestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorComponent]
    });
    fixture = TestBed.createComponent(InvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
