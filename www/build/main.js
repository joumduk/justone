webpackJsonp([0],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* unused harmony export Order */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_order_new_order__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_detail_order_detail__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrdersPage = /** @class */ (function () {
    function OrdersPage(navCtrl, navParams, storage, loadingCtrl, httpNavtive) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.httpNavtive = httpNavtive;
        this.orders = Array();
        this.status_list = "pending";
        this.status = 0;
        this.next_btn = ["Paid", "Packing", "complete"];
        // Let's populate this page with some filler content for funzies
        storage.get('id_user').then(function (val) {
            _this.id_user = val;
            _this.orderlist(0);
        });
    }
    OrdersPage.prototype.orderlist = function (id) {
        var _this = this;
        this.status = id;
        var loader = this.loadingCtrl.create({
            content: "Loading"
        });
        loader.present();
        var url = 'http://api.nextobe.co.th/orders/getOrders/' + id;
        var postParams = { 'id_user': this.id_user };
        var options = { 'Content-Type': 'application/json' };
        this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
            // alert(JSON.stringify(data));
            // alert(data);
            _this.orders = [];
            if (data.orders.length > 0) {
                for (var _i = 0, _a = data.orders; _i < _a.length; _i++) {
                    var e = _a[_i];
                    _this.orders.push({
                        date: e.date,
                        id_order: e.id_order,
                        reference: e.reference,
                        payment: e.payment,
                        customer_name: e.customer_name,
                        grand_total: e.grand_total
                    });
                }
            }
            loader.dismiss();
        });
    };
    OrdersPage.prototype.orderDatail = function (item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_detail_order_detail__["a" /* OrderDetailPage */], {
            id_order: item.id_order
        });
    };
    OrdersPage.prototype.pushNewOrder = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__new_order_new_order__["a" /* NewOrderPage */]);
    };
    OrdersPage.prototype.passnextlevel = function (item) {
        var _this = this;
        if (confirm('are you sure?')) {
            var loader_1 = this.loadingCtrl.create({
                content: "Loading"
            });
            loader_1.present();
            var url = 'http://api.nextobe.co.th/orders/nextlevel/';
            var postParams = { 'id_user': this.id_user,
                'id_order': item.id_order
            };
            var options = { 'Content-Type': 'application/json' };
            this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
                // alert(JSON.stringify(data));
                // alert(data);
                _this.orderlist(_this.status);
                loader_1.dismiss();
            });
        }
    };
    OrdersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-orders',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/orders/orders.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Orders</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <button ion-button block (click)="pushNewOrder()">New Order</button>\n    <hr>\n    <ion-segment [(ngModel)]="status_list" color="secondary">\n      <ion-segment-button value="pending" (ionSelect)="orderlist(0)"> Pending\n      </ion-segment-button>\n      <ion-segment-button value="paid" (ionSelect)="orderlist(1)"> Paid\n        </ion-segment-button>\n      <ion-segment-button value="packing" (ionSelect)="orderlist(2)"> Packing\n      </ion-segment-button>\n      <ion-segment-button value="shiped" (ionSelect)="orderlist(3)"> Shiped\n        </ion-segment-button>\n    </ion-segment>\n    <hr>\n  <ion-list>\n    <ion-item *ngFor="let order of orders" >\n      <h2 style="color:#387ef5;" (click)="orderDatail(order)">Order : {{order.reference}} - {{order.id_order}} </h2>\n      <h3 (click)="orderDatail(order)">Customer: {{order.customer_name}} </h3>\n      <h4>Total Price : <b>{{order.grand_total | currency :\'฿ \'}}</b></h4>\n      <p style="text-align:right">{{order.date|date}}</p>\n      <a ion-button block *ngIf="next_btn[status]" (click)="passnextlevel(order)">{{next_btn[status]}}</a>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/orders/orders.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_http_native_http_native__["a" /* HttpNativeProvider */]])
    ], OrdersPage);
    return OrdersPage;
}());

var Order = /** @class */ (function () {
    function Order() {
    }
    return Order;
}());

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 123;

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpNativeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromPromise__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the HttpNativeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HttpNativeProvider = /** @class */ (function () {
    function HttpNativeProvider(http) {
        this.http = http;
    }
    HttpNativeProvider.prototype.get = function (url, params, options) {
        if (options === void 0) { options = {}; }
        var responseData = this.http.get(url, params, {})
            .then(function (resp) { return options.responseType == 'text' ? resp.data : JSON.parse(resp.data); });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromPromise(responseData);
    };
    HttpNativeProvider.prototype.post = function (url, params, options) {
        if (options === void 0) { options = {}; }
        var responseData = this.http.post(url, params, {})
            .then(function (resp) {
            return options.responseType == 'text' ? resp.data : JSON.parse(resp.data);
        });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromPromise(responseData);
    };
    HttpNativeProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_http__["a" /* HTTP */]])
    ], HttpNativeProvider);
    return HttpNativeProvider;
}());

