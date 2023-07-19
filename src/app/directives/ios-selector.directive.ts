import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

const easing = {
  easeOutCubic: function (pos:number) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeOutQuart: function (pos:number) {
    return -(Math.pow(pos - 1, 4) - 1);
  },
};

export interface IosSelectorOptions {
  type: string;
  count: number;
  sensitivity: number;
  source: string[];
  value: any;
  onChange: any;
}

@Directive({
  selector: '[appIosSelector]',
})
export class IosSelectorDirective implements OnInit {
  @Input('appIosSelector') options!: IosSelectorOptions;
  halfCount!: number;
  quarterCount!: number;
  a!: number;
  minV!: number;
  selected!: string;
  exceedA!: number;
  moveT!: number;
  moving!: boolean;
  itemHeight!: number;
  itemAngle!: number;
  radius!: number;
  scroll!: number;
  elems: any;
  

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    let defaults: IosSelectorOptions = {
      type: 'infinite',
      count: 20,
      sensitivity: 0.8,
      source: [],
      value: null,
      onChange: null,
    };

    this.options = Object.assign({}, defaults, this.options);
    this.options.count = this.options.count - (this.options.count % 4);
    Object.assign(this, this.options);

    this.halfCount = this.options.count / 2;
    this.quarterCount = this.options.count / 4;
    this.a = this.options.sensitivity * 10;
    this.minV = Math.sqrt(1 / this.a);
    this.selected = this.options.source[0];
    this.exceedA = 10;
    this.moveT = 0;
    this.moving = false;
    this.elems = {
      el: this.el.nativeElement,
      circleList: null,
      circleItems: null,

      highlight: null,
      highlightList: null,
      highListItems: null,
    };
    // events = {
    //   touchstart: null,
    //   touchmove: null,
    //   touchend: null,
    // };

