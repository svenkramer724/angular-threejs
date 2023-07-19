import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubikComponent } from './rubik.component';

describe('RubikComponent', () => {
  let component: RubikComponent;
  let fixture: ComponentFixture<RubikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RubikComponent]
    });
    fixture = TestBed.createComponent(RubikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