//# sourceMappingURL=http-native.js.map

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 165;

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__products_products__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_instagram__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewProductPage = /** @class */ (function () {
    function NewProductPage(navCtrl, navParams, http, transfer, camera, loadingCtrl, httpNavtive, base64, fb, storage, instagram) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.httpNavtive = httpNavtive;
        this.base64 = base64;
        this.fb = fb;
        this.storage = storage;
        this.instagram = instagram;
        this.product = { name: '', price: '', sale_price: '', description: '', facebook: false, instagram: false, line: false, id_user: '' };
        storage.get("id_user").then(function (val) {
            _this.product.id_user = val;
            // alert(val);
        });
    }
    NewProductPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
            // alert(JSON.stringify(imageData));
            // this.imageFileName=imageData.file;
            // alert(imageData);
            // this.imageFileName= 'data:image/jpeg;base64,'+imageData;
            // this.base64.encodeFile(imageData).then((base64File: string) => {
            //   alert(base64File);
            // }, (err) => {
            //   console.log(err);
            // });
        }, function (err) {
            console.log(err);
            alert(err);
        });
    };
    NewProductPage.prototype.uploadFile = function () {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'image',
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
        };
        fileTransfer.upload(this.imageURI, 'http://api.nextobe.co.th/products/uploadImg', options)
            .then(function (data) {
            console.log(data + " Uploaded Successfully");
            var respone = JSON.parse(data.response);
            _this.imageFileName = respone.file;
            _this.submit();
            // alert("Image uploaded successfully");
        }, function (err) {
            console.log(err);
        });
    };
    NewProductPage.prototype.submit = function () {
        var _this = this;
        // alert(JSON.stringify(this.product));
        var loader = this.loadingCtrl.create({
            content: "Loading"
        });
        loader.present();
        var url = 'http://api.nextobe.co.th/products/newProduct';
        var postParams = { 'name': this.product.name, 'price': this.product.price, 'sale_price': this.product.sale_price, 'description': this.product.description, 'facebook': this.product.facebook, 'instagram': this.product.instagram, 'line': this.product.line, 'id_user': this.product.id_user,
            'image': this.imageFileName };
        var options = { 'Content-Type': 'application/json' };
        this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
            // alert(JSON.stringify(data));
            alert(data.message);
            if (data.status == 200) {
                // this.navCtrl.push(ProductsPage)
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__products_products__["a" /* ProductsPage */]);
                loader.dismiss();
                if (_this.product.instagram) {
                    if (_this.instagram) {
                        if (_this.instagram.isInstalled()) {
                            _this.instagram.share(_this.imageFileName, _this.product.description)
                                .then(function () {
                                loader.dismiss();
                                console.log('Shared!');
                            })
                                .catch(function (error) {
                                console.error(error);
                                loader.dismiss();
                            });
                        }
                    }
                    else {
                        loader.dismiss();
                    }
                }
            }
        });
        // this.http.uploadFile("http://api.nextobe.co.th/auth/uploadfile",{},{},this.file.name,"file").then( (x)=>alert(1));
    };
    NewProductPage.prototype.btninstagram = function () {
        if (this.instagram.isInstalled()) {
            this.instagram.share(this.imageFileName, this.product.description)
                .then(function () {
                console.log('Shared!');
            })
                .catch(function (error) { return console.error(error); });
        }
    };
    NewProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewProductPage');
    };
    NewProductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-new-product',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/new-product/new-product.html"*/'<!--\n  Generated template for the NewProductPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>New Product</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label  stacked>Name</ion-label>\n      <ion-input [(ngModel)]="product.name" autocapitalize=\'off\'  type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Origin Price</ion-label>\n      <ion-input [(ngModel)]="product.price" autocapitalize=\'off\'  type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Sale Price</ion-label>\n      <ion-input [(ngModel)]="product.sale_price" autocapitalize=\'off\' type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Description</ion-label>\n      <ion-textarea [(ngModel)]="product.description" placeholder="Enter a description"></ion-textarea>\n    </ion-item>\n    <ion-item>\n      <button ion-button color="secondary" (click)="getImage()">Get Image</button>\n    </ion-item>\n    <ion-item>\n      <h4>Image Preview</h4>\n      <p>{{imageURI}}"</p>\n    </ion-item>\n  </ion-list>\n  <ion-list>\n    <ion-item>\n      <ion-label>Facebook</ion-label>\n      <ion-checkbox [(ngModel)]="product.facebook" ></ion-checkbox>\n    </ion-item> \n    <ion-item>\n      <ion-label>Instagram</ion-label>\n      <ion-checkbox [(ngModel)]="product.instagram" ></ion-checkbox>\n    </ion-item> \n    <ion-item>\n      <ion-label>Line</ion-label>\n      <ion-checkbox [(ngModel)]="product.line" ></ion-checkbox>\n    </ion-item> \n  </ion-list>\n  <button ion-button block (click)="uploadFile()">Submit</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/new-product/new-product.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_http_native_http_native__["a" /* HttpNativeProvider */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_instagram__["a" /* Instagram */]])
    ], NewProductPage);
    return NewProductPage;
}());

