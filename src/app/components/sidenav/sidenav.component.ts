import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { UploadService } from '../../services/index';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit, OnInit{
  @ViewChild('hiddenUpload') hiddenUpload: ElementRef;
  private imageFile: File;
  private imageList= [];
  public selectedImage= {};

  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
    this.uploadService.imageCollection$.subscribe(imageList => {
      this.imageList = imageList;
    });

    this.uploadService.getImages();
  }

  ngAfterViewInit() { }
  
  selectFile(){
    this.hiddenUpload.nativeElement.click();
  }

  fileSelectedEvent(fileInput: File){
    this.uploadService.addImage(fileInput);
    // this.uploadService.upload(fileInput)
    //   .subscribe(
    //     data => {
    //       console.log("data: " + JSON.stringify(data, null, 2));
    //     },
    //     err => {
    //       console.log("err: " + JSON.stringify(err, null, 2));
    //     },
    //     () => {
    //       console.log("upload complete");
    //     }
    //   )
  }

  selectImage(image: any) {
    this.selectedImage = image;
  }

}
