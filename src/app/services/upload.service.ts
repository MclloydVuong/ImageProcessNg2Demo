import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ImageModel } from '../models/index';
import '../rxjs-operators'

@Injectable()
export class UploadService {
  private uploadOriginalUrl = "http://http://vps365877.ovh.net/upload_original";
  private uploadProcessedUrl = "http://http://vps365877.ovh.net/upload_processed";
  private imagesUrl = "http://http://vps365877.ovh.net/image";
  private imageListUrl = "http://http://vps365877.ovh.net/image_list";
  // private uploadOriginalUrl = "http://localhost:3000/upload_original";
  // private uploadProcessedUrl = "http://localhost:3000/upload_processed";
  // private imagesUrl = "http://localhost:3000/image";
  // private imageListUrl = "http://localhost:3000/image_list";
  public imageCollection$: Observable<Array<Object>>;
  private _imageCollectionObserver: any;
  private _imageCollection: Array<Object>;
  public processedCollection$: Observable<Array<Object>>;
  private _processedCollectionObserver: any;
  private _processedCollection: Array<Object>;

  constructor(private http: Http) {
    this._imageCollection = new Array<Object>();
    this.imageCollection$ = new Observable(observer => {
      this._imageCollectionObserver = observer;
    }).share();
    this._processedCollection = new Array<Object>();
    this.processedCollection$ = new Observable(observer => {
      this._processedCollectionObserver = observer;
    }).share();
  }

  upload(file: File, dest: String): Observable<Object> {
    return Observable.create(observer => {
      let formData: FormData = new FormData();
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      let destination;

      if (dest === 'original') {
        destination = this.uploadOriginalUrl;
      }
      else if (dest === 'processed') {
        destination = this.uploadProcessedUrl;
      }

      formData.append("imageFile", file, file.name);
      xhr.onreadystatechange = () => xhrCheckStatus();
      xhr.open('POST', destination, true);
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

  addImage(file: File) {
    this.getBase64(file, (result) => {
      this._imageCollection.push({ filename: file.name, src: result, type: 'original' });
      this._imageCollectionObserver.next(this._imageCollection);
    })
    this.upload(file, 'original')
      .subscribe(
      data => {
        console.log("data: " + JSON.stringify(data, null, 2));
      },
      err => {
        console.log("err: " + JSON.stringify(err, null, 2));
      },
      () => {
        console.log("upload complete");
      }
      )
  }

  uploadProcessedImage(blob: Blob, filename: String) {
    let b: any = blob
    b.lastModifiedDate = new Date();
    b.name = filename;
    this.getBase64(blob, (result) => {
      this._processedCollection.push({ filename: filename, src: result, type: 'processed' });
      this._processedCollectionObserver.next(this._processedCollection);
    })
    this.upload(<File>blob, 'processed')
      .subscribe(
      data => {
        console.log("data: " + JSON.stringify(data, null, 2));
      },
      err => {
        console.log("err: " + JSON.stringify(err, null, 2));
      },
      () => {
        console.log("upload complete");
      }
      )
  }

  syncImageList(choice: String) {
    let collection;
    if (choice == 'original') {
      collection = this._imageCollection;
    }
    else if (choice == 'processed') {
      collection = this._processedCollection;
    }

    this.getServerImageList(choice)
      .then(list => {
        for (let item of list) {
          if (collection.indexOf(item) == -1) {
            this.updateImageCollection(item, choice);
          }
        }
      });
  }

  getServerImageList(choice: String): Promise<Array<String>> {
    return this.http.get(`${this.imageListUrl}?option=${choice}`)
      .toPromise()
      .then(res => res.json())
      .catch(err => Promise.reject(err))
  }

  updateImageCollection(imageName, type) {
    let source = `${this.imagesUrl}?id=${imageName}&option=${type}`;
    if (type == 'original') {
      this._imageCollection.push({ filename: imageName, src: source, type: 'original' });
      this._imageCollectionObserver.next(this._imageCollection);
    }
    else if (type == 'processed') {
      this._processedCollection.push({ filename: imageName, src: source, type: 'processed' });
      this._processedCollectionObserver.next(this._processedCollection);
    }

  }

  getBase64(file: any, callback) {
    let reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  deleteImage(image: any) {
    let delIndex = ((image.type == 'original') ? this._imageCollection : this._processedCollection).indexOf(image);
    if (delIndex > -1) {
      ((image.type == 'original') ? this._imageCollection : this._processedCollection).splice(delIndex, 1);
      ((image.type == 'original') ? this._imageCollectionObserver : this._processedCollectionObserver).next((image.type == 'original') ? this._imageCollection : this._processedCollection);
      this.deleteImgOnServer(image).subscribe(
        res => console.log('deleted: ' + image.filename),
        err => console.log('failed to delete: ' + image.filename)
      )
    } else {
      throw new Error('Could not find image in collection');
    }
  }

  deleteImgOnServer(image) {
    console.log(image)
    return this.http.delete(`${this.imagesUrl}?id=${image.filename}&option=${image.type}`)
      .map((res: Response) => console.log(res))
      .catch((error: any) => Observable.throw(error.json))
  }

}
