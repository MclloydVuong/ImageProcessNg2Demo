import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, DoCheck } from '@angular/core';
import { ImageEnhancementService } from '../../services/index';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css'],
  providers: [ImageEnhancementService]
})
export class ImageViewComponent implements OnInit, AfterViewInit, DoCheck {
  @Input('src') source: String;
  @Input('name') imageName: String;
  @ViewChild('originalImage') originalImage: ElementRef;
  @ViewChild('enhancedImage') enhancedImage: ElementRef;
  @ViewChild('enhancementSelect') enhancementSelect: ElementRef;
  @ViewChild('saveFileName') saveFileName: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private canvasDimensions: { width: Number, height: Number };
  private oldSource: String = this.source;
  private image: any;
  private isImageSelected: Boolean;
  private enhancements: Array<Object>;
  private enhancedImageData: any;

  constructor(private imageEnhancementService: ImageEnhancementService) { }

  ngAfterViewInit() {

  }

  ngDoCheck() {
    if (this.oldSource !== this.source) {
      this.resizeCanvas();
      this.image.src = this.source;
      this.isImageSelected = true;
      this.image.onload = () => {
        this.drawCanvas(this.context, this.image);
        this.oldSource = this.source;
      }
    }
  }

  ngOnInit() {
    this.imageEnhancementService.enhancedImage$.subscribe(data => {
      this.enhancedImageData = data;
    });
    this.isImageSelected = false;
    this.enhancements = [
      { value: 'normal', viewValue: 'Normal' },
      { value: 'inverse', viewValue: 'Inverse' },
      { value: 'greyscale', viewValue: 'Grey Scale' },
      { value: 'edge-detection', viewValue: 'Edge Detection' }
      ,
    ]
    this.canvas = this.enhancedImage.nativeElement;
    this.context = this.canvas.getContext("2d");
    this.resizeCanvas();
    this.image = new Image();
    this.image.onload = this.drawCanvas(this.context, this.image);
    this.image.src = this.source;
  }

  resizeCanvas() {
    this.canvasDimensions = {
      width: this.originalImage.nativeElement.clientWidth !== undefined ?
        this.originalImage.nativeElement.clientWidth : 300,
      height: this.originalImage.nativeElement.clientHeight !== undefined ?
        this.originalImage.nativeElement.clientHeight : 300,
    }
  }

  drawCanvas(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
  }

  onEnhance(enhanceChoice) {
    if (enhanceChoice === 'normal') {
      this.drawCanvas(this.context, this.image)
    } else {
      let width = this.context.canvas.width;
      let height = this.context.canvas.height;
      var imageData = this.context.getImageData(0, 0, width, height);
      this.imageEnhancementService.enhance({ enhancement: enhanceChoice, imageData: imageData, width: width, height: height })
      this.context.putImageData(this.enhancedImageData.imageData, 0, 0);
    }
  }

  onSaveAs() {
    this.downloadLink.nativeElement.href = this.enhancedImage.nativeElement.toDataURL();
    this.downloadLink.nativeElement.download = this.saveFileName.nativeElement.value;
    this.downloadLink.nativeElement.click();
  }

}