    this.itemHeight = (this.elems.el.offsetHeight * 3) / this.options.count;
    this.itemAngle = 360 / this.options.count;
    this.radius = this.itemHeight / Math.tan((this.itemAngle * Math.PI) / 180);
    this.scroll = 0;
  }

  _create(source: string[]) {
    if (!source.length) {
      return;
    }

    // if (this.options.type === "infinite") {
    //   let concatSource = [].concat(source);
    //   while (concatSource.length < this.halfCount) {
    //     concatSource = concatSource.concat(source);
    //   }
    //   source = concatSource;
    // }
    this.options.source = source;
    let sourceLength = source.length;

    // Create DOM elements
    let selectWrapEl = this.renderer.createElement('div');
    this.renderer.addClass(selectWrapEl, 'select-wrap');

    let selectOptionsEl = this.renderer.createElement('ul');
    this.renderer.addClass(selectOptionsEl, 'select-options');
    this.renderer.setStyle(
      selectOptionsEl,
      'transform',
      `translate3d(0, 0, ${-this.radius}px) rotateX(0deg)`
    );

    let highlightEl = this.renderer.createElement('div');
    this.renderer.addClass(highlightEl, 'highlight');

    let highlightListEl = this.renderer.createElement('ul');
    this.renderer.addClass(highlightListEl, 'highlight-list');

    // Creating circleListHTML and highListHTML
    for (let i = 0; i < source.length; i++) {
      let selectOptionEl = this.renderer.createElement('li');
      this.renderer.addClass(selectOptionEl, 'select-option');
      this.renderer.setStyle(
        selectOptionEl,
        'top',
        `${this.itemHeight * -0.5}px`
      );
      this.renderer.setStyle(selectOptionEl, 'height', `${this.itemHeight}px`);
      this.renderer.setStyle(
        selectOptionEl,
        'lineHeight',
        `${this.itemHeight}px`
      );
      this.renderer.setStyle(
        selectOptionEl,
        'transform',
        `rotateX(${-this.itemAngle * i}deg) translate3d(0, 0, ${this.radius}px)`
      );
      this.renderer.setProperty(selectOptionEl, 'data-index', i);
      let selectOptionText = this.renderer.createText(source[i]);
      this.renderer.appendChild(selectOptionEl, selectOptionText);

      let highlightItemEl = this.renderer.createElement('li');
      this.renderer.addClass(highlightItemEl, 'highlight-item');
      this.renderer.setStyle(highlightItemEl, 'height', `${this.itemHeight}px`);
      let highlightItemText = this.renderer.createText(source[i]);
      this.renderer.appendChild(highlightItemEl, highlightItemText);

      this.renderer.appendChild(selectOptionsEl, selectOptionEl);
      this.renderer.appendChild(highlightListEl, highlightItemEl);
    }

    if (this.options.type === 'infinite') {
      // TODO: Handle infinite type here
      // 圆环头尾
      for (let i = 0; i < this.quarterCount; i++) {
        // 头
        let selectOptionHeadEl = this.renderer.createElement('li');
        this.renderer.addClass(selectOptionHeadEl, 'select-option');
        this.renderer.setStyle(
          selectOptionHeadEl,
          'top',
          `${this.itemHeight * -0.5}px`
        );
        this.renderer.setStyle(
          selectOptionHeadEl,
          'height',
          `${this.itemHeight}px`
        );
        this.renderer.setStyle(
          selectOptionHeadEl,
          'lineHeight',
          `${this.itemHeight}px`
        );
        this.renderer.setStyle(
          selectOptionHeadEl,
          'transform',
          `rotateX(${this.itemAngle * (i + 1)}deg) translate3d(0, 0, ${
            this.radius
          }px)`
        );
        this.renderer.setProperty(selectOptionHeadEl, 'data-index', -i - 1);
        let selectOptionHeadText = this.renderer.createText(
          source[sourceLength - i - 1]
        );
        this.renderer.appendChild(selectOptionHeadEl, selectOptionHeadText);

        // 尾
        let selectOptionTailEl = this.renderer.createElement('li');
        this.renderer.addClass(selectOptionTailEl, 'select-option');
        this.renderer.setStyle(
          selectOptionTailEl,
          'top',
          `${this.itemHeight * -0.5}px`
        );
        this.renderer.setStyle(
          selectOptionTailEl,
          'height',
          `${this.itemHeight}px`
        );
        this.renderer.setStyle(
          selectOptionTailEl,
          'lineHeight',
          `${this.itemHeight}px`
        );
        this.renderer.setStyle(
          selectOptionTailEl,
          'transform',
          `rotateX(${
            -this.itemAngle * (i + sourceLength)
          }deg) translate3d(0, 0, ${this.radius}px)`
        );
        this.renderer.setProperty(
          selectOptionTailEl,
          'data-index',
          i + sourceLength
        );
        let selectOptionTailText = this.renderer.createText(source[i]);
        this.renderer.appendChild(selectOptionTailEl, selectOptionTailText);

        this.renderer.insertBefore(
          this.elems.circleList,
          selectOptionHeadEl,
          this.elems.circleList.firstChild
        );
        this.renderer.appendChild(this.elems.circleList, selectOptionTailEl);
      }

      // 高亮头尾
      let highlightHeadEl = this.renderer.createElement('li');
      this.renderer.addClass(highlightHeadEl, 'highlight-item');
      this.renderer.setStyle(highlightHeadEl, 'height', `${this.itemHeight}px`);
      let highlightHeadText = this.renderer.createText(
        source[sourceLength - 1]
      );
      this.renderer.appendChild(highlightHeadEl, highlightHeadText);

      let highlightTailEl = this.renderer.createElement('li');
      this.renderer.addClass(highlightTailEl, 'highlight-item');
      this.renderer.setStyle(highlightTailEl, 'height', `${this.itemHeight}px`);
      let highlightTailText = this.renderer.createText(source[0]);
      this.renderer.appendChild(highlightTailEl, highlightTailText);

      this.renderer.insertBefore(
        this.elems.highlightList,
        highlightHeadEl,
        this.elems.highlightList.firstChild
      );
      this.renderer.appendChild(this.elems.highlightList, highlightTailEl);
    }

    this.renderer.appendChild(highlightEl, highlightListEl);
    this.renderer.appendChild(selectWrapEl, selectOptionsEl);
    this.renderer.appendChild(selectWrapEl, highlightEl);
    this.renderer.appendChild(this.el.nativeElement, selectWrapEl);

    // Assigning elements to this.elems
    this.elems.circleList = selectOptionsEl;
    this.elems.circleItems = selectOptionsEl.children;

    this.elems.highlight = highlightEl;
    this.elems.highlightList = highlightListEl;
    this.elems.highlightitems = highlightListEl.children;

    if (this.options.type === 'infinite') {
      this.renderer.setStyle(
        this.elems.highlightList,
        'top',
        -this.itemHeight + 'px'
      );
    }

    this.renderer.setStyle(
      this.elems.highlight,
      'height',
      this.itemHeight + 'px'
    );
    this.renderer.setStyle(
      this.elems.highlight,
      'lineHeight',
      this.itemHeight + 'px'
    );
  }

  updateSource(source: any) {
    this._create(source);

    if (!this.moving) {
        this._selectByScroll(this.scroll);
    }
}

