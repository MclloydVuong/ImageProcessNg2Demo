webpackJsonp([0,3],{

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw__ = __webpack_require__(803);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(805);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__(809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(810);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);







//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/rxjs-operators.js.map

/***/ },

/***/ 411:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_service__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_service__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_enhancement_service__ = __webpack_require__(634);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__upload_service__["a"]; });
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__image_enhancement_service__["a"]; });



//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/index.js.map

/***/ },

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rxjs_operators__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__rxjs_operators__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UploadService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UploadService = (function () {
    function UploadService(http) {
        var _this = this;
        this.http = http;
        this.uploadOriginalUrl = "http://vps365877.ovh.net/upload_original";
        this.uploadProcessedUrl = "http://vps365877.ovh.net/upload_processed";
        this.imagesUrl = "http://vps365877.ovh.net/image";
        this.imageListUrl = "http://vps365877.ovh.net/image_list";
        this._imageCollection = new Array();
        this.imageCollection$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this._imageCollectionObserver = observer;
        }).share();
        this._processedCollection = new Array();
        this.processedCollection$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this._processedCollectionObserver = observer;
        }).share();
    }
    UploadService.prototype.upload = function (file, dest) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            var destination;
            if (dest === 'original') {
                destination = _this.uploadOriginalUrl;
            }
            else if (dest === 'processed') {
                destination = _this.uploadProcessedUrl;
            }
            formData.append("imageFile", file, file.name);
            xhr.onreadystatechange = function () { return xhrCheckStatus(); };
            xhr.open('POST', destination, true);
            xhr.send(formData);
            function xhrCheckStatus() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            }
        });
    };
    UploadService.prototype.addImage = function (file) {
        var _this = this;
        this.getBase64(file, function (result) {
            _this._imageCollection.push({ filename: file.name, src: result, type: 'original' });
            _this._imageCollectionObserver.next(_this._imageCollection);
        });
        this.upload(file, 'original')
            .subscribe(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
        }, function (err) {
            console.log("err: " + JSON.stringify(err, null, 2));
        }, function () {
            console.log("upload complete");
        });
    };
    UploadService.prototype.uploadProcessedImage = function (blob, filename) {
        var _this = this;
        var b = blob;
        b.lastModifiedDate = new Date();
        b.name = filename;
        this.getBase64(blob, function (result) {
            _this._processedCollection.push({ filename: filename, src: result, type: 'processed' });
            _this._processedCollectionObserver.next(_this._processedCollection);
        });
        this.upload(blob, 'processed')
            .subscribe(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
        }, function (err) {
            console.log("err: " + JSON.stringify(err, null, 2));
        }, function () {
            console.log("upload complete");
        });
    };
    UploadService.prototype.syncImageList = function (choice) {
        var _this = this;
        var collection;
        if (choice == 'original') {
            collection = this._imageCollection;
        }
        else if (choice == 'processed') {
            collection = this._processedCollection;
        }
        this.getServerImageList(choice)
            .then(function (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                if (collection.indexOf(item) == -1) {
                    _this.updateImageCollection(item, choice);
                }
            }
        });
    };
    UploadService.prototype.getServerImageList = function (choice) {
        return this.http.get(this.imageListUrl + "?option=" + choice)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) { return Promise.reject(err); });
    };
    UploadService.prototype.updateImageCollection = function (imageName, type) {
        var source = this.imagesUrl + "?id=" + imageName + "&option=" + type;
        if (type == 'original') {
            this._imageCollection.push({ filename: imageName, src: source, type: 'original' });
            this._imageCollectionObserver.next(this._imageCollection);
        }
        else if (type == 'processed') {
            this._processedCollection.push({ filename: imageName, src: source, type: 'processed' });
            this._processedCollectionObserver.next(this._processedCollection);
        }
    };
    UploadService.prototype.getBase64 = function (file, callback) {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    };
    UploadService.prototype.deleteImage = function (image) {
        var delIndex = ((image.type == 'original') ? this._imageCollection : this._processedCollection).indexOf(image);
        if (delIndex > -1) {
            ((image.type == 'original') ? this._imageCollection : this._processedCollection).splice(delIndex, 1);
            ((image.type == 'original') ? this._imageCollectionObserver : this._processedCollectionObserver).next((image.type == 'original') ? this._imageCollection : this._processedCollection);
            this.deleteImgOnServer(image).subscribe(function (res) { return console.log('deleted: ' + image.filename); }, function (err) { return console.log('failed to delete: ' + image.filename); });
        }
        else {
            throw new Error('Could not find image in collection');
        }
    };
    UploadService.prototype.deleteImgOnServer = function (image) {
        console.log(image);
        return this.http.delete(this.imagesUrl + "?id=" + image.filename + "&option=" + image.type)
            .map(function (res) { return console.log(res); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json); });
    };
    UploadService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === 'function' && _a) || Object])
    ], UploadService);
    return UploadService;
    var _a;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/upload.service.js.map

