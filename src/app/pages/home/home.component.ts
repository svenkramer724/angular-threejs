import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { PopoverContentComponent } from 'src/app/components/popover-content/popover-content.component';
import { GptApiService } from 'src/app/services/gpt-api.service';

const animation = { duration: 50000, easing: (t: any) => t };
interface TypeItOptions {
  strings: string[];
}
interface WalletGPTExample {
  id: number;
  title: string;
  description: string;
} 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  loader: boolean = false;
  isScroll: boolean = false;
  isOpen:boolean = false;
  discussions: { role: 'user' | 'assistant'; content: string }[] = [];
  discussions2: { role: 'user' | 'assistant'; content: string }[] = [];
  text = 'Ask me anything … \t\tSimply do it or get an expert';
  text2 = 'Buy, sell, invest and earn cryptocurrencies around the world !';
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  @ViewChild('sliderRef2') sliderRef2!: ElementRef<HTMLElement>;
  private chat:HTMLElement;
  step:string = 'home';
  slider!: KeenSliderInstance;
  slider2!: KeenSliderInstance;
  usesCases:WalletGPTExample[] = [
    {
      id: 1,
      title: "Risk assessment for financial decisions",
      description: "Sarah is considering investing in a specific cryptocurrency..."
    },
    {
      id: 2,
      title: "Identifying and capitalizing on investment opportunities",
      description: "Mark is interested in real estate investment..."
    },
    {
      id: 3,
      title: "Avoiding fraudulent schemes and deceptive materials",
      description: "Lisa wants to invest her savings wisely..."
    },
    {
      id: 4,
      title: "Interactive form interface for wallet-related transactions",
      description: "John needs to make various financial transactions..."
    },
    {
      id: 5,
      title: "Accelerated convergence on results through AI fine-tuning",
      description: "David, a financial analyst, relies on WalletGPT..."
    },
    {
      id: 6,
      title: "Connecting users with experts and facilitating live interactions",
      description: "Emma is a novice investor and seeks personalized advice..."
    },
    {
      id: 7,
      title: "Expert alerting system and liveliness monitoring",
      description: "Michael, an expert in cryptocurrency trading, wants to be notified promptly..."
    },
    {
      id: 8,
      title: "User groups and concept-based communities",
      description: "Susan is passionate about investing in sustainable energy companies..."
    },
    {
      id: 9,
      title: "Open expertise rating system",
      description: "James wants to ensure he receives reliable advice from experts..."
    },
    {
      id: 10,
      title: "Privilege clubs for specialized collaborations",
      description: "Olivia, a seasoned investor, wants to collaborate with other experts..."
    },
    {
      id: 11,
      title: "Investment and product discount alerts",
      description: "Alex wants to stay updated on investment opportunities..."
    },
    {
      id: 12,
      title: "Cache and local AI proxies for faster responses",
      description: "Rebecca uses WalletGPT for real-time stock market analysis..."
    }
  ];
 
  constructor(private gpt: GptApiService, private renderer: Renderer2,private overlay: Overlay, private el: ElementRef, private router:Router,
    private viewContainerRef: ViewContainerRef) {
      this.chat = this.el.nativeElement.querySelector('app-chat-gpt');
      // console.log(this.el.nativeElement.querySelector('#app-chat-gpt'));
    this.form = new FormGroup({
      content: new FormControl(''),
    });
    this.form2 = new FormGroup({
      content: new FormControl(''),
    });
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e:any) {
    let scrollPosition = window.pageYOffset;
    console.log(this.chat);
    
    console.log('Scroll Position:', scrollPosition);
    if(scrollPosition>10){
      this.isScroll = true;
    } 
    else if(scrollPosition===0) {
      this.isScroll = false;
      this.scrollToElement('home');
    }
     else{
      this.isScroll = false;
    }
  }

  public isVisible: boolean = false;
  
  public show(): void {
    this.isVisible = true;
  }
  
  public hides(): void {
    this.isVisible = false;
  }


  // openPopover() {
  //   const positionStrategy = this.overlay.position().connectedTo(
  //       this.viewContainerRef.element,
  //       { originX: 'center', originY: 'top' },
  //       { overlayX: 'center', overlayY: 'bottom' }
  //     );

  //   const overlayRef = this.overlay.create(
  //     new OverlayConfig({ 
  //       hasBackdrop: true,
  //       backdropClass: 'cdk-overlay-transparent-backdrop',
  //       positionStrategy 
  //     })
  //   );

  //   const filePreviewPortal = new ComponentPortal(PopoverContentComponent);
  //   overlayRef.attach(filePreviewPortal);
  // }

  openToogle(event:boolean){
    this.isOpen = ! event; 
  }
  submit() {
    const text = this.form.controls['content'].value;
    this.discussions.push({ role: 'user', content: text });
    this.form.reset();
    this.loader = true;
    this.gpt.askQuestion(text, 'user').subscribe((res) => {
      console.log(res);
      setTimeout(() => {
        this.loader = false;
        this.discussions.push(res);
      }, 50);
    });
  }

  submit2() {
    const text = this.form2.controls['content'].value;
    this.discussions2.push({ role: 'user', content: text });
    this.form2.reset();
    this.gpt.askQuestion(text, 'user').subscribe((res) => {
      console.log(res);
      this.discussions2.push(res);
    });
  }
  scrollToElement = (id: string): void => {
    const element = document.getElementById(id);
    this.step = id;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block:'center' });
    }
    
    if (id === 'home') {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      // To enable scrolling
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  };

  ngAfterViewInit() {
    this.chat = this.el.nativeElement.querySelector('app-chat-gpt');
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

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

  ngOnInit(): void {
    this.chat = this.el.nativeElement.querySelector('app-chat-gpt');
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
}
