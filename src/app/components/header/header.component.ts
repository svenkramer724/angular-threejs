import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GptApiService } from 'src/app/services/gpt-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  chats: Array<{
    id: string;
    chat: { role: 'user' | 'assistant'; content: string }[];
  }> = [];
  constructor() {
    this.chats = JSON.parse(localStorage.getItem('chatList') as string);
  }
  ngOnInit(): void {
    this.chats = JSON.parse(localStorage.getItem('chatList') as string);
  }
}
