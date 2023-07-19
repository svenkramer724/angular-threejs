import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GptApiService } from 'src/app/services/gpt-api.service';
import anime from 'animejs/lib/anime.es.js';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// import { IosSelectorOptions } from 'src/app/directives/ios-selector.directive';
const animation = { duration: 50000, easing: (t: any) => t };

interface WalletGPTExample {
  id: number;
  title: string;
  description: string;
}
@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.scss'],
})
export class ChatGPTComponent implements OnInit {
  // options: IosSelectorOptions;
  currentUid: string;
  chats: Array<{
    id: string;
    chat: { role: 'user' | 'assistant'; content: string }[];
  }> = [];
  @Input() css: boolean = false;
  form: FormGroup;
  @ViewChild('contenuElement', { static: false }) contenuElement!: ElementRef;
  loader: boolean = false;
  isModalOpen = false;
  isWritting: boolean = false;
  endWritting: boolean = false;
  autoList: string[] = [];
  lenght: number = 0;
  section:
    | 'how-it-work'
    | 'tokenomix'
    | 'roadmap'
    | 'statistic'
    | 'team'
    | 'use-case'
    | 'talk'
    | 'footer'
    | null = null;
  discussionsList: Array<{ role: 'user' | 'assistant'; content: string }[]> =
    [];
  discussions: { role: 'user' | 'assistant'; content: string }[] = [];
  text = [
    'Ask me anything ...',
    'I optimize the prompt ...',
    'Simply do it or get an expert ...',
  ];
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  @ViewChild('sliderRef2') sliderRef2!: ElementRef<HTMLElement>;
  // private chat:HTMLElement;
  step: string = 'home';
  slider!: KeenSliderInstance;
  slider2!: KeenSliderInstance;
  usesCases: WalletGPTExample[] = [
    {
      id: 1,
      title: 'Risk assessment for financial decisions',
      description:
        'Sarah is considering investing in a specific cryptocurrency...',
    },
    {
      id: 2,
      title: 'Identifying and capitalizing on investment opportunities',
      description: 'Mark is interested in real estate investment...',
    },
    {
      id: 3,
      title: 'Avoiding fraudulent schemes and deceptive materials',
      description: 'Lisa wants to invest her savings wisely...',
    },
    {
      id: 4,
      title: 'Interactive form interface for wallet-related transactions',
      description: 'John needs to make various financial transactions...',
    },
    {
      id: 5,
      title: 'Accelerated convergence on results through AI fine-tuning',
      description: 'David, a financial analyst, relies on WalletGPT...',
    },
    {
      id: 6,
      title: 'Connecting users with experts and facilitating live interactions',
      description: 'Emma is a novice investor and seeks personalized advice...',
    },
    {
      id: 7,
      title: 'Expert alerting system and liveliness monitoring',
      description:
        'Michael, an expert in cryptocurrency trading, wants to be notified promptly...',
    },
    {
      id: 8,
      title: 'User groups and concept-based communities',
      description:
        'Susan is passionate about investing in sustainable energy companies...',
    },
    {
      id: 9,
      title: 'Open expertise rating system',
      description:
        'James wants to ensure he receives reliable advice from experts...',
    },
    {
      id: 10,
      title: 'Privilege clubs for specialized collaborations',
      description:
        'Olivia, a seasoned investor, wants to collaborate with other experts...',
    },
    {
      id: 11,
      title: 'Investment and product discount alerts',
      description: 'Alex wants to stay updated on investment opportunities...',
    },
    {
      id: 12,
      title: 'Cache and local AI proxies for faster responses',
      description:
        'Rebecca uses WalletGPT for real-time stock market analysis...',
    },
  ];

  // itemHeight = (100 * 3) / this.autoList.length; // 每项高度
  // itemAngle = 360 / this.autoList.length; // 每项之间旋转度数
  // radius = this.itemHeight / Math.tan((this.itemAngle * Math.PI) / 180); // 圆环半径