/***/ },

/***/ 461:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 461;


/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(627);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_37" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/main.js.map

/***/ },

/***/ 626:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(794),
            styles: [__webpack_require__(790)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/app.component.js.map

/***/ },

/***/ 627:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_index__ = __webpack_require__(629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_upload_service__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__directives_index__ = __webpack_require__(632);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_index__["a" /* ToolbarComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_index__["b" /* SidenavComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_index__["c" /* ImageViewComponent */],
                __WEBPACK_IMPORTED_MODULE_10__directives_index__["a" /* StopClickPropagationDirective */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["e" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["MaterialModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__["a" /* FlexLayoutModule */].forRoot()
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__services_upload_service__["a" /* UploadService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/app.module.js.map

/***/ },

/***/ 628:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__(411);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ImageViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ImageViewComponent = (function () {
    function ImageViewComponent(imageEnhancementService, uploadService) {
        this.imageEnhancementService = imageEnhancementService;
        this.uploadService = uploadService;
        this.oldSource = this.source;
    }
    ImageViewComponent.prototype.ngAfterViewInit = function () {
    };
    ImageViewComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.oldSource !== this.source) {
            this.resizeCanvas();
            this.image.src = this.source;
            this.isImageSelected = true;
            this.image.onload = function () {
                _this.drawCanvas(_this.context, _this.image);
                _this.oldSource = _this.source;
            };
        }
    };
    ImageViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.imageEnhancementService.enhancedImage$.subscribe(function (data) {
            _this.enhancedImageData = data;
        });
        this.isImageSelected = false;
        this.enhancements = [
            { value: 'normal', viewValue: 'Normal' },
            { value: 'inverse', viewValue: 'Inverse' },
            { value: 'greyscale', viewValue: 'Grey Scale' },
            { value: 'edge-detection', viewValue: 'Edge Detection' },
        ];
        this.canvas = this.enhancedImage.nativeElement;
        this.context = this.canvas.getContext("2d");
        this.resizeCanvas();
        this.image = new Image();
        this.image.onload = this.drawCanvas(this.context, this.image);
        this.image.src = this.source;
    };
    ImageViewComponent.prototype.resizeCanvas = function () {
        this.canvasDimensions = {
            width: this.originalImage.nativeElement.clientWidth !== undefined ?
                this.originalImage.nativeElement.clientWidth : 300,
            height: this.originalImage.nativeElement.clientHeight !== undefined ?
                this.originalImage.nativeElement.clientHeight : 300,
        };
    };
    ImageViewComponent.prototype.drawCanvas = function (context, image) {
        context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
    };
    ImageViewComponent.prototype.onEnhance = function (enhanceChoice) {
        if (enhanceChoice === 'normal') {
            this.drawCanvas(this.context, this.image);
        }
        else {
            var width = this.context.canvas.width;
            var height = this.context.canvas.height;
            var imageData = this.context.getImageData(0, 0, width, height);
            this.imageEnhancementService.enhance({ enhancement: enhanceChoice, imageData: imageData, width: width, height: height });
            this.context.putImageData(this.enhancedImageData.imageData, 0, 0);
        }
    };
    ImageViewComponent.prototype.onDownload = function () {
        this.downloadLink.nativeElement.href = this.enhancedImage.nativeElement.toDataURL();
        this.downloadLink.nativeElement.download = this.saveFileName.nativeElement.value;
        this.downloadLink.nativeElement.click();
    };
    ImageViewComponent.prototype.onUpload = function () {
        var _this = this;
        this.enhancedImage.nativeElement.toBlob(function (blob) {
            var filename = _this.saveFileName.nativeElement.value + '.jpg';
            console.log(filename);
            _this.uploadService.uploadProcessedImage(blob, filename);
        }, 'image/jpeg', 1);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('src'), 
        __metadata('design:type', Object)
    ], ImageViewComponent.prototype, "source", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('name'), 
        __metadata('design:type', Object)
    ], ImageViewComponent.prototype, "imageName", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('originalImage'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _a) || Object)
    ], ImageViewComponent.prototype, "originalImage", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('enhancedImage'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _b) || Object)
    ], ImageViewComponent.prototype, "enhancedImage", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('enhancementSelect'), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _c) || Object)
    ], ImageViewComponent.prototype, "enhancementSelect", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('saveFileName'), 
        __metadata('design:type', (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _d) || Object)
    ], ImageViewComponent.prototype, "saveFileName", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('downloadLink'), 
        __metadata('design:type', (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _e) || Object)
    ], ImageViewComponent.prototype, "downloadLink", void 0);
    ImageViewComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-image-view',
            template: __webpack_require__(795),
            styles: [__webpack_require__(791)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* ImageEnhancementService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* ImageEnhancementService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* ImageEnhancementService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* UploadService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* UploadService */]) === 'function' && _g) || Object])
    ], ImageViewComponent);
    return ImageViewComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/image-view.component.js.map

