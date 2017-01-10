import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  // private filesToUpload: Array<File>;
  imageFile: File;
  uploadUrl = "http://localhost:3000/upload";
  imageSelected = false;
  image;
  setEnhancement = 'normal';

  enhancements = [
    {value: 'normal', viewValue: 'Normal'},
    {value: 'blue-tint', viewValue: 'Blue'},
    {value: 'upside-down', viewValue: 'Upside Down'}
  ];

  constructor() { }

  ngOnInit() {
  }

  fileChangeEvent(fileInput: any) {
    //this.filesToUpload = <Array<File>> fileInput.target.files;
    this.imageFile = fileInput.target.files[0];
  }

  //Saves images to localstroage
  onSave() {
    if (this.imageFile !== undefined) {
      console.log("attempting to save...");
      console.log(this.imageFile);
      let reader:FileReader = new FileReader();
      reader.onloadend = (e) => {
        this.image = reader.result;
      }
      reader.readAsDataURL(this.imageFile);
      this.imageSelected = true;
    }else{
      console.log("please select an image");
    }


  }

  // uploadPhoto() {
  //   if (this.filesToUpload !== undefined) {
  //     console.log("uploading file");
  //     this.uploadService.upload(this.filesToUpload)
  //       .subscribe(
  //         data => {
  //           console.log(data)
  //         },
  //         err => {
  //           console.log(err)
  //         },
  //         () => {
  //           console.log("upload complete");
  //         }
  //       );
  //   }else{
  //     console.log("Please select a file");
  //   }
  // }

  // onUpload() {
  //   this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then((result) => {
  //     console.log(result);
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }

  // makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
  //   return new Promise((resolve, reject) => {
  //     var formData: any = new FormData();
  //     var xhr = new XMLHttpRequest();
  //     for (var i = 0; i < files.length; i++) {
  //       formData.append("abc", files[i], files[i].name);
  //     }
  //     xhr.onreadystatechange = function () {
  //       if (xhr.readyState == 4) {
  //         if (xhr.status == 200) {
  //           resolve(JSON.parse(xhr.response));
  //         } else {
  //           reject(xhr.response);
  //         }
  //       }
  //     }
  //     xhr.open("POST", url, true);
  //     xhr.send(formData);
  //   });
  // }

}