//# sourceMappingURL=new-product.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__new_order_new_order__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailPage = /** @class */ (function () {
    function DetailPage(navCtrl, navParams, storage, httpNavtive) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.httpNavtive = httpNavtive;
        this.item = { 'id_product': "", 'name': "", 'price': 0, 'sale_price': 0, 'description': "", 'image_link': "" };
        this.facebook = { 'id': "", 'name': "", "des": "", "date": "", "comments": [] };
        var id = this.navParams.get('id');
        var url = 'http://api.nextobe.co.th/products/getproductdetail';
        var postParams = { 'id_product': id };
        var options = { 'Content-Type': 'application/json' };
        this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
            // alert(JSON.stringify(data));
            // // alert(data);
            _this.item.id_product = data.product.id_product;
            _this.item.name = data.product.name;
            _this.item.price = data.product.price;
            _this.item.sale_price = data.product.sale_price;
            _this.item.description = data.product.description;
            _this.item.image_link = data.product.image_link;
        });
        var url2 = 'http://api.nextobe.co.th/products/getComments';
        this.httpNavtive.post(url2, postParams, options).subscribe(function (data2) {
            _this.facebook.id = data2.media_id;
            _this.facebook.date = data2.date;
            _this.facebook.name = data2.name;
            _this.facebook.comments = data2.comments.data;
        });
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPage');
    };
    DetailPage.prototype.addNewOrder = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__new_order_new_order__["a" /* NewOrderPage */], {
            item: this.item
        });
    };
    DetailPage.prototype.addNewOrderFaceoobk = function (comment) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__new_order_new_order__["a" /* NewOrderPage */], {
            item: this.item,
            comment: comment
        });
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/detail/detail.html"*/'<!--\n  Generated template for the DetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <img src="http://api.nextobe.co.th/img/{{item.image_link}}">\n  <h1 id="iphoneX-heading3" style="color:#000000;">{{item.title}}</h1>\n  <div class="spacer" style="height: 10px;"></div>\n  <div>\n    <p>\n      Price\n      <span style="float:right;font-weight:bold;">{{item.price| currency:\'฿ \'}}</span>\n    </p>\n    <p>\n      Sale Price\n      <span style="float:right;font-weight:bold;">{{item.price| currency:\'฿ \'}}</span>\n    </p>\n  </div>\n  <div class="spacer" style="height: 10px;"></div>\n  <h4 id="iphoneX-heading4" style="color:#000000;">Description</h4>\n  <div id="iphoneX-markdown1" class="show-list-numbers-and-dots">\n    <p style="color:#000000;">{{item.description}}</p>\n\n  </div>\n  <button ion-button block red>Facebook</button>\n  <div>\n      <ion-card>\n \n          <ion-item>\n            <ion-avatar item-start>\n              <img src="http://placehold.it/75">\n            </ion-avatar>\n            <h2>{{facebook.name}}</h2>\n            <p>{{facebook.date}}</p>\n          </ion-item>\n     \n          <img src="http://api.nextobe.co.th/img/{{item.image_link}}" />\n     \n          <ion-card-content>\n          </ion-card-content>\n     \n          <ion-row>\n            <ion-col>\n              <button ion-button icon-left clear small>\n                <ion-icon name="text"></ion-icon>\n                <div>{{facebook.comments.length}} Comments</div>\n              </button>\n            </ion-col>\n            <ion-col center text-center>\n              <ion-note>\n                {{facebook.date}}\n              </ion-note>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n        <ion-card>\n            <ion-list class="chats">\n                <ion-item-sliding class="chat-item" *ngFor="let chat of facebook.comments" (click)="addNewOrderFaceoobk(chat)">\n                  <button ion-item class="chat">\n                    <img class="chat-picture" src="assets/imgs/avatar.png">\n                    <div class="chat-info">\n                      <h2 class="chat-title">{{chat.from.name}}</h2>\n                      <span *ngIf="chat.message" class="last-message">\n                        <p class="last-message-content last-message-content-text">{{chat.message}}</p>\n                        <span class="last-message-timestamp">{{chat.created_time | date }}</span>\n                      </span>\n                    </div>\n                  </button>\n                </ion-item-sliding>\n              </ion-list>\n        </ion-card>\n  </div>\n  <a ion-button block (click)="addNewOrder()">Sale This Product</a>\n  <div class="spacer" style="height: 10px;"></div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/detail/detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__["a" /* HttpNativeProvider */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetailPage; });
/* unused harmony export Shipping */
/* unused harmony export Product */
/* unused harmony export Order */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_shipping_add_shipping__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_clipboard__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderDetailPage = /** @class */ (function () {
    function OrderDetailPage(navCtrl, navParams, storage, iab, events, clipboard, httpNavtive) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.iab = iab;
        this.events = events;
        this.clipboard = clipboard;
        this.httpNavtive = httpNavtive;
        this.order = new Order();
        this.items = new Array();
        this.shippings = new Array();
        this.calldata();
        this.listenEvents();
    }
    OrderDetailPage.prototype.calldata = function () {
        var _this = this;
        this.items = [];
        var id = this.navParams.get('id_order');
        var url = 'http://api.nextobe.co.th/orders/getorderdetail';
        var postParams = { 'id_order': id };
        var options = { 'Content-Type': 'application/json' };
        this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
            // alert(JSON.stringify(data));
            // // alert(data);
            _this.order.id_order = data.order.id_order;
            _this.order.date = data.order.date;
            _this.order.reference = data.order.reference;
            _this.order.payment = data.order.payment;
            _this.order.customer_name = data.order.customer_name;
            _this.order.customer_phone = data.order.customer_phone;
            _this.order.customer_social = data.order.customer_social;
            _this.order.customer_social_id = data.order.customer_social_id;
            _this.order.address = data.order.address;
            _this.order.product_total = data.order.product_total;
            _this.order.grand_total = data.order.grand_total;
            if (data.shippings.length > 0) {
                for (var _i = 0, _a = data.items; _i < _a.length; _i++) {
                    var e = _a[_i];
                    _this.items.push({
                        name: e.product_name,
                        price: e.price,
                        sale_price: e.sale_price,
                        image_link: e.image_link,
                        quantity: e.quantity
                    });
                }
            }
            if (data.shippings.length > 0) {
                for (var _b = 0, _c = data.shippings; _b < _c.length; _b++) {
                    var e = _c[_b];
                    _this.shippings.push({
                        delivery: e.name,
                        shipping_fee: e.shipping_fee,
                        tracking_link: e.link,
                        tracking_code: e.tracking_code
                    });
                }
            }
        });
    };
    OrderDetailPage.prototype.listenEvents = function () {
        var _this = this;
        this.events.subscribe('reloadDetails', function () {
            _this.calldata();
        });
    };
    OrderDetailPage.prototype.openTracking = function (shipping) {
        // Opening a URL and returning an InAppBrowserObject
        var browser = this.iab.create(shipping.tracking_link, '_blank', { location: 'no' });
        browser.show();
        // Inject scripts, css and more with browser.X
    };
    OrderDetailPage.prototype.copytoclipboard = function (item) {
        this.clipboard.copy(item.tracking_link + item.tracking_code);
    };
    OrderDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderDetailPage');
    };
    OrderDetailPage.prototype.addshipping = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__add_shipping_add_shipping__["a" /* AddShippingPage */], {
            id_order: this.order.id_order
        });
    };
    OrderDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order-detail',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/order-detail/order-detail.html"*/'<!--\n  Generated template for the OrderDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Order Detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <h2>Order Info.</h2>\n    <ion-card>\n        <ion-list>\n          <ion-item>\n            <ion-label color="primary" >Order.{{order.id_order}} - {{order.reference}} </ion-label>\n          </ion-item>\n          <ion-item>\n              <ion-label>Date : {{order.date|date}}</ion-label>\n          </ion-item>\n          <ion-item>\n              <ion-label>Payment : {{order.payment}}</ion-label>\n          </ion-item>\n        </ion-list>    \n    </ion-card>\n    <h2>Customer Info.</h2>\n    <ion-card>\n        <ion-list>\n          <ion-item>\n            <ion-label color="primary" >{{order.customer_name}} </ion-label>\n          </ion-item>\n          <ion-item>\n              <ion-label>Tel : {{order.customer_phone}}</ion-label>\n          </ion-item>\n          <ion-item>\n              <ion-label>{{order.customer_social}} ID : {{order.customer_social_id}}</ion-label>\n          </ion-item>\n          <ion-item>\n              <ion-label>{{order.address}}</ion-label>\n          </ion-item>\n        </ion-list>    \n    </ion-card>\n    <h2>Items</h2>\n    <ion-card>\n        <ion-list>\n          <ion-row *ngFor="let item of items">\n            <ion-col align-self-center col-3 >\n              <img src="http://api.nextobe.co.th/img/{{item.image_link}}" />\n            </ion-col>\n            <ion-col col-6>\n                <ion-label style="text-overflow: ellipsis;">{{item.name}}</ion-label>\n                <ion-label color="primary">{{item.sale_price| currency:\'฿ \'}} x {{item.quantity}}</ion-label>\n            </ion-col>\n          </ion-row>\n          <ion-item>\n              <ion-label>Product Total {{order.product_total|currency:\'฿ \'}}</ion-label>\n            </ion-item>\n            <ion-item>\n              <ion-label>Grand Total {{order.grand_total|currency:\'฿ \'}}</ion-label>\n            </ion-item>\n        </ion-list>    \n    </ion-card>\n    <h2>Shipping Info</h2>\n    <ion-card *ngFor="let shipping of shippings">\n        <ion-list>\n          <ion-item>\n            <ion-label color="primary">{{shipping.delivery}}</ion-label>\n          </ion-item>\n          <ion-item>\n              <ion-label>Shipping Fee : {{shipping.shipping_fee|currency:\'฿ \'}}</ion-label>\n            </ion-item>\n            <ion-item>\n                <ion-label>Tracking Code : {{shipping.tracking_code}}</ion-label>\n              </ion-item>\n          <ion-item>\n            <ion-label>Tracking URL</ion-label>\n          </ion-item>\n          <ion-item>\n              <ion-label (click)="openTracking(shipping)">{{shipping.tracking_link}}</ion-label>\n          </ion-item>\n          <ion-item>\n              <a ion-button block (click)="copytoclipboard(shipping)">Copy to clipboard</a>\n          </ion-item>\n          \n        </ion-list>    \n    </ion-card>\n    <a ion-button block (click)="addshipping()"> Add Shipping</a>\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/order-detail/order-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_clipboard__["a" /* Clipboard */],
            __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__["a" /* HttpNativeProvider */]])
    ], OrderDetailPage);
    return OrderDetailPage;
}());