select(value: any) {
  for (let i = 0; i < this.options.source.length; i++) {
      if (this.options.source[i] === value) {
          window.cancelAnimationFrame(this.moveT);
          let initScroll = this._normalizeScroll(this.scroll);
          let finalScroll = i;
          let t = Math.sqrt(Math.abs((finalScroll - initScroll) / this.a));
          this._animateToScroll(initScroll, finalScroll, t);
          setTimeout(() => this._selectByScroll(i));
          return;
      }
  }
  throw new Error(`can not select value: ${value}, ${value} match nothing in current source`);
}

  private _moveTo(scroll: number): number {
    if (this.options.type === "infinite") {
      scroll = this._normalizeScroll(scroll);
    }
    
    this.renderer.setStyle(this.elems.circleList, 'transform', `translate3d(0, 0, ${-this.radius}px) rotateX(${this.itemAngle * scroll}deg)`);
    this.renderer.setStyle(this.elems.highlightList, 'transform', `translate3d(0, ${-scroll * this.itemHeight}px, 0)`);
  
    this.elems.circleItems.forEach((itemElem:any) => {
      if (Math.abs(itemElem.dataset.index - scroll) > this.quarterCount) {
        this.renderer.setStyle(itemElem, 'visibility', 'hidden');
      } else {
        this.renderer.setStyle(itemElem, 'visibility', 'visible');
      }
    });
  
    return scroll;
  }
  private _selectByScroll(scroll: number): void {
    scroll = (this._normalizeScroll(scroll) | 0);
    
    if (scroll > this.options.source.length - 1) {
      scroll = this.options.source.length - 1;
      this._moveTo(scroll);
    }
    
    this._moveTo(scroll);
    this.scroll = scroll;
    this.selected = this.options.source[scroll];
    this.options.value = this.selected;
    
    if (this.options.onChange) {
      this.options.onChange.emit(this.selected);
    }
  }

  destroy() {
    this._stop();
    // Document event unbinding
    // for (let eventName in this.events) {
    //   this.elems.el.removeEventListener(eventName, this.events[eventName]);
    // }
    // document.removeEventListener("mousedown", this.events["touchstart"]);
    // document.removeEventListener("mousemove", this.events["touchmove"]);
    // document.removeEventListener("mouseup", this.events["touchend"]);
    // Element removal
    this.elems.el.innerHTML = "";
    this.elems = null;
}

  @HostListener('window:mouseup', ['$event'])
async _animateMoveByInitV(initV: any) {
    let initScroll: number;
    let finalScroll: number;
    let finalV: number;

    let totalScrollLen: number;
    let a: number;
    let t: number;

    if (this.options.type === "normal") {
        if (this.scroll < 0 || this.scroll > this.options.source.length - 1) {
            a = this.exceedA;
            initScroll = this.scroll;
            finalScroll = this.scroll < 0 ? 0 : this.options.source.length - 1;
            totalScrollLen = initScroll - finalScroll;

            t = Math.sqrt(Math.abs(totalScrollLen / a));
            initV = a * t;
            initV = this.scroll > 0 ? -initV : initV;
            finalV = 0;
            await this._animateToScroll(initScroll, finalScroll, t);
        } else {
            initScroll = this.scroll;
            a = initV > 0 ? -this.a : this.a; 
            t = Math.abs(initV / a); 
            totalScrollLen = initV * t + (a * t * t) / 2; 
            finalScroll = Math.round(this.scroll + totalScrollLen); 
            finalScroll = finalScroll < 0 ? 0 : finalScroll > this.options.source.length - 1 ? this.options.source.length - 1 : finalScroll;

            totalScrollLen = finalScroll - initScroll;
            t = Math.sqrt(Math.abs(totalScrollLen / a));
            await this._animateToScroll(this.scroll, finalScroll, t, "easeOutQuart");
        }
    } else {
        initScroll = this.scroll;
        a = initV > 0 ? -this.a : this.a; 
        t = Math.abs(initV / a); 
        totalScrollLen = initV * t + (a * t * t) / 2; 
        finalScroll = Math.round(this.scroll + totalScrollLen); 
        await this._animateToScroll(this.scroll, finalScroll, t, "easeOutQuart");
    }

    this._selectByScroll(this.scroll);
}


  private _animateToScroll(initScroll: number, finalScroll: number, t: number, easingName = 'easeOutQuart'): Promise<void> {
    if (initScroll === finalScroll || t === 0) {
      this._moveTo(initScroll);
      return Promise.resolve();
    }
  
    let start = new Date().getTime() / 1000;
    let pass = 0;
    let totalScrollLen = finalScroll - initScroll;
  
    return new Promise<void>((resolve, reject) => {
      this.moving = true;
      let tick = () => {
        pass = new Date().getTime() / 1000 - start;
  
        if (pass < t) {
          // this.scroll = this._moveTo(initScroll + easing[easingName](pass / t) * totalScrollLen);
          this.moveT = requestAnimationFrame(tick);
        } else {
          resolve();
          this._stop();
          this.scroll = this._moveTo(initScroll + totalScrollLen);
        }
      };
      tick();
    });
  }
  _stop() {
    this.moving = false;
    cancelAnimationFrame(this.moveT);
  }
  
  

  private _normalizeScroll(scroll: number): number {
    let normalizedScroll = scroll;

    while (normalizedScroll < 0) {
      normalizedScroll += this.options.source.length;
    }
    normalizedScroll = normalizedScroll % this.options.source.length;
    return normalizedScroll;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: any) {
    // your touchstart logic here
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: any) {
    // your touchmove logic here
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: any) {
    // your touchend logic here
  }
}