/***/ },

/***/ 629:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolbar_toolbar_component__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidenav_sidenav_component__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_view_image_view_component__ = __webpack_require__(628);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__toolbar_toolbar_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__sidenav_sidenav_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__image_view_image_view_component__["a"]; });



//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/index.js.map

/***/ },

/***/ 630:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__(411);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SidenavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SidenavComponent = (function () {
    function SidenavComponent(uploadService) {
        this.uploadService = uploadService;
        this.imageList = [];
        this.imageProcessedList = [];
        this.selectedImage = {};
    }
    SidenavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSidenav = true;
        this.uploadService.imageCollection$.subscribe(function (imageList) {
            _this.imageList = imageList;
        });
        this.uploadService.processedCollection$.subscribe(function (processedList) {
            _this.imageProcessedList = processedList;
        });
        this.uploadService.syncImageList('original');
        this.uploadService.syncImageList('processed');
    };
    SidenavComponent.prototype.ngAfterViewInit = function () { };
    SidenavComponent.prototype.sidenavToggle = function () {
        this.isSidenav = !this.isSidenav;
    };
    SidenavComponent.prototype.selectFile = function () {
        this.hiddenUpload.nativeElement.click();
    };
    SidenavComponent.prototype.fileSelectedEvent = function (fileInput) {
        console.log(fileInput);
        this.uploadService.addImage(fileInput);
    };
    SidenavComponent.prototype.selectImage = function (image) {
        this.selectedImage = image;
    };
    SidenavComponent.prototype.deleteImage = function (image) {
        this.uploadService.deleteImage(image);
    };
    SidenavComponent.prototype.onDownload = function (image) {
        this.downloadLink.nativeElement.href = image.src;
        this.downloadLink.nativeElement.download = image.filename;
        this.downloadLink.nativeElement.click();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('hiddenUpload'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _a) || Object)
    ], SidenavComponent.prototype, "hiddenUpload", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('downloadLink'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _b) || Object)
    ], SidenavComponent.prototype, "downloadLink", void 0);
    SidenavComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-sidenav',
            template: __webpack_require__(796),
            styles: [__webpack_require__(792)]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* UploadService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* UploadService */]) === 'function' && _c) || Object])
    ], SidenavComponent);
    return SidenavComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/sidenav.component.js.map

