import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as $ from 'jquery';
export function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-popover-content',
  templateUrl: './popover-content.component.html',
  styleUrls: ['./popover-content.component.scss'],
})
export class PopoverContentComponent implements OnInit {
  @Input() show!: boolean;
  @Input() data: any[] = [];
  @Output() closeModal = new EventEmitter();
  closing = false;
  @ViewChild('modalContent') modalContent!: ElementRef;
  numbers: Numbering[] = [];
  // scrollPositions: any = [0,-100,-250,-450,-620,-820,-1020,-1220,-1420,-1680,-1720-150,-1920-200,-2120-350,-2320-450,-2520-450,-2720-450,-2920-450]
  scrollPositions: any = [];
  // scrollPositions =   [0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750];
  // scrollPositions = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  // Question State
  currentQuestion = 0;
  totalQuestions = this.data.length;
  // Animation state
  swipeLeftOpen = false;
  swipeLeftClose = false;
  swipeRightOpen = false;
  swipeRightClose = false;
  saving = false;
  lazyLoadActive = false;

  scrollPosition = 0;

  async close() {
    this.closing = true;
    await sleep(1000);
    this.closing = true;
  }
  // closeOnOutsideClick(event: MouseEvent) {
  //   if (event.target === this.modalContent.nativeElement) {
  //     console.log('111111111111');
  //     return;
  //   } else {
  //     console.log('2222222222222');
  //     this.onCloseMenu();
  //   }
  // }
  onCloseMenu(){
    this.closeModal.emit(false)
  }
  constructor() {}

  initNumbering() {
    for (let i = 1; i <= this.data.length; i++) {
      this.numbers.push({ active: false, number: i });
    }
    this.numbers[0].active = true;
    // this.numbers[this.currentQuestion - 1].answered = true;
  }

  removeActiveStateOnNumbering() {
    for (let i = 0; i <= this.numbers.length - 1; i++) {
      this.numbers[i].active = false;
    }
  }

  setActiveOnNumbering() {
    this.removeActiveStateOnNumbering();
    this.numbers[this.currentQuestion - 1].active = true;
  }

  ngOnInit(): void {
    this.nextWithEnterKey();
    this.nextWithdirectionKey();
    this.previousWithdirectionKey();
    this.initNumbering();
    this.fillScrollPositions();
    // loader
    $(document).ready(() => {
      this.renderActiveQuestion();
    });
  }
  renderActiveQuestion2(index:number) {
    console.log('Jquery is working !!!');
    // $(".questionItem").hide();
    if ($(`#question_${this.currentQuestion - 1}`) != undefined) {
      $(`#question_${this.currentQuestion - 1}`).show();
      $(`#question_${this.currentQuestion - 1}`).addClass('previousQuestion');
      $(`#question_${this.currentQuestion - 1}`).removeClass('currentQuestion');
      $(`#question_${this.currentQuestion - 1}`)
        .find('.questionNumber')
        .css('color', 'grey');
    }
    if ($(`#question_${this.currentQuestion + 1}`) != undefined) {
      $(`#question_${this.currentQuestion + 1}`).show();
      $(`#question_${this.currentQuestion + 1}`).addClass('nextQuestion');
      $(`#question_${this.currentQuestion + 1}`).removeClass('currentQuestion');
      $(`#question_${this.currentQuestion + 1}`)
        .find('.questionNumber')
        .css('color', 'grey');
    }
    $(`#question_${this.currentQuestion}`).show();
    $(`#question_${this.currentQuestion}`).addClass('currentQuestion');
    $(`#question_${this.currentQuestion}`)
      .find('.questionNumber')
      .css('color', '#2FBAFB');

    this.setActiveOnNumbering();
    this.scrollToCurrentQuestion();

    // console.log($(".questionItem")[0]);
  }

  renderActiveQuestion() {
    console.log('Jquery is working !!!');
    // $(".questionItem").hide();
    if ($(`#question_${this.currentQuestion - 1}`) != undefined) {
      $(`#question_${this.currentQuestion - 1}`).show();
      $(`#question_${this.currentQuestion - 1}`).addClass('previousQuestion');
      $(`#question_${this.currentQuestion - 1}`).removeClass('currentQuestion');
      $(`#question_${this.currentQuestion - 1}`)
        .find('.questionNumber')
        .css('color', 'grey');
    }
    if ($(`#question_${this.currentQuestion + 1}`) != undefined) {
      $(`#question_${this.currentQuestion + 1}`).show();
      $(`#question_${this.currentQuestion + 1}`).addClass('nextQuestion');
      $(`#question_${this.currentQuestion + 1}`).removeClass('currentQuestion');
      $(`#question_${this.currentQuestion + 1}`)
        .find('.questionNumber')
        .css('color', 'grey');
    }
    $(`#question_${this.currentQuestion}`).show();
    $(`#question_${this.currentQuestion}`).addClass('currentQuestion');
    $(`#question_${this.currentQuestion}`)
      .find('.questionNumber')
      .css('color', '#2FBAFB');

    this.setActiveOnNumbering();
    this.scrollToCurrentQuestion();

    // console.log($(".questionItem")[0]);
  }

  fillScrollPositions() {
    let amplitude = 0;
    for (let i = 1; i <= this.data.length; i++) {
      console.log('Height of the container');
      console.log($(`#question_${i}`).outerHeight());

      this.scrollPositions.push(-amplitude);
      // if($(`#question_${i + 1}`).outerHeight() && $(`#question_${i}`).outerHeight()){
      amplitude =
        Math.abs(this.scrollPositions[i - 1]) +
        ($(`#question_${i + 1}`).outerHeight() || 0) / 2 +
        ($(`#question_${i}`).outerHeight() || 0) / 2 +
        i * 12;
      // } else{

      // }
    }

    console.log(this.scrollPositions);
  }

  scrollToCurrentQuestion() {
    $('.airDropQuestionArea').css(
      'transform',
      `translateY(${this.scrollPositions[this.currentQuestion - 1]}px)`
    );
  }

  nextWithEnterKey() {
    let that = this;
    document.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        that.next(that.currentQuestion);
      }
    });
  }
  nextWithdirectionKey() {
    const RightKeyCode = 39;
    let that = this;
    document.addEventListener('keyup', function (event) {
      if (event.keyCode === RightKeyCode) {
        that.next(that.currentQuestion);
      }
    });
  }
  previousWithdirectionKey() {
    const LeftKeyCode = 37;
    let that = this;
    document.addEventListener('keyup', function (event) {
      if (event.keyCode === LeftKeyCode) {
        if (that.currentQuestion > 1) that.previous();
      }
    });
  }

  async transitionNext() {
    this.currentQuestion++;
    this.renderActiveQuestion();
  }

  async transitionPrevious() {
    this.currentQuestion--;
    this.renderActiveQuestion();
  }

  next(questionIndex: number) {
    this.transitionNext();
    // this.validateQuestion(questionIndex);
  }
  goTo(questionIndex: number){
    const previousCurrent = this.currentQuestion;
    this.currentQuestion = questionIndex;
    $(`#question_${previousCurrent}`).removeClass('currentQuestion');
    this.renderActiveQuestion();
  }

  // async saveAirDrop() {
  //   this.saving = true;
  //   await sleep(2000);
  //   this.saving = false;
  //   await sleep(2000);
  //   this.close();
  // }

  previous() {
    this.transitionPrevious();
  }

  setCurrrent(currentQuestion: any) {
    this.currentQuestion = currentQuestion;
    this.renderActiveQuestion();
  }
}

interface Numbering {
  number?: number;
  // answered?: boolean;
  active?: boolean;
}
