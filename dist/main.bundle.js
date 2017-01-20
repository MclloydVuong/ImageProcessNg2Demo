webpackJsonp([0,3],{

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__ = __webpack_require__(805);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(806);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__(810);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(811);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);







//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/rxjs-operators.js.map

/***/ },

/***/ 411:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_service__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_service__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_enhancement_service__ = __webpack_require__(633);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__upload_service__["a"]; });
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__image_enhancement_service__["a"]; });



//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/index.js.map

/***/ },

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rxjs_operators__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__rxjs_operators__);
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
    function UploadService() {
        var _this = this;
        this.uploadUrl = "http://localhost:3000/upload";
        this._imageCollection = new Array();
        this.imageCollection$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this._imageCollectionObserver = observer;
        }).share();
    }
    UploadService.prototype.upload = function (file) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append("imageFile", file, file.name);
            xhr.onreadystatechange = function () { return xhrCheckStatus(); };
            xhr.open('POST', _this.uploadUrl, true);
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
    UploadService.prototype.saveToLocal = function (filename, file) {
        localStorage.setItem(filename, file);
    };
    UploadService.prototype.addImage = function (file) {
        var _this = this;
        this.getBase64(file, function (result) {
            _this._imageCollection.push({ filename: file.name, src: result });
            _this._imageCollectionObserver.next(_this._imageCollection);
        });
    };
    UploadService.prototype.getImages = function () {
        this._imageCollectionObserver.next(this._imageCollection);
    };
    UploadService.prototype.getBase64 = function (file, callback) {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    };
    UploadService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], UploadService);
    return UploadService;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(635);
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
            styles: [__webpack_require__(789)]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs__ = __webpack_require__(787);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_index__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_upload_service__ = __webpack_require__(412);
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
                __WEBPACK_IMPORTED_MODULE_8__components_index__["b" /* ImageUploadComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_index__["c" /* SidenavComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_index__["d" /* ImageViewComponent */]
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
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ImageUploadComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ImageUploadComponent = (function () {
    function ImageUploadComponent() {
        this.uploadUrl = "http://localhost:3000/upload";
        this.imageSelected = false;
        this.enhancedSelected = false;
        this.image = new Image();
        this.setEnhancement = 'normal';
        this.enhancements = [
            { value: 'normal', viewValue: 'Normal' },
            { value: 'blue-tint', viewValue: 'Blue' },
            { value: 'upside-down', viewValue: 'Upside Down' }
        ];
    }
    ImageUploadComponent.prototype.ngAfterViewInit = function () {
        this.canvas = this.eCanvas.nativeElement;
        this.context = this.canvas.getContext("2d");
    };
    ImageUploadComponent.prototype.onEnhance = function () {
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
    };
    ImageUploadComponent.prototype.reSize = function () {
        this.eCanvas.nativeElement.width = this.origImage.nativeElement.clientWidth;
        this.eCanvas.nativeElement.height = this.origImage.nativeElement.clientHeight;
        console.log("origW:" + this.origImage.nativeElement.clientWidth);
        console.log("origH:" + this.origImage.nativeElement.clientHeight);
        console.log("canW:" + this.eCanvas.nativeElement.width);
        console.log("canH:" + this.eCanvas.nativeElement.height);
    };
    ImageUploadComponent.prototype.fileChangeEvent = function (fileInput) {
        //this.filesToUpload = <Array<File>> fileInput.target.files;
        this.imageFile = fileInput.target.files[0];
    };
    ImageUploadComponent.prototype.onSave = function () {
        var _this = this;
        if (this.imageFile !== undefined) {
            var reader_1 = new FileReader();
            reader_1.onloadend = function (e) {
                _this.image.src = reader_1.result;
                _this.imageSelected = true;
            };
            reader_1.readAsDataURL(this.imageFile);
        }
        else {
            console.log("please select an image");
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])("eCanvas"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _a) || Object)
    ], ImageUploadComponent.prototype, "eCanvas", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('uploadedImage'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _b) || Object)
    ], ImageUploadComponent.prototype, "origImage", void 0);
    ImageUploadComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-image-upload',
            template: __webpack_require__(795),
            styles: [__webpack_require__(790)]
        }), 
        __metadata('design:paramtypes', [])
    ], ImageUploadComponent);
    return ImageUploadComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/image-upload.component.js.map

/***/ },

