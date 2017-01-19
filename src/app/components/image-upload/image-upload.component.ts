import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements AfterViewInit {

  // private filesToUpload: Array<File>;
  imageFile: File;
  uploadUrl = "http://localhost:3000/upload";
  imageSelected = false;
  enhancedSelected = false;
  image = new Image();
  setEnhancement = 'normal';
  canvas;
  context: CanvasRenderingContext2D;

  @ViewChild("eCanvas") eCanvas: ElementRef;
  @ViewChild('uploadedImage') origImage: ElementRef;


  enhancements = [
    { value: 'normal', viewValue: 'Normal' },
    { value: 'blue-tint', viewValue: 'Blue' },
    { value: 'upside-down', viewValue: 'Upside Down' }
  ];

  constructor() { }

  ngAfterViewInit() {
    this.canvas = this.eCanvas.nativeElement;
    this.context = this.canvas.getContext("2d");
  }

  onEnhance() {
    this.reSize();
    // let oc = document.createElement('canvas'),
    //   octx = oc.getContext('2d');

    // oc.width = this.image.width * 0.5;
    // oc.height = this.image.height * 0.5;

    // octx.drawImage(this.image, 0, 0, oc.width, oc.height);
    // octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
    // this.context.drawImage(this.image, 0, 0, oc.width, oc.height,
    //               0, 0, this.canvas.width,   this.canvas.height);
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
  }

  reSize() {
    this.eCanvas.nativeElement.width = this.origImage.nativeElement.clientWidth;
    this.eCanvas.nativeElement.height = this.origImage.nativeElement.clientHeight; 
    console.log("origW:" + this.origImage.nativeElement.clientWidth);
    console.log("origH:" + this.origImage.nativeElement.clientHeight);
    console.log("canW:" + this.eCanvas.nativeElement.width);
    console.log("canH:" + this.eCanvas.nativeElement.height);

  }

  fileChangeEvent(fileInput: any) {
    //this.filesToUpload = <Array<File>> fileInput.target.files;
    this.imageFile = fileInput.target.files[0];
  }

  onSave() {
    if (this.imageFile !== undefined) {
      let reader: FileReader = new FileReader();
      reader.onloadend = (e) => {
        this.image.src = reader.result;
        this.imageSelected = true;
      }
      reader.readAsDataURL(this.imageFile);
    } else {
      console.log("please select an image");
    }

  }

}