/***/ },

/***/ 631:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ToolbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToolbarComponent = (function () {
    function ToolbarComponent() {
    }
    ToolbarComponent.prototype.ngOnInit = function () {
    };
    ToolbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-toolbar',
            template: __webpack_require__(797),
            styles: [__webpack_require__(793)]
        }), 
        __metadata('design:paramtypes', [])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/toolbar.component.js.map

/***/ },

/***/ 632:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stop_click_propagation_directive__ = __webpack_require__(633);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__stop_click_propagation_directive__["a"]; });

//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/index.js.map

/***/ },

/***/ 633:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StopClickPropagationDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StopClickPropagationDirective = (function () {
    function StopClickPropagationDirective() {
    }
    StopClickPropagationDirective.prototype.onClick = function (event) {
        event.stopPropagation();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* HostListener */])("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], StopClickPropagationDirective.prototype, "onClick", null);
    StopClickPropagationDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */])({
            selector: '[stopClickPropagation]'
        }), 
        __metadata('design:paramtypes', [])
    ], StopClickPropagationDirective);
    return StopClickPropagationDirective;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/stop-click-propagation.directive.js.map

/***/ },

/***/ 634:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rxjs_operators__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__rxjs_operators__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ImageEnhancementService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ImageEnhancementService = (function () {
    function ImageEnhancementService() {
        var _this = this;
        this._enhancedImage = { enhancement: null, imageData: null, width: null, height: null };
        this.enhancedImage$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this._enhancedImageObserver = observer;
        }).share();
    }
    ImageEnhancementService.prototype.isImage = function () {
        console.log(this._enhancedImage.imageData !== null ? true : false);
    };
    ImageEnhancementService.prototype.enhance = function (req) {
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
    };
    ImageEnhancementService.prototype.inverse = function (req) {
        for (var i = 0; i < req.imageData.data.length; i += 4) {
            req.imageData.data[i] = 255 - req.imageData.data[i]; //red
            req.imageData.data[i + 1] = 255 - req.imageData.data[i + 1]; //green
            req.imageData.data[i + 2] = 255 - req.imageData.data[i + 2]; //blue
            req.imageData.data[i + 3] = req.imageData.data[i + 3]; //alpha
        }
        this._enhancedImage = req;
        this._enhancedImageObserver.next(this._enhancedImage);
    };
    ImageEnhancementService.prototype.greyscale = function (req, callback) {
        for (var i = 0; i < req.imageData.data.length; i += 4) {
            var avg = (req.imageData.data[i] + req.imageData.data[i + 1] + req.imageData.data[i + 2]) / 3;
            req.imageData.data[i] = avg; // red
            req.imageData.data[i + 1] = avg; // green
            req.imageData.data[i + 2] = avg; // blue
        }
        if (req.enhancement === 'greyscale') {
            this._enhancedImage = req;
            this._enhancedImageObserver.next(this._enhancedImage);
        }
        else if (callback === undefined) {
            throw new Error("callback is undefined");
        }
        else {
            callback(req);
        }
    };
    /**
     * Function: edgeDetectionSobel
     * Desciption: Edge detection using Sobel Masks
     * Parameter(s): {enhacementType:String, imageData: ImageData}
     * Return: {enhacementType:String, imageData: ImageData}
     **/
    ImageEnhancementService.prototype.edgeDetectionSobel = function (req) {
        var _this = this;
        var masks = {
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
        };
        var outImgData = new ImageData(req.imageData.width, req.imageData.height);
        //greyscale 
        this.greyscale(req, function (greyImgData) {
            //perform convolution
            var min = 0;
            var max = 255;
            var w = req.imageData.width * 4;
            var h = req.imageData.height;
            for (var i = 0; i < greyImgData.imageData.data.length; i += 4) {
                if (!isImgEdge(i, w, h)) {
                    for (var mask in masks) {
                        var currentmask = masks[mask];
                        var focusArea = [i - w - 4, i - w, i - w + 4, i - 4, i, i + 4, i + w - 4, i + w, i + w + 4];
                        var sum = 0;
                        for (var j = 0; j < focusArea.length; j++) {
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
            _this._enhancedImage.imageData = outImgData;
            _this._enhancedImageObserver.next(_this._enhancedImage);
        });
        //mask are applied to surrounding pixels, there cant be applied to edges of image
        function isImgEdge(index, width, height) {
            //is index on first row
            if (index < width) {
                return true;
            }
            else if (index > (height - 1) * width) {
                return true;
            }
            else if (index % width === 0) {
                return true;
            }
            else if (index % width === width - 4) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    ImageEnhancementService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], ImageEnhancementService);
    return ImageEnhancementService;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/image-enhancement.service.js.map

/***/ },

/***/ 635:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* unused harmony export ImageService */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ImageService = (function () {
    function ImageService() {
    }
    ImageService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], ImageService);
    return ImageService;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/image.service.js.map

/***/ },

/***/ 636:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/environment.js.map

/***/ },

/***/ 637:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(844);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/polyfills.js.map

/***/ },