/***/ 629:
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
    function ImageViewComponent(imageEnhancementService) {
        this.imageEnhancementService = imageEnhancementService;
        this.oldSource = this.source;
    }
    ImageViewComponent.prototype.ngAfterViewInit = function () {
    };
    ImageViewComponent.prototype.ngDoCheck = function () {
        if (this.oldSource !== this.source) {
            this.resizeCanvas();
            this.image.src = this.source;
            this.isImageSelected = true;
        }
    };
    ImageViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.imageEnhancementService.enhancedImage$.subscribe(function (data) {
            _this.enhancedImageData = data;
        });
        this.isImageSelected = false;
        this.enhancements = [
            { value: 'inverse', viewValue: 'Inverse' },
            { value: 'normal', viewValue: 'Normal' }
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
            this.imageEnhancementService.enhance({ enhancement: enhanceChoice, imageData: imageData });
            this.context.putImageData(this.enhancedImageData.imageData, 0, 0);
        }
    };
    ImageViewComponent.prototype.onSaveAs = function () {
        this.downloadLink.nativeElement.href = this.enhancedImage.nativeElement.toDataURL();
        this.downloadLink.nativeElement.download = this.saveFileName.nativeElement.value;
        this.downloadLink.nativeElement.click();
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
            template: __webpack_require__(796),
            styles: [__webpack_require__(791)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* ImageEnhancementService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* ImageEnhancementService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* ImageEnhancementService */]) === 'function' && _f) || Object])
    ], ImageViewComponent);
    return ImageViewComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/image-view.component.js.map

/***/ },

/***/ 630:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolbar_toolbar_component__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_upload_image_upload_component__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidenav_sidenav_component__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__image_view_image_view_component__ = __webpack_require__(629);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__toolbar_toolbar_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__image_upload_image_upload_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__sidenav_sidenav_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__image_view_image_view_component__["a"]; });




//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/index.js.map

/***/ },

/***/ 631:
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
        this.selectedImage = {};
    }
    SidenavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploadService.imageCollection$.subscribe(function (imageList) {
            _this.imageList = imageList;
        });
        this.uploadService.getImages();
    };
    SidenavComponent.prototype.ngAfterViewInit = function () { };
    SidenavComponent.prototype.selectFile = function () {
        this.hiddenUpload.nativeElement.click();
    };
    SidenavComponent.prototype.fileSelectedEvent = function (fileInput) {
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
    };
    SidenavComponent.prototype.selectImage = function (image) {
        this.selectedImage = image;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('hiddenUpload'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _a) || Object)
    ], SidenavComponent.prototype, "hiddenUpload", void 0);
    SidenavComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-sidenav',
            template: __webpack_require__(797),
            styles: [__webpack_require__(792)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* UploadService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* UploadService */]) === 'function' && _b) || Object])
    ], SidenavComponent);
    return SidenavComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/sidenav.component.js.map

/***/ },

/***/ 632:
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
            template: __webpack_require__(798),
            styles: [__webpack_require__(793)]
        }), 
        __metadata('design:paramtypes', [])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/toolbar.component.js.map

/***/ },

/***/ 633:
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
        this._enhancedImage = { enhancement: null, imageData: null };
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
        this._enhancedImage = { enhancement: 'inverse', imageData: req.imageData };
        this._enhancedImageObserver.next(this._enhancedImage);
    };
    ImageEnhancementService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], ImageEnhancementService);
    return ImageEnhancementService;
}());
//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/image-enhancement.service.js.map

/***/ },

/***/ 634:
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

/***/ 635:
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

/***/ 636:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=C:/Users/mclloyd/Documents/Personal/Website/image-process/src/polyfills.js.map

/***/ },

/***/ 789:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 790:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 791:
/***/ function(module, exports) {

module.exports = ".image-container {\r\n    margin: 10px;\r\n    min-width: 300px;\r\n    min-height: 200px;\r\n    width: 40%;\r\n}"

/***/ },

/***/ 792:
/***/ function(module, exports) {

module.exports = ".my-container {\r\n  width: 100vw;\r\n  height: 93vh;\r\n}\r\n\r\n.my-container md-sidenav {\r\n  padding: 0px 10px 10px 15px;\r\n  max-width: 320px;\r\n}\r\n\r\n.my-container .md-sidenav-content,\r\n.my-container md-sidenav {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.my-scrolling-content {\r\n  overflow: auto;\r\n}\r\n\r\n.my-scrolling-content md-list {\r\n  width: 320px;\r\n}\r\n\r\nbutton.my-fab {\r\n  position: absolute;\r\n  right: 20px;\r\n  top: 12px;\r\n}\r\n\r\n#hiddenUpload{\r\n    width:0px;\r\n    height:0px;\r\n    opacity:0;\r\n    position: absolute;\r\n    right: 100px;\r\n    top: 12px;\r\n}"

/***/ },

/***/ 793:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 794:
/***/ function(module, exports) {

module.exports = "<div>\n    <app-toolbar></app-toolbar>\n    <app-sidenav></app-sidenav>\n</div>"

/***/ },