var Shipping = /** @class */ (function () {
    function Shipping() {
    }
    return Shipping;
}());

var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());

var Order = /** @class */ (function () {
    function Order() {
    }
    return Order;
}());

//# sourceMappingURL=order-detail.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddShippingPage; });
/* unused harmony export Shipping */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AddShippingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddShippingPage = /** @class */ (function () {
    function AddShippingPage(navCtrl, navParams, loadingCtrl, httpNavtive, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.httpNavtive = httpNavtive;
        this.events = events;
        this.shipping = new Shipping();
        this.shipping.id_order = this.navParams.get('id_order');
    }
    AddShippingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddShippingPage');
    };
    AddShippingPage.prototype.submit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Loading"
        });
        loader.present();
        var url = 'http://api.nextobe.co.th/orders/addShipping';
        var postParams = {
            'id_order': this.shipping.id_order,
            'delivery_option': this.shipping.delivery_option,
            'shipping_fee': this.shipping.shipping_fee,
            'tracking_code': this.shipping.tracking_code
        };
        var options = { 'Content-Type': 'application/json' };
        this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
            // alert(JSON.stringify(data));
            alert(data.message);
            if (data.status == 200) {
                // this.navCtrl.push(ProductsPage)
                _this.events.publish('reloadDetails');
                _this.navCtrl.pop();
            }
            loader.dismiss();
        });
    };
    AddShippingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-shipping',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/add-shipping/add-shipping.html"*/'<!--\n  Generated template for the AddShippingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>New Shipping</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card>\n        <ion-list>\n          <ion-item>\n            <ion-label color="primary" >Shipping</ion-label>\n            <ion-select [(ngModel)]="shipping.delivery_option">\n              <ion-option value="1">DHL Delivery</ion-option>\n              <ion-option value="2">Kerry Express</ion-option>\n              <ion-option value="3">Thailand Post</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n              <ion-label color="primary" >Shipping Fee</ion-label>\n              <ion-input placeholder="Shipping Fee" [(ngModel)]="shipping.shipping_fee"></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-label color="primary" >Tracking Code</ion-label>\n              <ion-input placeholder="Tracking Code" [(ngModel)]="shipping.tracking_code"></ion-input>\n            </ion-item>\n        </ion-list>    \n    </ion-card>\n    <a ion-button block (click)="submit()"> Submit</a>\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/add-shipping/add-shipping.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__["a" /* HttpNativeProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */]])
    ], AddShippingPage);
    return AddShippingPage;
}());

var Shipping = /** @class */ (function () {
    function Shipping() {
        this.delivery_option = 1;
    }
    return Shipping;
}());

