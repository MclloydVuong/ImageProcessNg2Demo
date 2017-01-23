import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../rxjs-operators'

@Injectable()
export class ImageEnhancementService {
  public enhancedImage$: Observable<{ enhancement: String, imageData: ImageData }>;
  private _enhancedImageObserver: any;
  private _enhancedImage: { enhancement: String, imageData: ImageData, width: Number, height: Number } = { enhancement: null, imageData: null, width: null, height: null };

  constructor() {
    this.enhancedImage$ = new Observable(observer => {
      this._enhancedImageObserver = observer;
    }).share();
  }

  isImage() {
    console.log(this._enhancedImage.imageData !== null ? true : false);
  }

  enhance(req) {

    switch (req.enhancement) {
      case 'normal':
        this._enhancedImage = req;
        this._enhancedImageObserver.next(req);
        break;
      case 'inverse':
        this.inverse(req);
        break;
      case 'greyscale':
        this.greyscale(req);
        break;
      case 'edge-detection':
        this.edgeDetectionSobel(req);
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

    this._enhancedImage = req;
    this._enhancedImageObserver.next(this._enhancedImage);
  }

  greyscale(req, callback?) {
    for (let i = 0; i < req.imageData.data.length; i += 4) {
      let avg = (req.imageData.data[i] + req.imageData.data[i + 1] + req.imageData.data[i + 2]) / 3;
      req.imageData.data[i] = avg; // red
      req.imageData.data[i + 1] = avg; // green
      req.imageData.data[i + 2] = avg; // blue
    }

    if (req.enhancement === 'greyscale') {
      this._enhancedImage = req;
      this._enhancedImageObserver.next(this._enhancedImage);
    } else if (callback === undefined) {
      throw new Error("callback is undefined");
    } else {
      callback(req);
    }
  }

  /**
   * Function: edgeDetectionSobel
   * Desciption: Edge detection using Sobel Masks
   * Parameter(s): {enhacementType:String, imageData: ImageData}
   * Return: {enhacementType:String, imageData: ImageData}
   **/

  edgeDetectionSobel(req) {
    let masks = {
      mask0: [
        1, 2, 1,
        0, 0, 0,
        -1, -2, -1
      ],
      mask1: [
        2, 1, 0,
        1, 0, -1,
        0, -1, -2
      ],
      mask2: [
        1, 0, -1,
        2, 0, -2,
        1, 0, -1
      ],
      mask3: [
        0, -1, -2,
        1, 0, -1,
        2, 1, 0
      ],
      mask4: [
        -1, -2, -1,
        0, 0, 0,
        1, 2, 1
      ],
      mask5: [
        -2, -1, 0,
        -1, 0, 1,
        0, 1, 2
      ],
      mask6: [
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
      ],
      mask7: [
        0, 1, 2,
        -1, 0, 1,
        -2, -1, 0
      ]
    }
    let outImgData = new ImageData(req.imageData.width, req.imageData.height);
    //greyscale 
    this.greyscale(req, (greyImgData) => {
      //perform convolution
      let min = 0;
      let max = 255;
      let w = req.imageData.width * 4;
      let h = req.imageData.height;

      for (let i = 0; i < greyImgData.imageData.data.length; i += 4) {
        if (!isImgEdge(i, w, h)) {
          for (let mask in masks) {
            let currentmask = masks[mask];
            let focusArea = [i - w - 4, i - w, i - w + 4, i - 4, i, i + 4, i + w - 4, i + w, i + w + 4]
            let sum = 0;

            for (let j = 0; j < focusArea.length; j++) {
              sum = sum + greyImgData.imageData.data[focusArea[j]] * currentmask[j];
            }

            if (sum > max) {
              sum = max;
            }
            else if (sum < min) {
              sum = min;
            }

            if (sum > outImgData.data[i]) {
              outImgData.data[i] = sum;
              outImgData.data[i + 1] = sum;
              outImgData.data[i + 2] = sum;
              outImgData.data[i + 3] = greyImgData.imageData.data[i + 3];
            }
          }
        }
      }
      this._enhancedImage.imageData = outImgData;
      this._enhancedImageObserver.next(this._enhancedImage);
    })

    //mask are applied to surrounding pixels, there cant be applied to edges of image
    function isImgEdge(index, width, height) {
      //is index on first row
      if (index < width) {
        return true;
      }
      //is index on last row
      else if (index > (height - 1) * width) {
        return true;
      }
      //is index on first column
      else if (index % width === 0) {
        return true;
      }
      //is index on last column
      else if (index % width === width - 4) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
