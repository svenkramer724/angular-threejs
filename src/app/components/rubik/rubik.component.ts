import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GptApiService } from 'src/app/services/gpt-api.service';
import { Cube } from 'src/assets/js/rubik/rubik.lib';
import { ChatGPTComponent } from '../chat-gpt/chat-gpt.component';

@Component({
  selector: 'rubik',
  templateUrl: './rubik.component.html',
  styleUrls: ['./rubik.component.scss']
})
export class RubikComponent implements OnInit {
  isOpen:boolean = false;
  chats: Array<{
    id: string;
    chat: { role: 'user' | 'assistant'; content: string }[];
  }> = [];
  constructor(){
    this.chats = JSON.parse(localStorage.getItem('chatList') as string)
  }
  ngOnInit(): void {
    this.chats = JSON.parse(localStorage.getItem('chatList') as string)
    const root = document.querySelector(".rubik-scene");
    const layerBtn = document.querySelector(".rubik-layerBtn");
    const cube = new Cube(root, layerBtn);
    
  }
}
