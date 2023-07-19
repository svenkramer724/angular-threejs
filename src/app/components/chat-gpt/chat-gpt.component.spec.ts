import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGPTComponent } from './chat-gpt.component';

describe('ChatGPTComponent', () => {
  let component: ChatGPTComponent;
  let fixture: ComponentFixture<ChatGPTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatGPTComponent]
    });
    fixture = TestBed.createComponent(ChatGPTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