/***/ 790:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 791:
/***/ function(module, exports) {

module.exports = ".image-container {\r\n    margin: 10px;\r\n    min-width: 400px;\r\n    min-height: 300px;\r\n    width: 40%;\r\n}\r\n"

/***/ },

/***/ 792:
/***/ function(module, exports) {

module.exports = ".my-container {\r\n  width: 100vw;\r\n  height: 93vh;\r\n}\r\n\r\n.my-container md-sidenav {\r\n  padding: 0px 10px 10px 15px;\r\n  max-width: 320px;\r\n}\r\n\r\n.my-container .md-sidenav-content,\r\n.my-container md-sidenav {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.my-scrolling-content {\r\n  overflow: auto;\r\n}\r\n\r\n.my-scrolling-content md-list {\r\n  width: 320px;\r\n}\r\n\r\nbutton.my-fab {\r\n  position: absolute;\r\n  right: 50px;\r\n  top: 15px;\r\n}\r\n\r\nbutton#sidenav-fab {\r\n  position: absolute;\r\n  left: 20px;\r\n  top: 20px;\r\n}\r\n\r\nbutton#sideclose {\r\n  position: absolute;\r\n  right: 10px;\r\n  top: 15px;\r\n}\r\n\r\n#hiddenUpload{\r\n    width:0px;\r\n    height:0px;\r\n    opacity:0;\r\n    position: absolute;\r\n    right: 100px;\r\n    top: 12px;\r\n}"

/***/ },

/***/ 793:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 794:
/***/ function(module, exports) {

module.exports = "<div>\r\n    <app-toolbar></app-toolbar>\r\n    <app-sidenav></app-sidenav>\r\n</div>"

/***/ },

/***/ 795:
/***/ function(module, exports) {

module.exports = "<div class=\"fxContainer\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayout.sm=\"column\" fxLayoutAlign=\"center center\">\r\n\r\n  <div class=\"image-container flex-item\">\r\n    <md-toolbar color=\"primary\">\r\n      <span>Image: {{imageName}}</span>\r\n    </md-toolbar>\r\n    <md-card>\r\n      <img md-card-image #originalImage [src]=\"source\">\r\n      <md-select #enhancementSelect placeholder=\"Enhancements\" [disabled]=\"!isImageSelected\">\r\n        <md-option *ngFor=\"let enhancement of enhancements\" [value]=\"enhancement.value\" (click)=\"onEnhance(enhancement.value)\">\r\n          {{ enhancement.viewValue }}\r\n        </md-option>\r\n      </md-select>\r\n    </md-card>\r\n  </div>\r\n\r\n  <div class=\"image-container flex-item\">\r\n    <md-toolbar color=\"accent\">\r\n      <span>Processed Image</span>\r\n    </md-toolbar>\r\n    <md-card>\r\n      <canvas md-card-image #enhancedImage [width]=\"canvasDimensions.width\" [height]=\"canvasDimensions.height\">\r\n      </canvas>\r\n      <md-input-container>\r\n        <input md-input #saveFileName type=\"text\" placeholder=\"Save As...\">\r\n      </md-input-container>\r\n      <span>  \r\n        <button md-icon-button (click)=\"onUpload()\">\r\n          <md-icon>save</md-icon>\r\n        </button>\r\n        <button md-icon-button (click)=\"onDownload()\">\r\n          <a #downloadLink></a>\r\n          <md-icon>file_download</md-icon>\r\n        </button>\r\n      </span>\r\n    </md-card>\r\n  </div>\r\n\r\n</div>"

/***/ },