//# sourceMappingURL=add-shipping.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, httpNavtive, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpNavtive = httpNavtive;
        this.storage = storage;
        this.user = { firstname: '', lastname: '', phone: '', email: '', password: '', conpasswd: '' };
    }
    SignupPage.prototype.signup = function () {
        var _this = this;
        if (this.user.conpasswd == this.user.password) {
            var url = 'http://api.nextobe.co.th/auth/signup';
            var postParams = { 'firstname': this.user.firstname, 'lastname': this.user.lastname, 'phone': this.user.phone, 'email': this.user.email, 'password': this.user.password };
            var options = { 'Content-Type': 'application/json' };
            this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
                // alert(JSON.stringify(data));
                alert(data.message);
                if (data.status == 200) {
                    _this.storage.set('id_user', data.id_user);
                    _this.storage.set('firstname', _this.user.firstname);
                    _this.storage.set('lastname', _this.user.lastname);
                    _this.storage.set('email', _this.user.email);
                    _this.storage.set('phone', _this.user.phone);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */]);
                }
            });
        }
        else {
            alert("mis-metch between Password and Retyped password");
        }
    };
    SignupPage.prototype.backLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/signup/signup.html"*/'<!--\n  Generated template for the SignupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sign Up</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label floating>First Name</ion-label>\n      <ion-input [(ngModel)]="user.firstname" autocapitalize=\'off\'  type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Last Name</ion-label>\n      <ion-input [(ngModel)]="user.lastname" autocapitalize=\'off\'  type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Phone Number</ion-label>\n      <ion-input [(ngModel)]="user.phone" autocapitalize=\'off\' type="text" value=""></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label floating>E-mail</ion-label>\n      <ion-input [(ngModel)]="user.email" autocapitalize=\'off\' type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input [(ngModel)]="user.password"  autocapitalize=\'off\' type="password" value=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Retype Password</ion-label>\n      <ion-input [(ngModel)]="user.conpasswd" autocapitalize=\'off\'  type="password" value=""></ion-input>\n    </ion-item>\n  </ion-list>\n  \n  <div padding>\n      <ion-row>\n          <ion-col>\n              <button ion-button block (click)="backLogin()">Back</button>\n          </ion-col>\n          <ion-col>\n              <button ion-button block color="danger" (click)="signup()">Sign Up</button>\n          </ion-col>\n      </ion-row>\n    \n  </div>\n  \n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__["a" /* HttpNativeProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* unused harmony export Report */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReportPage = /** @class */ (function () {
    function ReportPage(navCtrl, navParams, storage, httpNavtive) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.httpNavtive = httpNavtive;
        this.report = new Report();
        storage.get('id_user').then(function (val) {
            var url = 'http://api.nextobe.co.th/orders/getReports';
            var postParams = { 'id_user': val };
            var options = { 'Content-Type': 'application/json' };
            _this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
                // alert(JSON.stringify(data));
                // alert(data);
                _this.report.today_sale = data.report.today_sale;
                _this.report.today_revenue = data.report.today_revenue;
                _this.report.today_product = data.report.today_product;
                _this.report.month_sales = data.report.month_sale;
                _this.report.month_revenue = data.report.month_revenue;
                _this.report.month_product = data.report.month_product;
                _this.report.pending_orders = data.report.pending_order;
                _this.report.completed_orders = data.report.completed_orders;
            });
        });
    }
    ReportPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReportPage');
    };
    ReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-report',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/report/report.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Report</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <h1 style="margin-top:30px;">Today</h1>\n  <ion-list>\n      <ion-item>\n        <ion-label>Sales</ion-label>\n        <ion-label text-right>{{report.today_sale}}</ion-label>\n      </ion-item>\n      <ion-item>\n          <ion-label>Revenue</ion-label>\n          <ion-label text-right>{{report.today_revenue|currency:\'฿ \'}}</ion-label>\n        </ion-item>\n        <ion-item>\n            <ion-label>New Products</ion-label>\n            <ion-label text-right>{{report.today_product}}</ion-label>\n          </ion-item>\n    </ion-list>\n  <h1>This Month</h1>\n  <ion-list>\n      <ion-item>\n        <ion-label>Sales</ion-label>\n        <ion-label text-right>{{report.month_sales}}</ion-label>\n      </ion-item>\n      <ion-item>\n          <ion-label>Revenue</ion-label>\n          <ion-label text-right>{{report.month_revenue|currency:\'฿ \'}}</ion-label>\n        </ion-item>\n        <ion-item>\n            <ion-label>New Products</ion-label>\n            <ion-label text-right>{{report.month_product}}</ion-label>\n          </ion-item>\n    </ion-list>\n  <h1>Total Orders</h1>\n  <ion-list>\n    <ion-item>\n      <ion-label>Pending</ion-label>\n      <ion-label text-right>{{report.pending_orders}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>Completed</ion-label>\n      <ion-label text-right>{{report.completed_orders}}</ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/report/report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__["a" /* HttpNativeProvider */]])
    ], ReportPage);
    return ReportPage;
}());

var Report = /** @class */ (function () {
    function Report() {
    }
    return Report;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewPostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__products_products__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_instagram__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










 /**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewPostPage = /** @class */ (function () {
    function NewPostPage(navCtrl, navParams, http, transfer, camera, loadingCtrl, httpNavtive, base64, fb, storage, instagram) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.httpNavtive = httpNavtive;
        this.base64 = base64;
        this.fb = fb;
        this.storage = storage;
        this.instagram = instagram;
        this.product = { description: '', facebook: false, instagram: false, line: false, id_user: '' };
        storage.get("id_user").then(function (val) {
            _this.product.id_user = val;
            // alert(val);
        });
    }
    NewPostPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
            // alert(JSON.stringify(imageData));
            // this.imageFileName=imageData.file;
            // alert(imageData);
            // this.imageFileName= 'data:image/jpeg;base64,'+imageData;
            // this.base64.encodeFile(imageData).then((base64File: string) => {
            //   alert(base64File);
            // }, (err) => {
            //   console.log(err);
            // });
        }, function (err) {
            console.log(err);
            alert(err);
        });
    };
    NewPostPage.prototype.uploadFile = function () {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'image',
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
        };
        fileTransfer.upload(this.imageURI, 'http://api.nextobe.co.th/products/uploadImg', options)
            .then(function (data) {
            console.log(data + " Uploaded Successfully");
            var respone = JSON.parse(data.response);
            _this.imageFileName = respone.file;
            _this.submit();
            // alert("Image uploaded successfully");
        }, function (err) {
            console.log(err);
        });
    };
    NewPostPage.prototype.submit = function () {
        var _this = this;
        // alert(JSON.stringify(this.product));
        var loader = this.loadingCtrl.create({
            content: "Loading"
        });
        loader.present();
        var url = 'http://api.nextobe.co.th/products/newPost';
        var postParams = { 'description': this.product.description, 'facebook': this.product.facebook, 'instagram': this.product.instagram, 'line': this.product.line,
            'id_user': this.product.id_user, 'image': this.imageFileName };
        var options = { 'Content-Type': 'application/json' };
        this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
            // alert(JSON.stringify(data));
            alert(data.message);
            if (data.status == 200) {
                // this.navCtrl.push(ProductsPage)
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__products_products__["a" /* ProductsPage */]);
                loader.dismiss();
                if (_this.product.instagram) {
                    if (_this.instagram) {
                        if (_this.instagram.isInstalled()) {
                            _this.instagram.share(_this.imageFileName, _this.product.description)
                                .then(function () {
                                loader.dismiss();
                                console.log('Shared!');
                            })
                                .catch(function (error) {
                                console.error(error);
                                loader.dismiss();
                            });
                        }
                    }
                    else {
                        loader.dismiss();
                    }
                }
            }
        });
        // this.http.uploadFile("http://api.nextobe.co.th/auth/uploadfile",{},{},this.file.name,"file").then( (x)=>alert(1));
    };
    NewPostPage.prototype.btninstagram = function () {
        if (this.instagram.isInstalled()) {
            this.instagram.share(this.imageFileName, this.product.description)
                .then(function () {
                console.log('Shared!');
            })
                .catch(function (error) { return console.error(error); });
        }
    };
    NewPostPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewProductPage');
    };
    NewPostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-new-post',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/new-post/new-post.html"*/'<!--\n  Generated template for the NewProductPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n      <ion-title>New Post</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n    <ion-list>\n      <ion-item>\n        <button ion-button color="secondary" (click)="getImage()">Get Image</button>\n      </ion-item>\n      <ion-item>\n          <h4>Image Preview</h4>\n          <p>{{imageURI}}"</p>\n        </ion-item>\n      <ion-item>\n        <ion-label stacked>Description</ion-label>\n        <ion-textarea [(ngModel)]="product.description" placeholder="Enter a description"></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-list>\n      <ion-item>\n        <ion-label>Facebook</ion-label>\n        <ion-checkbox [(ngModel)]="product.facebook" ></ion-checkbox>\n      </ion-item> \n      <ion-item>\n        <ion-label>Instagram</ion-label>\n        <ion-checkbox [(ngModel)]="product.instagram" ></ion-checkbox>\n      </ion-item> \n      <ion-item>\n        <ion-label>Line</ion-label>\n        <ion-checkbox [(ngModel)]="product.line" ></ion-checkbox>\n      </ion-item> \n    </ion-list>\n    <button ion-button block (click)="uploadFile()">Submit</button>\n  \n  </ion-content>\n  '/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/new-post/new-post.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_http_native_http_native__["a" /* HttpNativeProvider */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_instagram__["a" /* Instagram */]])
    ], NewPostPage);
    return NewPostPage;
}());