/***/ 795:
/***/ function(module, exports) {

module.exports = "<md-card>\n  <md-card-header>\n    <md-card-title>Upload Photo</md-card-title>\n  </md-card-header>\n  <form enctype=\"multipart/form-data\" method=\"post\">\n    <input type=\"file\" (change)=\"fileChangeEvent($event)\">\n    <button md-fab (click)=\"onSave()\">\n      <md-icon class=\"md-24\">file_upload</md-icon>\n    </button>\n    <!--<button md-fab (click)=\"onUpload()\">\n      <md-icon class=\"md-24\">file_upload</md-icon>\n    </button>-->\n  </form>\n</md-card>\n\n<!--<div class=\"flex-container\" fxLayout=\"row\">-->\n  <div #uploadedImage class=\"flex-item\">\n    <md-toolbar color=\"primary\">\n      <span>Image</span>\n    </md-toolbar>\n    <md-card>\n      <img md-card-image [src]=\"image.src\" alt=\"Selected Image\" id=\"image\">\n      <div>\n        <md-select placeholder=\"Enhancements\" [(ngModel)]=\"setEnhancement\">\n          <md-option *ngFor=\"let enhancement of enhancements\" [value]=\"enhancement.value\"> {{ enhancement.viewValue }} </md-option>\n        </md-select>\n        <button md-icon-button (click)=\"onEnhance()\">\n        <md-icon>play_arrow</md-icon>\n      </button>\n      </div>\n    </md-card>\n  </div>\n\n  <div #enhancedImage class=\"flex-item\">\n    <md-toolbar color=\"accent\">\n      <span>Enhanced Image</span>\n    </md-toolbar>\n    <md-card>\n      <canvas #eCanvas md-card-image></canvas>\n\n    </md-card>\n  </div>\n<!--</div>-->"

/***/ },

/***/ 796:
/***/ function(module, exports) {

module.exports = "<div class=\"fxContainer\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayout.sm=\"column\" fxLayoutAlign=\"center start\">\n\n  <div class=\"image-container flex-item\">\n    <md-toolbar color=\"primary\">\n      <span>Image: {{imageName}}</span>\n    </md-toolbar>\n    <md-card>\n      <img md-card-image #originalImage [src]=\"source\">\n      <md-select #enhancementSelect placeholder=\"Enhancements\" [disabled]=\"!isImageSelected\">\n        <md-option *ngFor=\"let enhancement of enhancements\" [value]=\"enhancement.value\" (click)=\"onEnhance(enhancement.value)\">\n          {{ enhancement.viewValue }}\n        </md-option>\n      </md-select>\n    </md-card>\n  </div>\n\n  <div class=\"image-container flex-item\">\n    <md-toolbar color=\"accent\">\n      <span>Enhanced Image</span>\n    </md-toolbar>\n    <md-card>\n      <canvas md-card-image #enhancedImage [width]=\"canvasDimensions.width\" [height]=\"canvasDimensions.height\">\n      </canvas>\n      <md-input-container>\n        <input md-input #saveFileName type=\"text\" placeholder=\"Save As...\">\n      </md-input-container>\n      <button md-icon-button (click)=\"onSaveAs()\">\n        <a #downloadLink></a>\n        <md-icon>save</md-icon>\n      </button>\n    </md-card>\n  </div>\n\n</div>"

/***/ },

/***/ 797:
/***/ function(module, exports) {

module.exports = "<md-sidenav-container class=\"my-container\">\n  <md-sidenav mode=\"side\" opened=\"true\">\n\n    <button md-mini-fab class=\"my-fab\" (click)=\"selectFile()\">\n        <md-icon #visUpload>add</md-icon>\n    </button>\n    <input (change)=\"fileSelectedEvent($event.target.files[0])\" #hiddenUpload \n        id=\"hiddenUpload\" type=\"file\" accept=\".jpg, .bmp, .png, .tiff\" visbility=\"hidden\">\n\n    <h1>My Images</h1>\n\n    <div class=\"my-scrolling-content\">\n      <md-list>\n        <md-list-item *ngFor=\"let imageitem of imageList\">\n          <img md-list-avatar [src]=\"imageitem.src\" alt=\"preview image\">\n          <h3 md-line> {{imageitem.filename}} </h3>\n          <span>\n            <button md-icon-button (click)=\"selectImage(imageitem)\">\n              <md-icon>play_arrow</md-icon>\n            </button>\n          </span>\n        </md-list-item>\n      </md-list>\n    </div>\n  </md-sidenav>\n\n  <!--Content in here!!-->\n  <app-image-view [name]=\"selectedImage.filename\" [src]=\"selectedImage.src\"></app-image-view>\n\n</md-sidenav-container>"

/***/ },

/***/ 798:
/***/ function(module, exports) {

module.exports = "<md-toolbar class=\"flex-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\" color=\"primary\">\n  <span>Image Enhancement Demo</span>\n</md-toolbar>"

/***/ },

/***/ 846:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(462);


/***/ }

},[846]);
//# sourceMappingURL=main.bundle.map