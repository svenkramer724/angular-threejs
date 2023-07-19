import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WebGLRenderer } from 'three';

export class Cube {
  scene: any;
  camera: any;
  renderer: any;
  CONSEPTS: any;
  allCubes: any;
  dimensions: any;
  cubeSize: any;
  spacing: any;
  isMouseMove: any;
  selectedObj: any;
  textIndex: any;
  currentLayer: any;
  layerBtn: any;
  count: any;
  prevMovement: any;
  controls: any;
  raycaster: any;
  mouse: any;
  constructor(element: any, layerBtn: any) {
    // Create a scene
    this.scene = new THREE.Scene();

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(-30, 30, 30);

    // Create a renderer
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(200, 200);
    this.renderer.setClearColor(0xffffff);

    element.appendChild(this.renderer.domElement);

    // // Initialized variables
    const X = [
      'Buy and Hold',
      'Technical Analysis',
      'Fundamental Analysis',
      'Passive Investing - robo traders',
      'Contrarian Investing',
    ];
    const Y = [
      'Stocks',
      'Bonds',
      'Commodities',
      'Real Estate',
      'Cryptocurrencies',
    ];
    const Z = ['More than 10 years', 'Years', 'Months', 'Week', 'Intraday'];
    if (
      !localStorage.getItem('x_value') ||
      !localStorage.getItem('y_value') ||
      !localStorage.getItem('z_value')
    ) {
      localStorage.setItem('x_value', X.join())
      localStorage.setItem('y_value', Y.join())
      localStorage.setItem('z_value', Z.join())
      this.CONSEPTS = {
        X: [
          'Buy and Hold',
          'Technical Analysis',
          'Fundamental Analysis',
          'Passive Investing - robo traders',
          'Contrarian Investing',
        ],
        Y: [
          'Stocks',
          'Bonds',
          'Commodities',
          'Real Estate',
          'Cryptocurrencies',
        ],
        Z: ['More than 10 years', 'Years', 'Months', 'Week', 'Intraday'],
      };

    }
    this.CONSEPTS = {
      X: localStorage.getItem('x_value')?.split(','),
      Y: localStorage.getItem('y_value')?.split(','),
      Z: localStorage.getItem('z_value')?.split(','),
    };

    this.allCubes = [];
    this.dimensions = 5;
    this.cubeSize = window.innerWidth > 600 ? 5 : 3;
    this.spacing = 0.5;

    this.isMouseMove = false;
    this.selectedObj = null;

    this.textIndex = 0;

    this.currentLayer = 2;
    this.layerBtn = layerBtn;
    this.count = 0;
    this.prevMovement = -1;

    // Add OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;

    // Create a raycaster
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Add Cubes
    let positionOffset = (this.dimensions - 1) / 2;
    let increment = this.cubeSize + this.spacing;
    for (let i = 0; i < this.dimensions; i++) {
      for (let j = 0; j < this.dimensions; j++) {
        for (let k = 0; k < this.dimensions; k++) {
          let x = (i - positionOffset) * increment,
            y = (j - positionOffset) * increment,
            z = (k - positionOffset) * increment;

          this.newCube(x, y, z, { X: i, Y: j, Z: k });
        }
      }
    }

    // Add EventListener
    window.addEventListener('wheel', this.onWheel.bind(this), false);
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    this.layerBtn
      .querySelector('.rubik-layerBtn__hide')
      .addEventListener('click', this.hideLayer.bind(this), false);
    this.layerBtn
      .querySelector('.rubik-layerBtn__show')
      .addEventListener('click', this.showLayer.bind(this), false);

    this.animate();

    // setInterval(() => {
    //   this.changeText();
    // }, 500);
  }