//# sourceMappingURL=new-post.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(239);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_signup_signup__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_profile_profile__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_products_products__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_orders_orders__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_report_report__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_new_product_new_product__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_select_product_select_product__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_detail_detail__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_new_order_new_order__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_order_detail_order_detail__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_add_shipping_add_shipping__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_new_post_new_post__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_facebook__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_file__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_camera__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_file_transfer__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_instagram__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_in_app_browser__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_diagnostic__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_photo_library__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_base64__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_clipboard__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_products_products__["a" /* ProductsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_new_product_new_product__["a" /* NewProductPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_select_product_select_product__["a" /* SelectProductPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_order_detail_order_detail__["a" /* OrderDetailPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_new_post_new_post__["a" /* NewPostPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_add_shipping_add_shipping__["a" /* AddShippingPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_new_order_new_order__["a" /* NewOrderPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_detail_detail__["a" /* DetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_21__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_products_products__["a" /* ProductsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_select_product_select_product__["a" /* SelectProductPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_new_product_new_product__["a" /* NewProductPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_add_shipping_add_shipping__["a" /* AddShippingPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_new_post_new_post__["a" /* NewPostPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_new_order_new_order__["a" /* NewOrderPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_order_detail_order_detail__["a" /* OrderDetailPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_detail_detail__["a" /* DetailPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_instagram__["a" /* Instagram */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_base64__["a" /* Base64 */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_photo_library__["a" /* PhotoLibrary */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_clipboard__["a" /* Clipboard */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_facebook__["a" /* Facebook */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_20__providers_http_native_http_native__["a" /* HttpNativeProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_products_products__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_orders_orders__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_report_report__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_new_post_new_post__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Post', component: __WEBPACK_IMPORTED_MODULE_9__pages_new_post_new_post__["a" /* NewPostPage */] },
            { title: 'Products', component: __WEBPACK_IMPORTED_MODULE_4__pages_products_products__["a" /* ProductsPage */] },
            { title: 'Orders', component: __WEBPACK_IMPORTED_MODULE_6__pages_orders_orders__["a" /* OrdersPage */] },
            { title: 'Report', component: __WEBPACK_IMPORTED_MODULE_7__pages_report_report__["a" /* ReportPage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectProductPage; });
/* unused harmony export Product */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_order_new_order__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SelectProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SelectProductPage = /** @class */ (function () {
    function SelectProductPage(navCtrl, navParams, storage, httpNavtive) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.httpNavtive = httpNavtive;
        this.items = Array();
        storage.get('id_user').then(function (val) {
            var url = 'http://api.nextobe.co.th/products/getproducts';
            var postParams = { 'id_user': val };
            var options = { 'Content-Type': 'application/json' };
            _this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
                // alert(JSON.stringify(data));
                // alert(data);
                _this.items = [];
                for (var _i = 0, _a = data.products; _i < _a.length; _i++) {
                    var e = _a[_i];
                    _this.items.push({
                        id: e.id_product,
                        name: e.name,
                        price: e.description,
                        sale_price: e.sale_price,
                        image_link: e.image_link
                    });
                }
            });
        });
    }
    SelectProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectProductPage');
    };
    SelectProductPage.prototype.clickItems = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__new_order_new_order__["a" /* NewOrderPage */], {
            item: item
        });
    };
    SelectProductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-select-product',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/select-product/select-product.html"*/'<!--\n  Generated template for the SelectProductPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Select Product</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-row *ngFor="let item of items" (click)="clickItems(item)">\n    <ion-col align-self-center col-3 >\n      <img src="http://api.nextobe.co.th/img/{{item.image_link}}" />\n    </ion-col>\n    <ion-col col-9>\n        <ion-label style="text-overflow: ellipsis;">{{item.name}}</ion-label>\n        <ion-label color="primary">{{item.sale_price| currency:\'฿ \'}}</ion-label>\n    </ion-col>\n    <hr>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/select-product/select-product.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_http_native_http_native__["a" /* HttpNativeProvider */]])
    ], SelectProductPage);
    return SelectProductPage;
}());

var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());

//# sourceMappingURL=select-product.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_product_new_product__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProductsPage = /** @class */ (function () {
    function ProductsPage(navCtrl, navParams, storage, httpNavtive) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.httpNavtive = httpNavtive;
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        storage.get('id_user').then(function (val) {
            var url = 'http://api.nextobe.co.th/products/getproducts';
            var postParams = { 'id_user': val };
            var options = { 'Content-Type': 'application/json' };
            _this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
                // alert(JSON.stringify(data));
                // alert(data);
                _this.items = [];
                for (var _i = 0, _a = data.products; _i < _a.length; _i++) {
                    var e = _a[_i];
                    _this.items.push({
                        id: e.id_product,
                        title: e.name,
                        note: e.description,
                        icon: _this.icons[Math.floor(Math.random() * _this.icons.length)],
                        image: e.image_link
                    });
                }
            });
        });
    }
    ProductsPage.prototype.newProduct = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__new_product_new_product__["a" /* NewProductPage */]);
    };
    ProductsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductsPage');
    };
    ProductsPage.prototype.itemClicked = function (item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], {
            id: item.id
        });
    };
    ProductsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-products',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/products/products.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Products</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <button ion-button block (click)="newProduct()">New Product</button>\n  <ion-list>\n    <ion-item *ngFor="let item of items" (click)="itemClicked(item)">\n      <ion-avatar item-start>\n        <img src="http://api.nextobe.co.th/img/{{item.image}}">\n      </ion-avatar>\n      <h2>{{item.title}}</h2>\n      <p>{{item.note}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/products/products.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_http_native_http_native__["a" /* HttpNativeProvider */]])
    ], ProductsPage);
    return ProductsPage;
}());