  constructor(
    private gpt: GptApiService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.form = new FormGroup({
      content: new FormControl('', [Validators.required]),
    });
    this.chats = JSON.parse(localStorage.getItem('chatList') as string)
    if(!this.chats){
      this.chats=[];
    }
    console.log(this.autoList);

    this.currentUid = this.generateUID();
    localStorage.setItem('currentUid', this.currentUid);
  }
  showPopover = false;

  togglePopover() {
    this.showPopover = !this.showPopover;
  }

  getBool(event: any) {
    // console.log(event);
    this.endWritting = event;
  }

  showSectionModal(
    section:
      | 'how-it-work'
      | 'tokenomix'
      | 'roadmap'
      | 'statistic'
      | 'team'
      | 'use-case'
      | 'talk'
      | 'footer'
      | null
  ) {
    this.section = section;
  }
  hideModal() {
    this.section = null;
  }
  public isVisible: boolean = false;

  public show(): void {
    this.isVisible = true;
  }

  public hides(): void {
    this.isVisible = false;
  }

  changePrompt(prompt: string) {
    this.form.controls['content'].setValue(prompt);
  }
  scrollToElement = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (id === 'home') {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      // To enable scrolling
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  };

  getAutoComplete(event: any) {
    let val: any = event.target.value.trim();
    if(localStorage.getItem('text') != 'none'){
      val = localStorage.getItem('text');
      // localStorage.setItem('text','none');
    }
    this.lenght = val.length;
    if(this.lenght>10){
      this.gpt.completion(val).subscribe((res: string) => {
        let filter1 = res.split('\n').filter((item) => item.trim() !== '');
        this.autoList = filter1.map((item) => item.replace(/^\d+\.\s*/, ''));
        // this.options.source = this.autoList;
      });
    }else{
      return;
    }
    
  }
  con(str: string) {
    return str.replace(/\n/g, '<br>');
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
  onCloseMenu(event:any){
    this.showPopover =event;
  }
  submit() {
    this.scrollToElement('home');
    const temp = localStorage.getItem('text');

    if (this.form.controls['content'].value !== '' || temp) {
      this.isWritting = true;
      let text = this.form.controls['content'].value;
      if(text === '') text = temp;
      this.discussions.push({ role: 'user', content: text });
      this.updateChat(this.currentUid, this.discussions);
      this.form.reset();
      this.loader = true;
      this.autoList.pop();
      this.autoList = [];
      this.gpt.askQuestion(text, 'user').subscribe((res) => {
        setTimeout(() => {
          this.loader = false;
          this.discussions.push(res);
          this.updateChat(this.currentUid, this.discussions);
        }, 50);
      });
    }else{
      return;
    }
    
  }

  updateChat(
    uid: string,
    chat: { role: 'user' | 'assistant'; content: string }[]
  ) {
    const isFind = this.chats.findIndex((discussion) => discussion.id === uid);
    console.log(isFind);

    if (isFind !== -1) {
      this.chats[isFind].chat = chat;
      localStorage.setItem('chatList', JSON.stringify(this.chats));
    } else {
      this.chats.push({ id: uid, chat: chat });
      localStorage.setItem('chatList', JSON.stringify(this.chats));
    }
  }

  action() {
    this.isWritting = false;
    //  this.discussions = []
  }

  generateUID(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const uidLength = 10;
    let uid = '';
    for (let i = 0; i < uidLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      uid += chars.charAt(randomIndex);
    }
    return uid;
  }

  ngAfterViewInit(): void {
    this.checkContentHeight();
    // this.chat = this.el.nativeElement.querySelector('app-chat-gpt');
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      mode: 'free-snap',
      renderMode: 'performance',
      created(s) {
        s.moveToIdx(5, true, animation);
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      },
      breakpoints: {
        '(min-width: 0px)': {
          slides: {
            perView: 1,
            spacing: 30,
          },
        },
        '(min-width: 500px)': {
          slides: {
            origin: 'center',
            perView: 2,
            spacing: 15,
          },
        },
        '(min-width: 768px)': {
          slides: {
            origin: 'center',
            perView: 4,
            spacing: 15,
          },
        },
        '(min-width: 1024px)': {
          slides: {
            origin: 'center',
            perView: 5,
            spacing: 15,
          },
        },
      },
    });
    this.slider2 = new KeenSlider(this.sliderRef2.nativeElement, {
      loop: true,
      mode: 'free-snap',
      renderMode: 'performance',
      created(s) {
        s.moveToIdx(5, true, animation);
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      },
      breakpoints: {
        '(min-width: 0px)': {
          slides: {
            perView: 3,
            spacing: 30,
          },
        },
        '(min-width: 500px)': {
          slides: {
            origin: 'center',
            perView: 4,
            spacing: 30,
          },
        },
        '(min-width: 768px)': {
          slides: {
            origin: 'center',
            perView: 4,
            spacing: 30,
          },
        },
        '(min-width: 1024px)': {
          slides: {
            origin: 'center',
            perView: 4,
            spacing: 30,
          },
        },
      },
    });
  }

  checkContentHeight() {
    const element = this.contenuElement.nativeElement;
    console.log(element);

    element.scrollBottom = element.scrollHeight;
  }

  convert(data: string) {
    let list = data.split('\n\n').filter((line) => line.trim().length > 0);
    return list;
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

  ngOnInit(): void {
    console.log(this.autoList);
    // this.checkContentHeight();
    // this.chat = this.el.nativeElement.querySelector('app-chat-gpt');
    this.scrollToElement('home');
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.gsap_reveal').forEach((elem) => {
      this.hide(elem); // assure that the element is hidden when scrolled into view
      ScrollTrigger.create({
        once: false,
        trigger: elem as any,
        onEnter: () => {
          this.animateFrom(elem);
        },
        onEnterBack: () => {
          this.animateFrom(elem);
        },
        onRefresh: () => {
          this.animateFrom(elem);
        },
        // onRefreshInit: ()=>{
        //   this.animateFrom(elem)
        // },
        // onLeave: () => {
        //   this.hide(elem)
        // } // assure that the element is hidden when scrolled into view
      });
    });
  }

  animateFrom(elem: any, direction?: any) {
    direction = direction || 1;

    var x = 0,
      y = direction * 100;
    if (elem.classList.contains('gsap_reveal--fromLeft')) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains('gsap_reveal--fromRight')) {
      x = 100;
      y = 0;
    }

    elem.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    elem.style.opacity = '0';

    gsap.fromTo(
      elem,
      {
        x: x,
        y: y,
        autoAlpha: 0,
      },
      {
        duration: 2,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: 'expo',
        overwrite: 'auto',
      }
    );
  }

  hide(elem: any) {
    gsap.set(elem, {
      autoAlpha: 0,
    });
  }

  setValue(event: any) {
    alert('ok');
    let val: any = document.getElementById('custom-text')?.innerHTML;
    // console.log('HERE',val)
    // if(localStorage.getItem('text') != 'none'){
    //   val = localStorage.getItem('text');
    //   // localStorage.setItem('text','none');
    // }
    // this.lenght = val.length;
    // if(this.lenght>10){
    //   this.gpt.completion(val).subscribe((res: string) => {
    //     let filter1 = res.split('\n').filter((item) => item.trim() !== '');
    //     this.autoList = filter1.map((item) => item.replace(/^\d+\.\s*/, ''));
    //     // this.options.source = this.autoList;
    //   });
    // }else{
    //   return;
    // }
    const temp = document.getElementById('custom-input') as HTMLInputElement;
    temp.value = val;
    // const btn = document.getElementById('submit_button') as HTMLButtonElement;
    // btn?.onsubmit(event);
    this.gpt.completion(val).subscribe((res: string) => {
      let filter1 = res.split('\n').filter((item) => item.trim() !== '');
      this.autoList = filter1.map((item) => item.replace(/^\d+\.\s*/, ''));
      // this.options.source = this.autoList;
    });
    this.gpt.askQuestion(val, 'user').subscribe((res) => {
      setTimeout(() => {
        this.loader = false;
        this.discussions.push(res);
        this.updateChat(this.currentUid, this.discussions);
      }, 50);
    });
  }
}