/***/ 796:
/***/ function(module, exports) {

module.exports = "<md-sidenav-container class=\"my-container\">\r\n  <md-sidenav mode=\"side\" [opened]=\"isSidenav\">\r\n\r\n    <button md-icon-button class=\"my-fab\" (click)=\"selectFile()\">\r\n        <md-icon >add</md-icon>\r\n    </button>\r\n    <input (change)=\"fileSelectedEvent($event.target.files[0])\" #hiddenUpload id=\"hiddenUpload\" type=\"file\" accept=\".jpg, .bmp, .png, .tiff\"\r\n      visbility=\"hidden\">\r\n    <h1>My Images</h1>\r\n    <button md-icon-button id=\"sideclose\" (click)=\"sidenavToggle()\">\r\n        <md-icon>close</md-icon>\r\n      </button>\r\n    <md-tab-group>\r\n      <md-tab label=\"Original\">\r\n        <div class=\"my-scrolling-content\">\r\n          <md-list>\r\n            <md-list-item *ngFor=\"let imageitem of imageList\">\r\n              <img md-list-avatar [src]=\"imageitem.src\" alt=\"preview image\">\r\n              <h3 md-line> {{imageitem.filename}} </h3>\r\n              <span>\r\n                <button md-icon-button (click)=\"selectImage(imageitem)\">\r\n                  <md-icon>play_arrow</md-icon>\r\n                </button>\r\n              </span>\r\n              <span >\r\n                <button md-icon-button (click)=\"deleteImage(imageitem)\">\r\n                  <md-icon>close</md-icon>\r\n                </button>\r\n              </span>\r\n            </md-list-item>\r\n          </md-list>\r\n        </div>\r\n      </md-tab>\r\n\r\n      <md-tab label=\"Processed\">\r\n        <div class=\"my-scrolling-content\">\r\n          <md-list>\r\n            <md-list-item *ngFor=\"let imageitem of imageProcessedList\">\r\n              <img md-list-avatar [src]=\"imageitem.src\" alt=\"preview image\">\r\n              <h3 md-line> {{imageitem.filename}} </h3>\r\n              <span>\r\n                <button md-icon-button (click)=\"onDownload(imageitem)\">\r\n                  <md-icon>file_download</md-icon>\r\n                </button>\r\n              </span>\r\n              <span >\r\n                <button md-icon-button (click)=\"deleteImage(imageitem)\">\r\n                  <md-icon>close</md-icon>\r\n                </button>\r\n              </span>\r\n            </md-list-item>\r\n          </md-list>\r\n          <a #downloadLink></a>\r\n        </div>\r\n      </md-tab>\r\n    </md-tab-group>\r\n  </md-sidenav>\r\n\r\n  <!--Content in here!!-->\r\n  <button md-mini-fab id=\"sidenav-fab\" (click)=\"sidenavToggle()\" *ngIf(!isSidenav)>\r\n        <md-icon>more_vert</md-icon>\r\n  </button>\r\n  <app-image-view [name]=\"selectedImage.filename\" [src]=\"selectedImage.src\"></app-image-view>\r\n\r\n</md-sidenav-container>"

/***/ },

/***/ 797:
/***/ function(module, exports) {

module.exports = "<md-toolbar class=\"flex-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\" color=\"primary\">\r\n  <span>Angular 2 Demo für Micro-Dimensions</span>\r\n</md-toolbar>"

/***/ },

/***/ 845:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(462);


/***/ }

},[845]);
//# sourceMappingURL=main.bundle.map