//# sourceMappingURL=products.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewOrderPage; });
/* unused harmony export Product */
/* unused harmony export Order */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__orders_orders__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the NewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewOrderPage = /** @class */ (function () {
    function NewOrderPage(navCtrl, navParams, loadingCtrl, httpNavtive, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.httpNavtive = httpNavtive;
        this.storage = storage;
        this.items = new Array();
        this.selecteditems = new Array();
        this.order = new Order();
        this.search_keyword = "";
        storage.get('id_user').then(function (val) {
            _this.order.id_user = val;
        });
        var parameter = this.navParams.get('item');
        if (parameter) {
            var product = new Product();
            product.id = parameter.id_product;
            product.name = parameter.name;
            product.price = parameter.price;
            product.sale_price = parameter.sale_price;
            product.image_link = parameter.image_link;
            this.order.product_total = parameter.sale_price;
            this.order.grand_total = parameter.sale_price;
            this.selecteditems.push(product);
        }
        var parameter2 = this.navParams.get('comment');
        if (parameter2) {
            this.order.customer_name = parameter2.from.name;
            this.order.customer_social = 1;
            this.order.customer_social_id = parameter2.from.name;
        }
    }
    NewOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewOrderPage');
    };
    NewOrderPage.prototype.submit = function () {
        var _this = this;
        // alert(JSON.stringify(this.product));
        var loader = this.loadingCtrl.create({
            content: "Loading"
        });
        loader.present();
        var url = 'http://api.nextobe.co.th/orders/newOrder';
        var postParams = {
            'date': this.order.date,
            'id_user': this.order.id_user,
            'payment': this.order.payment,
            'customer_name': this.order.customer_name,
            'customer_phone': this.order.customer_phone,
            'customer_social': this.order.customer_social,
            'customer_social_id': this.order.customer_social_id,
            'address': this.order.address,
            'product_total': this.order.product_total,
            'grand_total': this.order.grand_total,
        };
        for (var e = 0; e < this.selecteditems.length; e++) {
            postParams['products[' + e + ']'] = this.selecteditems[e];
        }
        var options = { 'Content-Type': 'application/json' };
        this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
            // alert(JSON.stringify(data));
            alert(data.message);
            if (data.status == 200) {
                // this.navCtrl.push(ProductsPage)
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__orders_orders__["a" /* OrdersPage */]);
            }
            loader.dismiss();
        });
    };
    NewOrderPage.prototype.search = function (event) {
        var _this = this;
        // alert(JSON.stringify(event));
        if (this.search_keyword.length > 2) {
            var loader_1 = this.loadingCtrl.create({
                content: "Loading"
            });
            loader_1.present();
            var url = 'http://api.nextobe.co.th/products/getSearch';
            var postParams = {
                'id_user': this.order.id_user,
                'keyword': this.search_keyword
            };
            var options = { 'Content-Type': 'application/json' };
            this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
                // alert(data.message);
                _this.items = [];
                if (data.status == 200) {
                    // alert(JSON.stringify(data));  
                    if (data.products.length > 0) {
                        for (var _i = 0, _a = data.products; _i < _a.length; _i++) {
                            var e = _a[_i];
                            _this.items.push({
                                id: e.id_product,
                                name: e.name,
                                price: e.price,
                                sale_price: e.sale_price,
                                image_link: e.image_link,
                                quantity: 1
                            });
                        }
                    }
                }
                loader_1.dismiss();
            });
        }
    };
    NewOrderPage.prototype.selectedproduct = function (item) {
        this.selecteditems.push(item);
        this.change();
    };
    NewOrderPage.prototype.change = function () {
        var price = 0;
        this.selecteditems.forEach(function (element) {
            price += Number(element.sale_price) * Number(element.quantity);
        });
        this.order.product_total = price;
        this.order.grand_total = price;
    };
    NewOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-new-order',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/new-order/new-order.html"*/'<!--\n  Generated template for the NewOrderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>New Order</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  \n    <h2>Order Info.</h2>\n    <ion-card>\n        <ion-list>\n        <ion-item>\n            <ion-label color="primary" >Date</ion-label>\n            <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="order.date" ></ion-datetime>\n          </ion-item>\n          <ion-item>\n            <ion-label color="primary" >Payment</ion-label>\n            <ion-select [(ngModel)]="order.payment">\n              <ion-option value="Bankwire">Bankwire</ion-option>\n              <ion-option value="Cash on delivery">Cash on delivery</ion-option>\n              <ion-option value="Direct Payment">Direct Payment</ion-option>\n            </ion-select>\n          </ion-item>\n        </ion-list>    \n    </ion-card>\n    <h2>Customer Info.</h2>\n    <ion-card>\n        <ion-list>\n          <ion-item>\n            <ion-label color="primary" >Name</ion-label>\n            <ion-input placeholder="Name" [(ngModel)]="order.customer_name"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label color="primary" >Phone</ion-label>\n            <ion-input placeholder="Phone" [(ngModel)]="order.customer_phone"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label color="primary" >Social</ion-label>\n            <ion-select [(ngModel)]="order.customer_social">\n              <ion-option value="1">Facebook</ion-option>\n              <ion-option value="2">Instagram</ion-option>\n              <ion-option value="3">Line</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label color="primary" >Social ID</ion-label>\n            <ion-input placeholder="Social ID" [(ngModel)]="order.customer_social_id"></ion-input>\n          </ion-item>\n          <ion-item>\n              <ion-label stacked color="primary" >Address</ion-label>\n              <ion-textarea placeholder="Enter a Address" [(ngModel)]="order.address"></ion-textarea>\n            </ion-item>\n        </ion-list>    \n    </ion-card>\n    <h2>Items</h2>\n    <ion-card>\n        <ion-searchbar\n          [(ngModel)]="search_keyword"\n          (ionInput)="search($event.keyCode)">\n        </ion-searchbar>\n        <ion-row *ngFor="let item of items">\n            <ion-col align-self-center col-4 >\n              <img src="http://api.nextobe.co.th/img/{{item.image_link}}" />\n            </ion-col>\n            <ion-col col-8>\n                <ion-label style="text-overflow: ellipsis;">{{item.name}}</ion-label>\n                <ion-label color="primary">{{item.sale_price| currency:\'฿ \'}}</ion-label>\n            </ion-col>\n            <ion-col col-12><a ion-button block (click)="selectedproduct(item)">select this product</a></ion-col>\n        </ion-row>\n        <ion-row *ngIf="!items">\n          <ion-col col-12>No Item</ion-col>\n        </ion-row>\n    </ion-card>\n    <h2>Selected Items</h2>\n    <ion-card>\n        <ion-list>\n          <ion-row *ngFor="let item of selecteditems">\n            <ion-col align-self-center col-3 >\n              <img src="http://api.nextobe.co.th/img/{{item.image_link}}" />\n            </ion-col>\n            <ion-col col-6>\n                <ion-label style="text-overflow: ellipsis;">{{item.name}}</ion-label>\n                <ion-label color="primary">{{item.sale_price| currency:\'฿ \'}}</ion-label>\n            </ion-col>\n            <ion-col align-self-center col-3>\n                <ion-input type="number" text-center (keyup)="change()" placeholder="Number" style="text-align:center" [(ngModel)]="item.quantity" ></ion-input>\n            </ion-col>\n          </ion-row>\n          <ion-item>\n              <ion-label>Product Total</ion-label>\n              <ion-input text-right  type="number" readonly [(ngModel)]="order.product_total"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>Grand Total</ion-label>\n                <ion-input text-right   type="number" readonly [(ngModel)]="order.grand_total"></ion-input>\n              </ion-item>\n        </ion-list>    \n    </ion-card>\n    <a ion-button block (click)="submit()"> Submit</a>\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/new-order/new-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__["a" /* HttpNativeProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], NewOrderPage);
    return NewOrderPage;
}());

