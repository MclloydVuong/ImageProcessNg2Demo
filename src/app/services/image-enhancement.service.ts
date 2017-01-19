import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../rxjs-operators'

@Injectable()
export class ImageEnhancementService {
  public enhancedImage$: Observable<{ enhancement: String, imageData: ImageData }>;
  private _enhancedImageObserver: any;
  private _enhancedImage: { enhancement: String, imageData: ImageData } = { enhancement: null, imageData: null };

  constructor() {
    this.enhancedImage$ = new Observable(observer => {
      this._enhancedImageObserver = observer;
    }).share();
  }

  isImage() {
    console.log(this._enhancedImage.imageData !== null ? true : false);
  }

  enhance(req) {

    switch (req.enhancement){
      case 'normal':
        this._enhancedImage = req;
        this._enhancedImageObserver.next(req);
        break;
      case 'inverse':
        this.inverse(req);
        break;
      default:
        this._enhancedImage = req;
        this._enhancedImageObserver.next(req);
    }

  }

  inverse(req) {
    for (let i = 0; i < req.imageData.data.length; i += 4) {
      req.imageData.data[i] = 255 - req.imageData.data[i];        //red
      req.imageData.data[i + 1] = 255 - req.imageData.data[i + 1];    //green
      req.imageData.data[i + 2] = 255 - req.imageData.data[i + 2];    //blue
      req.imageData.data[i + 3] = req.imageData.data[i + 3];    //alpha
    }

    this._enhancedImage = { enhancement: 'inverse', imageData: req.imageData };
    this._enhancedImageObserver.next(this._enhancedImage);
  }
  

}
