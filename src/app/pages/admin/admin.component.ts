import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isOpen: boolean = false;
  consepts: any;
  X_value: any;
  Y_value: any;
  Z_value: any;
  constructor() {
    this.consepts = JSON.parse(localStorage.getItem('consepts') as string);
    this.X_value = localStorage.getItem('x_value');
    this.Y_value = localStorage.getItem('y_value');
    this.Z_value = localStorage.getItem('z_value');
  }
  ngOnInit(): void {
    this.consepts = JSON.parse(localStorage.getItem('consepts') as string);
    this.X_value = localStorage.getItem('x_value');
    this.Y_value = localStorage.getItem('y_value');
    this.Z_value = localStorage.getItem('z_value');
  }

  xValue1: string = '';
  yValue1: string = '';
  zValue1: string = '';
  arrx: Array<string> = [];
  arry: Array<string> = [];
  arrz: Array<string> = [];
  setValuex(event: any) {
    this.xValue1 = event.target.value;
    this.arrx = this.xValue1.split(',');
    localStorage.setItem('x_value',this.xValue1);
  }
  setValuey(event: any) {
    this.yValue1 = event.target.value;
    this.arry = this.yValue1.split(',');
    localStorage.setItem('y_value',this.yValue1);
  }
  setValuez(event: any) {
    this.zValue1 = event.target.value;
    this.arrz = this.zValue1.split(',');
    localStorage.setItem('z_value',this.zValue1);
  }

  // Create a new list item when clicking on the "Add" button
  newElementx() {
    // const xul: any = document.getElementById("admin-x__UL");
    let temp = document.getElementById('admin-x__UL');
    this.arrx.map((item) => {
      const newLi = document.createElement('li');
      newLi.innerHTML = item;
      newLi.style.padding = '20px';
      newLi.style.fontSize = '20px';
      newLi.style.backgroundColor = '#cccccc';
      newLi.style.borderBottom = '1px solid grey';

      temp?.appendChild(newLi);
    });
  }
  newElementy() {
    // const xul: any = document.getElementById("admin-x__UL");
    let temp = document.getElementById('admin-y__UL');
    this.arry.map((item) => {
      const newLi = document.createElement('li');
      newLi.innerHTML = item;
      newLi.style.padding = '20px';
      newLi.style.fontSize = '20px';
      newLi.style.backgroundColor = '#cccccc';
      newLi.style.borderBottom = '1px solid grey';

      temp?.appendChild(newLi);
    });
  }
  newElementz() {
    // const xul: any = document.getElementById("admin-x__UL");
    let temp = document.getElementById('admin-z__UL');
    this.arrz.map((item) => {
      const newLi = document.createElement('li');
      newLi.innerHTML = item;
      newLi.style.padding = '20px';
      newLi.style.fontSize = '20px';
      newLi.style.backgroundColor = '#cccccc';
      newLi.style.borderBottom = '1px solid grey';

      temp?.appendChild(newLi);
    });
  }
}
