import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { UploadService } from '../../services/index';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit, OnInit{
  @ViewChild('hiddenUpload') hiddenUpload: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  private imageFile: File;
  private imageList= [];
  private imageProcessedList= [];
  public selectedImage= {};
  private isSidenav: Boolean;

  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
    this.isSidenav = true;
    this.uploadService.imageCollection$.subscribe(imageList => {
      this.imageList = imageList;
    });

    this.uploadService.processedCollection$.subscribe(processedList => {
      this.imageProcessedList = processedList;
    });

    this.uploadService.syncImageList('original');
    this.uploadService.syncImageList('processed');
  }

  ngAfterViewInit() { }
  
  sidenavToggle() {
    this.isSidenav = !this.isSidenav;
  }

  selectFile(){
    this.hiddenUpload.nativeElement.click();
  }

  fileSelectedEvent(fileInput: File){
    console.log(fileInput);
    this.uploadService.addImage(fileInput);
  }

  selectImage(image: any) {
    this.selectedImage = image;
  }

  deleteImage(image: any) {
    this.uploadService.deleteImage(image);
  }

  onDownload(image) {
    this.downloadLink.nativeElement.href = image.src;
    this.downloadLink.nativeElement.download = image.filename;
    this.downloadLink.nativeElement.click();
  }

}
