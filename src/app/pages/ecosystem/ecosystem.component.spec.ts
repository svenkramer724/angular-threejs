import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosystemComponent } from './ecosystem.component';

describe('EcosystemComponent', () => {
  let component: EcosystemComponent;
  let fixture: ComponentFixture<EcosystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcosystemComponent]
    });
    fixture = TestBed.createComponent(EcosystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
