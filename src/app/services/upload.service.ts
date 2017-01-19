import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../rxjs-operators'

@Injectable()
export class UploadService {
  private uploadUrl = "http://localhost:3000/upload";
  public imageCollection$: Observable<Array<Object>>;
  private _imageCollectionObserver: any;
  private _imageCollection: Array<Object>;


  constructor() {
    this._imageCollection = new Array<Object>();
    this.imageCollection$ = new Observable(observer => {
      this._imageCollectionObserver = observer;
    }).share();
  }

  upload(file: File): Observable<Object> {
    return Observable.create(observer => {
      let formData: FormData = new FormData();
      let xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append("imageFile", file, file.name);

      xhr.onreadystatechange = () => xhrCheckStatus();

      xhr.open('POST', this.uploadUrl, true);
      xhr.send(formData);

      function xhrCheckStatus() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      }
    })

  }

  saveToLocal(filename, file) {
    localStorage.setItem(filename, file);
  }

  addImage(file: File) {
    this.getBase64(file, (result) => {
      this._imageCollection.push({filename: file.name, src: result});
      this._imageCollectionObserver.next(this._imageCollection);
    })
  }

  getImages(){
    this._imageCollectionObserver.next(this._imageCollection);
  }

  getBase64(file: File, callback) {
    let reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

}