  newCube(x: any, y: any, z: any, dims: any) {
    const cubeGeometry = new THREE.BoxGeometry(
      this.cubeSize,
      this.cubeSize,
      this.cubeSize
    );

    const axes = ['Y', 'Z', 'X'];

    const promptTexts = [];
    for (let i = 0; i < 3; i++) {
      promptTexts.push(this.CONSEPTS[axes[i]][dims[axes[i]]]);
    }

    let cubeMaterials = this.generateTexture(promptTexts[0]);

    const cube: any = new THREE.Mesh(cubeGeometry, cubeMaterials);
    cube.castShadow = true;

    cube.position.set(x, y, z);

    cube.userData.scale = 1;
    cube.userData.initPosition = cube.position.clone();
    cube.userData.dimensions = dims;
    cube.userData.prompt = promptTexts;
    cube.userData.type = 'SUBCUBE';
    cube.userData.material = [cubeMaterials];

    this.scene.add(cube);
    this.allCubes.push(cube);
  }

  generateTexture(text: any) {
    const canvases = [];
    const bgColors = ['#C4C4C4', '#6D278E', '#FFFFFF'];
    const textColors = ['#6D278E', '#FFFFFF', '#6D278E'];
    const axes = ['Y', 'Z', 'X'];

    for (let i = 0; i < 3; i++) {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      // Get the 2D rendering context of the canvas
      const context: any = canvas.getContext('2d');
      // Set background color
      context.fillStyle = bgColors[i];
      context.fillRect(0, 0, canvas.width, canvas.height);
      // Set the font style
      let fontSize = 30;
      context.font = `${fontSize}px Arial`;
      // Set the maximum text width
      const maxWidth = canvas.width;
      // Split the text into words
      const words = text.split(' ');
      // Create an array to hold the lines of text
      const lines = [];
      // Set the initial line
      let line = words[0];
      // Loop through each word starting from the second word
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const lineWithWord = line + ' ' + word;
        const lineWidth = context.measureText(lineWithWord).width;
        // Check if the line with the new word exceeds the maximum width
        if (lineWidth > maxWidth) {
          // Add the current line to the lines array
          lines.push(line);
          // Start a new line with the current word
          line = word;
        } else {
          // Add the word to the current line
          line = lineWithWord;
        }
      }
      // Add the last line to the lines array
      lines.push(line);

      let maxLengthText = '';
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > maxLengthText.length) {
          maxLengthText = lines[i];
        }
      }

      // Set the initial text width
      let textWidth = context.measureText(maxLengthText).width;

      // Reduce the font size until the text fits within the canvas width
      while (textWidth > maxWidth && fontSize > 0) {
        fontSize--;
        context.font = `${fontSize}px Arial`;
        textWidth = context.measureText(maxLengthText).width;
      }

      // Set the initial y position
      let y = (canvas.height - fontSize * lines.length) / 2 + fontSize / 2;
      // Loop through each line and draw it on the canvas
      context.fillStyle = textColors[i];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const textWidth = context.measureText(line).width;
        // Calculate the x position to center the text
        const x = (canvas.width - textWidth) / 2;
        context.fillText(line, x, y);
        // Update the y position
        y += fontSize;
      }

      // Create a texture
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;

      // Create a material using the texture
      const material = new THREE.MeshBasicMaterial({ map: texture });

      canvases.push(material);
      canvases.push(material);
    }

    return canvases;
  }

  changeConcepts(concepts: any) {
    this.CONSEPTS = concepts;
  }

  changeText() {
    const axes: any = ['Y', 'Z', 'X'];

    for (const cube of this.allCubes) {
      if (
        cube.userData.material[this.textIndex] === undefined ||
        cube.userData.prompt[this.textIndex] !==
          this.CONSEPTS[axes[this.textIndex]][
            cube.dimensions[axes[this.textIndex]]
          ]
      ) {
        cube.userData.prompt[this.textIndex] =
          this.CONSEPTS[axes[this.textIndex]][
            cube.dimensions[axes[this.textIndex]]
          ];
        const cubeMaterials = this.generateTexture(
          cube.userData.prompt[this.textIndex]
        );
        cube.userData.material[this.textIndex] = cubeMaterials;
      }

      cube.material = cube.userData.material[this.textIndex];
      cube.material.needsUpdate = true;
    }
    this.textIndex = (this.textIndex + 1) % 3;
  }

  hideLayer() {
    if (this.currentLayer > 0) {
      //Math.max(...Object.values(cube.userData.dimensions)) == this.currentLayer) {

      for (const cube of this.allCubes) {
        if (Math.abs(cube.userData.dimensions['X'] - 2) == this.currentLayer) {
          this.scene.remove(cube);
        } else if (
          Math.abs(cube.userData.dimensions['Y'] - 2) == this.currentLayer
        ) {
          this.scene.remove(cube);
        } else if (
          Math.abs(cube.userData.dimensions['Z'] - 2) == this.currentLayer
        ) {
          this.scene.remove(cube);
        }
      }

      this.currentLayer--;
    }
  }

  showLayer() {
    if (this.currentLayer < 2) {
      //Math.max(...Object.values(cube.userData.dimensions)) == this.currentLayer) {
      let objValue: any = [];
      this.currentLayer++;

      for (const cube of this.allCubes) {
        objValue = Object.values(cube.userData.dimensions);
        if (
          Math.max(...objValue) <= 2 + this.currentLayer &&
          Math.min(...objValue) >= 2 - this.currentLayer
        ) {
          if (
            Math.abs(cube.userData.dimensions['X'] - 2) == this.currentLayer
          ) {
            this.scene.add(cube);
          } else if (
            Math.abs(cube.userData.dimensions['Y'] - 2) == this.currentLayer
          ) {
            this.scene.add(cube);
          } else if (
            Math.abs(cube.userData.dimensions['Z'] - 2) == this.currentLayer
          ) {
            this.scene.add(cube);
          }
        }
      }
    }
  }

  splitIntoSpace(delta: any) {
    for (const cube of this.allCubes) {
      if (delta > 0) {
        if (Math.abs(cube.userData.scale - 1) < 0.02) return;
        cube.userData.scale -= 0.02;
      } else if (delta < 0) {
        if (Math.abs(cube.userData.scale - 2) < 0.02) return;
        cube.userData.scale += 0.02;
      }

      cube.position.copy(
        cube.userData.initPosition.clone().multiplyScalar(cube.userData.scale)
      );
    }

    if (delta > 0) {
      // Scrolling down
      for (const cube of this.allCubes) {
        cube.userData.scale -= 0.01;
      }
    } else if (delta < 0) {
      // Scrolling up
      for (const cube of this.allCubes) {
        cube.userData.scale += 0.01;
        cube.position.copy(
          cube.userData.initPosition.clone().multiplyScalar(cube.userData.scale)
        );
      }
    }
  }

  untilParent(parent: any, obj: any) {
    let flag = false;

    while (true) {
      if (obj == parent) {
        flag = true;
        break;
      } else if (obj == null) break;
      else obj = obj.parentElement;
    }

    return flag;
  }

  onWheel(event: any) {
    this.splitIntoSpace(event.deltaY);
  }

  onMouseDown(event: any) {
    this.isMouseMove = false;
  }

  onMouseMove(event: any) {
    // if()
    this.isMouseMove = true;

    // console.log(this.prevMovement * event.movementX, "====", this.count)
    if (this.prevMovement * event.movementX > 0) {
      this.count++;
    }
    this.prevMovement = event.movementX;

    // Calculate mouse position in normalized device coordinates

    // const temp : any = document.getElementsByClassName('rubik')[0];
    // console.log(event, window.innerHeight, window.innerWidth, temp.style.width)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // this.mouse.x = (event.clientX / temp.style.width) * 2 - 1;
    // this.mouse.y = -(event.clientY / temp.style.height) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);
    // Calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects.length > 0) {
      if (intersects[0].object.userData.type === 'SUBCUBE') {
        this.selectedObj = intersects[0].object;

        if (!this.untilParent(this.layerBtn, event.target)) {
          if (this.count > 5) {
            if (event.movementX < 0) {
              this.layerBtn.style.left = `${event.clientX + 5}px`;
              this.layerBtn.style.top = `${event.clientY + 5}px`;
            } else {
              this.layerBtn.style.left = `${
                event.clientX - this.layerBtn.offsetWidth + 5
              }px`;
              this.layerBtn.style.top = `${event.clientY + 5}px`;
            }
            this.count = 0;
          }
        }
      }
    } else {
      if (!this.untilParent(this.layerBtn, event.target)) {
        this.layerBtn.style.left = `${window.innerWidth}px`;
        this.layerBtn.style.top = `${window.innerHeight}px`;
      }
    }
  }

  onMouseHover(event: any) {
    if (this.isMouseMove) {
      this.isMouseMove = false;

      return;
    }

    if (this.selectedObj && !this.untilParent(this.layerBtn, event.target)) {
      this.onCubeClick(this.selectedObj);
    }

    this.selectedObj = null;
  }

  onMouseUp(event: any) {
    console.log(window.innerWidth - event.clientX, event.clientY);

    if (
      localStorage.getItem('zoom') === 'false' &&
      (window.innerWidth - event.clientX > 200 || event.clientY > 260)
    ) {
      return;
    }

    console.log('Yes');

    if (this.isMouseMove) {
      this.isMouseMove = false;

      return;
    }

    if (this.selectedObj && !this.untilParent(this.layerBtn, event.target)) {
      this.onCubeClick(this.selectedObj);
    }

    this.selectedObj = null;
  }

  onCubeClick(cube: any) {
    console.log('You clicked the cube!');

    const { X, Y, Z } = cube.userData.dimensions;
    const promptText = cube.userData.prompt;

    console.log('Axis: ', [X, Y, Z]);
    console.log('prompt: ', promptText);

    const zoomstatus: any = localStorage.getItem('zoom');
    if (zoomstatus === 'true') {
      localStorage.setItem('zoom', 'false');
      this.renderer.setSize(200, 200);
      this.renderer.setClearColor(0xffffff);

      const temp: any = document.getElementsByClassName('rubik')[0];
      temp.style.width = '200px';
      temp.style.height = '200px';
      // console.log(temp);
      // alert(
      //   `X: ${cube.userData.dimensions['X'] + 1}, Y: ${
      //     cube.userData.dimensions['Y'] + 1
      //   }, Z: ${cube.userData.dimensions['Z'] + 1}\n${promptText.join(' | ')}`
      // );

      localStorage.setItem('text', promptText.join(','));

      const textElement = document.getElementById(
        'custom-text'
      ) as HTMLElement;
      textElement.innerHTML = "" + (cube.userData.dimensions['X'] + 1) + (cube.userData.dimensions['Y'] + 1) +(cube.userData.dimensions['Z'] + 1) + "-" + promptText;

      const inputElement = document.getElementById(
        'custom-input'
      ) as HTMLInputElement;
      inputElement.value = promptText;

      const submitBtn = document.getElementById('submit_button') as HTMLElement;
      submitBtn.click();

      localStorage.setItem('text','');


      // const tempLayer: any = document.getElementsByClassName('rubik-layerBtn')[0];
      // tempLayer.style.display = 'none';
    } else {
      localStorage.setItem('zoom', 'true');
      const temp: any = document.getElementsByClassName('rubik')[0];
      temp.style.width = '100vw';
      temp.style.height = '100vh';
      console.log(temp);

      // const tempLayer: any = document.getElementsByClassName('rubik-layerBtn')[0];
      // tempLayer.style.display = 'none';

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.controls.update(); // Update OrbitControls

    this.renderer.render(this.scene, this.camera);
  }
}