var Product = /** @class */ (function () {
    function Product() {
        this.quantity = 1;
    }
    return Product;
}());

var Order = /** @class */ (function () {
    function Order() {
        this.payment = "Bankwire";
        this.customer_social = 1;
    }
    return Order;
}());

//# sourceMappingURL=new-order.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_profile__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, httpNavtive, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpNavtive = httpNavtive;
        this.storage = storage;
        this.user = { email: '', password: '' };
        storage.get('id_user').then(function (val) {
            if (val) {
                // this.storage.remove('id_user');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__profile_profile__["a" /* ProfilePage */]);
            }
        });
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        var url = 'http://api.nextobe.co.th/auth/login';
        var postParams = { 'email': this.user.email, 'password': this.user.password };
        var options = { 'Content-Type': 'application/json' };
        this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
            if (data.status == 200) {
                var user = data.user;
                // alert(JSON.stringify(user));
                _this.storage.set('id_user', user.id_user);
                _this.storage.set('firstname', user.firstname);
                _this.storage.set('lastname', user.lastname);
                _this.storage.set('email', user.email);
                _this.storage.set('phone', user.phone);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__profile_profile__["a" /* ProfilePage */]);
            }
        });
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sign In</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input [(ngModel)]="user.email" autocapitalize=\'off\'  type="text" value=""></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input [(ngModel)]="user.password" autocapitalize=\'off\'  type="password" value=""></ion-input>\n    </ion-item>\n  \n  </ion-list>\n  \n  <div padding>\n      <ion-row>\n          <ion-col>\n              <button ion-button block color="secondary" (click)="login()">Sign In</button>\n          </ion-col>\n          <ion-col>\n               <button ion-button block color="danger" (click)="signup()">Sign Up</button>\n          </ion-col>\n      </ion-row>\n   \n   \n  </div>\n  \n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_http_native_http_native__["a" /* HttpNativeProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_http_native_http_native__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, storage, httpNavtive, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.httpNavtive = httpNavtive;
        this.iab = iab;
        this.isLoggedIn = false;
        storage.forEach(function (value, key, index) {
            if (key == 'firstname') {
                _this.firstname = value;
            }
            else if (key == 'lastname') {
                _this.lastname = value;
            }
            else if (key == 'email') {
                _this.email = value;
            }
            else if (key == 'id_user') {
                _this.id_user = value;
            }
        });
    }
    ProfilePage.prototype.synFacebook = function () {
        var _this = this;
        // Opening a URL and returning an InAppBrowserObject
        var browser = this.iab.create('http://api.nextobe.co.th/products/fblogin/' + this.id_user, '_blank', { location: 'no' });
        browser.show();
        browser.on('loadstop').subscribe(function (event) {
            if (event.url == "http://api.nextobe.co.th/products/fbback/" + _this.id_user) {
                browser.close();
            }
        });
        // Inject scripts, css and more with browser.X
    };
    ProfilePage.prototype.facebooklink = function (accesstoken, social_id) {
        var url = 'http://api.nextobe.co.th/auth/facebookConnction';
        var postParams = { 'id_user': this.id_user, 'accesstoken': accesstoken, 'social_id': social_id };
        var options = { 'Content-Type': 'application/json' };
        this.httpNavtive.post(url, postParams, options).subscribe(function (data) {
            // alert(JSON.stringify(data));
            // alert(data);
            alert(data.message);
        });
    };
    ProfilePage.prototype.synLine = function () {
        // Opening a URL and returning an InAppBrowserObject
        var browser = this.iab.create('http://api.nextobe.co.th/auth/linelogin/' + this.id_user, '_blank', { location: 'no' });
        browser.show();
        // Inject scripts, css and more with browser.X
    };
    ProfilePage.prototype.logout = function () {
        this.storage.remove('id_user');
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/peter/Desktop/hybrid/justone/src/pages/profile/profile.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n      <ion-item>\n          <ion-avatar item-start>\n            <img src="assets/imgs/avatar.png">\n          </ion-avatar>\n          <h2>{{firstname}} {{lastname}}</h2>\n          <p>{{email}}</p>\n        </ion-item>\n      <ion-item (click)="synFacebook()">\n          <img src="assets/imgs/facebook.png" item-start >\n          Facebook\n        <ion-icon name="checkmark-circle" item-end *ngIf="isLoggedIn"></ion-icon>\n      </ion-item>\n      <ion-item >\n          <img src="assets/imgs/instagram.png" item-start>\n          Instagram\n        <ion-icon name="checkmark-circle" item-end></ion-icon>\n      </ion-item>\n      <ion-item (click)="synLine()">\n          <img src="assets/imgs/line.png" item-start>\n          Line\n          <ion-icon name="checkmark-circle" item-end></ion-icon>\n        </ion-item>\n  </ion-list>\n  \n  <button ion-button block color="danger" (click)="logout()">Log Out</button>\n</ion-content>\n'/*ion-inline-end:"/Users/peter/Desktop/hybrid/justone/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_http_native_http_native__["a" /* HttpNativeProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

},[216]);
//# sourceMappingURL=main.js.map