"use strict";
(self["webpackChunktester_test"] = self["webpackChunktester_test"] || []).push([["main"],{

/***/ 8837:
/*!***************************************************!*\
  !*** ./src/app/API/mock/CustomAsyncDataSource.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomAsyncDataSource": () => (/* binding */ CustomAsyncDataSource)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 4505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4383);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 8759);


class CustomAsyncDataSource {
    constructor(funcToCall) {
        this.funcToCall = funcToCall;
        this.elementsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject([]);
        this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
        this.nbOfResultsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(0);
        this.errorDisplaySubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
        this.loading$ = this.loadingSubject.asObservable();
        this.numberOfResults$ = this.nbOfResultsSubject.asObservable();
        this.errorDisplay$ = this.errorDisplaySubject.asObservable();
    }
    connect(collectionViewer) {
        return this.elementsSubject.asObservable();
    }
    disconnect(collectionViewer) {
        this.elementsSubject.complete();
        this.loadingSubject.complete();
        this.nbOfResultsSubject.complete();
        this.errorDisplaySubject.complete();
    }
    load(...args) {
        this.loadingSubject.next(true);
        (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(this.funcToCall(...args))
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(console.log))
            .subscribe((resp) => {
            var _a, _b, _c;
            this.sortOnProp(((_a = resp.resp) === null || _a === void 0 ? void 0 : _a.results) || [], 'name', 'asc');
            this.loadingSubject.next(false);
            this.elementsSubject.next(((_b = resp.resp) === null || _b === void 0 ? void 0 : _b.results) || []);
            this.nbOfResultsSubject.next(((_c = resp.resp) === null || _c === void 0 ? void 0 : _c.totalNumberOfResults) || 0);
            this.errorDisplaySubject.next(resp.error);
        });
    }
    sortOnProp(elsToSort, attrName, direction) {
        const dir = direction === 'asc' ? 1 : -1;
        elsToSort.sort(function (a, b) {
            if (a[attrName] < b[attrName]) {
                return dir * -1;
            }
            if (a[attrName] > b[attrName]) {
                return dir;
            }
            return 0;
        });
    }
}


/***/ }),

/***/ 2313:
/*!************************************!*\
  !*** ./src/app/API/mock/mockDB.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MockDb": () => (/* binding */ MockDb)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class MockDb {
    constructor() {
        this.db = {
            pNetworks: [
            /*  {
              name: 'Bouygues Elec.',
              fluidType: 'PUBLIC',
              networkSensitivity: 'SENSITIVE',
              code: '008970',
              description: 'Réseau Bouygues électrique',
              enabled: true,
              privateNetworkId: '59d5b51f-cb00-3b8a-7f1e-c739da669f41',
            },
            {
              name: 'Orange TRC',
              fluidType: 'PRIVE',
              networkSensitivity: 'NOT_SENSITIVE',
              code: '',
              description: 'jmdqfs dslqmjf sqmdf klmsdq flj dsq lf jds lkfmsdqkl f',
              enabled: true,
              privateNetworkId: '25a75a17-6b4e-7871-53bf-5516ec75d770',
            },
            {
              name: 'Free Mob.',
              fluidType: 'PRIVE',
              networkSensitivity: 'NOT_SENSITIVE',
              code: '0055674',
              description: 'Free Mobile',
              enabled: true,
              privateNetworkId: '25a75a17-6b4e-7871-53bf-5516ec75d770',
            }, */
            ],
        };
    }
}
MockDb.ɵfac = function MockDb_Factory(t) { return new (t || MockDb)(); };
MockDb.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MockDb, factory: MockDb.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 1135:
/*!****************************************************!*\
  !*** ./src/app/API/mock/referentialAPI.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReferentialAPIService": () => (/* binding */ ReferentialAPIService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 4139);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 6587);
/* harmony import */ var src_app_utils_gddUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/gddUtils */ 7512);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _mockDB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mockDB */ 2313);





class ReferentialAPIService {
    constructor(mock) {
        this.mock = mock;
    }
    wrap(content) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)({ content });
    }
    createPrivateNetworkUsingPOST(request, observe = 'body', reportProgress = false) {
        const names = this.mock.db.pNetworks.map((n) => n.name);
        // bug unicité sur le nom
        if (names.includes(request.name)) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpErrorResponse({
                status: 500,
                statusText: 'ORA-00001 ERROR: Unique Constraint Violated',
                url: 'https://fake-url/networks',
            }));
        }
        // bug code obligatoire
        if (!request.code) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpErrorResponse({
                status: 500,
                statusText: 'Field "code" was not provided',
                url: 'https://fake-url/networks',
            }));
        }
        // bug code obligatoire
        if (request.description.length > 64) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpErrorResponse({
                status: 500,
                statusText: 'ORA-01401: Inserted value too large for column',
                url: 'https://fake-url/networks',
            }));
        }
        request.privateNetworkId = src_app_utils_gddUtils__WEBPACK_IMPORTED_MODULE_0__.GddUtils.generateRandomUuid();
        this.mock.db.pNetworks.push(request);
        return this.wrap(request);
    }
    fetchPrivateNetworkUsingGET(query, enabled, page, size, offset, paged, sortSorted, sortUnsorted, unpaged, observe = 'body', reportProgress = false) {
        return this.wrap({
            results: this.mock.db.pNetworks,
            totalNumberOfResults: this.mock.db.pNetworks.length,
        });
    }
}
ReferentialAPIService.ɵfac = function ReferentialAPIService_Factory(t) { return new (t || ReferentialAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_mockDB__WEBPACK_IMPORTED_MODULE_1__.MockDb)); };
ReferentialAPIService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: ReferentialAPIService, factory: ReferentialAPIService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _referentials_private_networks_private_networks_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./referentials/private-networks/private-networks.component */ 3534);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);




const routes = [
    {
        path: 'networks',
        component: _referentials_private_networks_private_networks_component__WEBPACK_IMPORTED_MODULE_0__.PrivateNetworksComponent,
    },
    {
        path: '**',
        redirectTo: 'networks',
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 2816);


class AppComponent {
    constructor() {
        this.title = 'tester-test';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _referentials_private_networks_private_network_form_private_network_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./referentials/private-networks/private-network-form/private-network-form.component */ 4450);
/* harmony import */ var _referentials_private_networks_private_networks_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./referentials/private-networks/private-networks.component */ 3534);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 7317);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 3365);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/progress-spinner */ 4742);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/toolbar */ 9946);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tabs */ 2379);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/dialog */ 5758);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/progress-bar */ 833);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/snack-bar */ 2528);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/expansion */ 2928);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/select */ 1434);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/checkbox */ 1534);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/menu */ 2796);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/icon */ 5590);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/datepicker */ 5818);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/core */ 8133);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/table */ 7217);
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 3672);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/chips */ 1196);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/stepper */ 7650);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/sidenav */ 7216);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/list */ 6131);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/form-field */ 4770);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/radio */ 8390);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/paginator */ 9861);
/* harmony import */ var _referentials_paginated_table_async_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./referentials/paginated-table/async-table.component */ 8693);
/* harmony import */ var _referentials_edition_wrapper_edition_wrapper_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./referentials/edition-wrapper/edition-wrapper.component */ 7819);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-toastr */ 2808);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/overlay */ 4244);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3598);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _referentials_empty_state_empty_state_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./referentials/empty-state/empty-state.component */ 9698);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/sort */ 4316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);









































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ providers: [
        _angular_common__WEBPACK_IMPORTED_MODULE_8__.DatePipe,
        // FileSizePipe,
        { provide: _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_9__.MatBottomSheetRef, useValue: {} },
        { provide: _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_9__.MAT_BOTTOM_SHEET_DATA, useValue: {} },
    ], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__.OverlayModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule,
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        ngx_toastr__WEBPACK_IMPORTED_MODULE_13__.ToastrModule.forRoot(),
        _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButtonModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInputModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_17__.MatProgressSpinnerModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_18__.MatToolbarModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_19__.MatTabsModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_20__.MatDialogModule,
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__.MatProgressBarModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__.MatSnackBarModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_23__.MatExpansionModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_24__.MatSelectModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_25__.MatCheckboxModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__.MatMenuModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_28__.MatSidenavModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_29__.MatListModule,
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_30__.MatDatepickerModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_31__.MatNativeDateModule,
        _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_9__.MatBottomSheetModule,
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_32__.MatChipsModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__.MatSlideToggleModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_34__.MatFormFieldModule,
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_35__.MatStepperModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_36__.MatTableModule,
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_37__.MatRadioModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_38__.MatPaginatorModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_29__.MatListModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_39__.MatSortModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _referentials_private_networks_private_network_form_private_network_form_component__WEBPACK_IMPORTED_MODULE_2__.PrivateNetworkFormComponent,
        _referentials_private_networks_private_networks_component__WEBPACK_IMPORTED_MODULE_3__.PrivateNetworksComponent,
        _referentials_paginated_table_async_table_component__WEBPACK_IMPORTED_MODULE_4__.AsyncTableComponent,
        _referentials_edition_wrapper_edition_wrapper_component__WEBPACK_IMPORTED_MODULE_5__.EditionWrapperComponent,
        _referentials_empty_state_empty_state_component__WEBPACK_IMPORTED_MODULE_6__.EmptyStateComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__.OverlayModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule,
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, ngx_toastr__WEBPACK_IMPORTED_MODULE_13__.ToastrModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButtonModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInputModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_17__.MatProgressSpinnerModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_18__.MatToolbarModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_19__.MatTabsModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_20__.MatDialogModule,
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__.MatProgressBarModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__.MatSnackBarModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_23__.MatExpansionModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_24__.MatSelectModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_25__.MatCheckboxModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__.MatMenuModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_28__.MatSidenavModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_29__.MatListModule,
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_30__.MatDatepickerModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_31__.MatNativeDateModule,
        _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_9__.MatBottomSheetModule,
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_32__.MatChipsModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__.MatSlideToggleModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_34__.MatFormFieldModule,
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_35__.MatStepperModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_36__.MatTableModule,
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_37__.MatRadioModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_38__.MatPaginatorModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_29__.MatListModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_39__.MatSortModule] }); })();


/***/ }),

/***/ 7769:
/*!********************************!*\
  !*** ./src/app/model/event.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EVENT_TYPE_MAP": () => (/* binding */ EVENT_TYPE_MAP),
/* harmony export */   "EventProviderEnum": () => (/* binding */ EventProviderEnum),
/* harmony export */   "GddWebappEventCategory": () => (/* binding */ GddWebappEventCategory),
/* harmony export */   "GddWebappEventSeverity": () => (/* binding */ GddWebappEventSeverity),
/* harmony export */   "GddWebappEventType": () => (/* binding */ GddWebappEventType)
/* harmony export */ });
var GddWebappEventType;
(function (GddWebappEventType) {
    GddWebappEventType["UPLOAD_FILE_SUCCESS"] = "UPLOAD_FILE_SUCCESS";
    GddWebappEventType["UPLOAD_CONSULTATION_SUCCESS"] = "UPLOAD_CONSULTATION_SUCCESS";
    GddWebappEventType["UPLOAD_CONSULTATION_FAIL"] = "UPLOAD_CONSULTATION_FAIL";
    GddWebappEventType["UPLOAD_WD_SUCCESS"] = "UPLOAD_WD_SUCCESS";
    GddWebappEventType["UPLOAD_WD_FAIL"] = "UPLOAD_WD_FAIL";
    GddWebappEventType["UPLOAD_FILE_FAIL"] = "UPLOAD_FILE_FAIL";
    GddWebappEventType["DOWNLOAD_FILE_FAIL"] = "DOWNLOAD_FILE_FAIL";
    GddWebappEventType["DB_PURGE_USER_ACTION"] = "DB_PURGE_USER_ACTION";
    GddWebappEventType["RESET_WS_FORGOT_PIN"] = "RESET_WS_FORGOT_PIN";
    GddWebappEventType["EVENT_DB_INIT"] = "EVENT_DB_INIT";
    GddWebappEventType["RESET_WS_USER_ACTION"] = "RESET_WS_USER_ACTION";
    GddWebappEventType["RESET_WS_USER_CHANGE"] = "RESET_WS_USER_CHANGE";
    GddWebappEventType["CREATE_WS"] = "CREATE_WS";
    GddWebappEventType["SEND_EVENTS_FAIL"] = "SEND_EVENTS_FAIL";
    GddWebappEventType["FAILED_TO_FETCH_REMOTE_CONF"] = "FAILED_TO_FETCH_REMOTE_CONF";
    GddWebappEventType["MISSING_REMOTE_CONF_PROPERTY"] = "MISSING_REMOTE_CONF_PROPERTY";
    GddWebappEventType["UNKNOWN"] = "UNKNOWN";
})(GddWebappEventType || (GddWebappEventType = {}));
var GddWebappEventCategory;
(function (GddWebappEventCategory) {
    GddWebappEventCategory["BUSINESS"] = "BUSINESS";
    GddWebappEventCategory["DEBUG"] = "DEBUG";
    GddWebappEventCategory["TECHNICAL"] = "TECHNICAL";
    GddWebappEventCategory["UNKNOWN"] = "UNKNOWN";
})(GddWebappEventCategory || (GddWebappEventCategory = {}));
var GddWebappEventSeverity;
(function (GddWebappEventSeverity) {
    GddWebappEventSeverity["DEBUG"] = "DEBUG";
    GddWebappEventSeverity["INFO"] = "INFO";
    GddWebappEventSeverity["WARN"] = "WARN";
    GddWebappEventSeverity["ERROR"] = "ERROR";
    GddWebappEventSeverity["FATAL"] = "FATAL";
})(GddWebappEventSeverity || (GddWebappEventSeverity = {}));
var EventProviderEnum;
(function (EventProviderEnum) {
    EventProviderEnum["GDD_FRONTEND"] = "GDD_FRONTEND";
})(EventProviderEnum || (EventProviderEnum = {}));
const EVENT_TYPE_MAP = {
    UPLOAD_FILE_SUCCESS: {
        title: `Soumission d\'un fichier réussie`,
        severity: GddWebappEventSeverity.INFO,
        message: 'File with external UUID /$/externalUuid/$/ successfully uploaded',
    },
    //TODO
    UPLOAD_CONSULTATION_SUCCESS: {
        title: `Création d'une consultation réussie`,
        severity: GddWebappEventSeverity.INFO,
        message: 'Successfully created consultation /$/externalUuid/$/',
    },
    UPLOAD_WD_SUCCESS: {
        title: `Création d'une DT réussie`,
        severity: GddWebappEventSeverity.INFO,
        message: 'Successfully created WD /$/externalUuid/$/',
    },
    UPLOAD_FILE_FAIL: {
        title: `Erreur de soumission d\'un fichier`,
        severity: GddWebappEventSeverity.ERROR,
        message: '/$/messagePrecision/$/ (fichier: /$/filename/$/)',
    },
    DOWNLOAD_FILE_FAIL: {
        title: `Erreur de téléchargement d\'un fichier`,
        severity: GddWebappEventSeverity.ERROR,
        message: '/$/messagePrecision/$/ (fichier: /$/filename/$/)',
    },
    //TODO
    UPLOAD_CONSULTATION_FAIL: {
        title: `Echec de création d'une consultation`,
        severity: GddWebappEventSeverity.ERROR,
        message: 'Failed to create consultation /$/externalUuid/$/',
    },
    UPLOAD_WD_FAIL: {
        title: `Echec de création d'une DT`,
        severity: GddWebappEventSeverity.ERROR,
        message: 'Failed to create WD /$/externalUuid/$/',
    },
    DB_PURGE_USER_ACTION: {
        title: `Purge des données locales`,
        severity: GddWebappEventSeverity.WARN,
        message: 'The application data was purged',
    },
    RESET_WS_FORGOT_PIN: {
        title: `Reinitialisation mot de passe oublié`,
        severity: GddWebappEventSeverity.WARN,
        message: 'The application was reset because of forgotten code pin',
    },
    RESET_WS_USER_CHANGE: {
        title: `Reinitialisation changement d'utilisateur`,
        severity: GddWebappEventSeverity.WARN,
        message: 'The application was reset because of forgotten code pin',
    },
    RESET_WS_USER_ACTION: {
        title: `Reinitialisation manuelle`,
        severity: GddWebappEventSeverity.WARN,
        message: 'The application was reset by the user',
    },
    EVENT_DB_INIT: {
        title: `Initialisation de la base d\'évènement`,
        severity: GddWebappEventSeverity.INFO,
        message: 'The event database was initialized',
    },
    CREATE_WS: {
        title: `Création de l'espace de travail`,
        severity: GddWebappEventSeverity.INFO,
        message: 'Workspace was initialized',
    },
    SEND_EVENTS_FAIL: {
        title: `Erreur à l'envoi des évènements`,
        severity: GddWebappEventSeverity.ERROR,
        message: 'An error occured while sending the events to the server',
    },
    UNKNOWN: {
        title: `Évènement de type inconnu`,
        severity: GddWebappEventSeverity.ERROR,
        message: 'An unknown event occured',
    },
    FAILED_TO_FETCH_REMOTE_CONF: {
        title: `Impossible de récupérer la configuration distante`,
        severity: GddWebappEventSeverity.ERROR,
        message: 'Could not fetch remote configuration',
    },
    MISSING_REMOTE_CONF_PROPERTY: {
        title: `Propriété de configuration distante manquante`,
        severity: GddWebappEventSeverity.WARN,
        message: 'The remote configuration property /$/property/$/ was not received',
    },
};


/***/ }),

/***/ 6756:
/*!********************************************!*\
  !*** ./src/app/model/privateNetworkDto.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FLUID_TYPE_LABELS": () => (/* binding */ FLUID_TYPE_LABELS),
/* harmony export */   "FluidTypeEnum": () => (/* binding */ FluidTypeEnum),
/* harmony export */   "NETWORK_LOCATION_LABELS": () => (/* binding */ NETWORK_LOCATION_LABELS),
/* harmony export */   "NETWORK_SENSITIVITY_LABELS": () => (/* binding */ NETWORK_SENSITIVITY_LABELS),
/* harmony export */   "NetworkLocationEnum": () => (/* binding */ NetworkLocationEnum),
/* harmony export */   "NetworkSensitivityEnum": () => (/* binding */ NetworkSensitivityEnum)
/* harmony export */ });
var FluidTypeEnum;
(function (FluidTypeEnum) {
    FluidTypeEnum["PUBLIC"] = "PUBLIC";
    FluidTypeEnum["PRIVE"] = "PRIVE";
})(FluidTypeEnum || (FluidTypeEnum = {}));
const FLUID_TYPE_LABELS = {
    PUBLIC: 'Public',
    PRIVE: 'Privé',
};
var NetworkLocationEnum;
(function (NetworkLocationEnum) {
    NetworkLocationEnum["AERIAL"] = "AERIAL";
    NetworkLocationEnum["UNDERGROUND"] = "UNDERGROUND";
    NetworkLocationEnum["AERIAL_AND_UNDERGROUND"] = "AERIAL_AND_UNDERGROUND";
})(NetworkLocationEnum || (NetworkLocationEnum = {}));
const NETWORK_LOCATION_LABELS = {
    AERIAL: 'Aérien',
    UNDERGROUND: 'Souterrain',
    AERIAL_AND_UNDERGROUND: 'Aérien et souterrain',
};
var NetworkSensitivityEnum;
(function (NetworkSensitivityEnum) {
    NetworkSensitivityEnum["NOT_SENSITIVE"] = "NOT_SENSITIVE";
    NetworkSensitivityEnum["SENSITIVE"] = "SENSITIVE";
})(NetworkSensitivityEnum || (NetworkSensitivityEnum = {}));
const NETWORK_SENSITIVITY_LABELS = {
    NOT_SENSITIVE: 'Non sensible',
    SENSITIVE: 'Sensible',
};


/***/ }),

/***/ 7819:
/*!***************************************************************************!*\
  !*** ./src/app/referentials/edition-wrapper/edition-wrapper.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditionWrapperComponent": () => (/* binding */ EditionWrapperComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 5758);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 7317);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/progress-bar */ 833);






function EditionWrapperComponent_mat_progress_bar_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 11);
} }
const _c0 = function (a0, a1) { return { loading: a0, "fullscreen-dialog": a1 }; };
const _c1 = function (a0) { return { container: a0 }; };
const _c2 = ["*"];
class EditionWrapperComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.isFullScreenDialog = false;
        this.wasFormModified = true;
        this.confirmText = 'Confirmer';
        this.isConfirmDisabled = false;
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this.confirm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    ngOnInit() { }
    onCancelClick() {
        if (!this.isUpdateOngoing) {
            if (this.wasFormModified) {
                /* const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                  disableClose: false,
                  autoFocus: false,
                  data: {
                    title: 'Quitter la page',
                    paragraphs: [
                      'Etes-vous sûr de vouloir quitter la page ?',
                      'Toutes les données saisies seront perdues.',
                    ],
                    cancelLabel: 'Annuler',
                    confirmLabel: 'Fermer',
                  },
                });
                dialogRef.componentInstance.decision.subscribe(async (confirm: any) => {
                  if (confirm) {
                    this.cancel.emit();
                  }
                  dialogRef.close();
                });
              } else {
                this.cancel.emit();
              } */
            }
        }
    }
    onValidateClick() {
        if (!this.isConfirmDisabled && !this.isUpdateOngoing) {
            this.confirm.emit();
        }
    }
}
EditionWrapperComponent.ɵfac = function EditionWrapperComponent_Factory(t) { return new (t || EditionWrapperComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialog)); };
EditionWrapperComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EditionWrapperComponent, selectors: [["app-edition-wrapper"]], inputs: { isUpdateOngoing: "isUpdateOngoing", isFullScreenDialog: "isFullScreenDialog", wasFormModified: "wasFormModified", title: "title", confirmText: "confirmText", isConfirmDisabled: "isConfirmDisabled" }, outputs: { cancel: "cancel", confirm: "confirm" }, ngContentSelectors: _c2, decls: 16, vars: 14, consts: [["mode", "indeterminate", 4, "ngIf"], [1, "dialog", 3, "ngClass"], [3, "ngClass"], [1, "dialog__header"], [1, "dialog__title"], [1, "dialog__close-button"], [1, "gdd-icon", "gdd-icon__close"], [1, "dialog__content"], [1, "dialog__actions"], ["mat-button", "", "mat-dialog-close", "", 1, "btn-md"], ["mat-flat-button", "", "color", "primary", 1, "btn-md", 3, "disabled", "click"], ["mode", "indeterminate"]], template: function EditionWrapperComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, EditionWrapperComponent_mat_progress_bar_0_Template, 1, 0, "mat-progress-bar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8)(11, "div", 2)(12, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Annuler");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditionWrapperComponent_Template_button_click_14_listener() { return ctx.onValidateClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isUpdateOngoing);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](7, _c0, ctx.isUpdateOngoing, ctx.isFullScreenDialog));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](10, _c1, ctx.isFullScreenDialog));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](12, _c1, ctx.isFullScreenDialog));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isConfirmDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.confirmText, " ");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogClose, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__.MatProgressBar], styles: [".container[_ngcontent-%COMP%] {\n  max-width: 65rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRpb24td3JhcHBlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0FBQ0oiLCJmaWxlIjoiZWRpdGlvbi13cmFwcGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XHJcbiAgICBtYXgtd2lkdGg6IDY1cmVtO1xyXG59Il19 */"] });


/***/ }),

/***/ 9698:
/*!*******************************************************************!*\
  !*** ./src/app/referentials/empty-state/empty-state.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmptyStateComponent": () => (/* binding */ EmptyStateComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6362);


const _c0 = ["*"];
class EmptyStateComponent {
    constructor() {
        this.illustrationType = 'documents';
    }
}
EmptyStateComponent.ɵfac = function EmptyStateComponent_Factory(t) { return new (t || EmptyStateComponent)(); };
EmptyStateComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EmptyStateComponent, selectors: [["app-empty-state"]], inputs: { illustrationType: "illustrationType" }, ngContentSelectors: _c0, decls: 3, vars: 1, consts: [[1, "empty-state"], [1, "illustration", 3, "ngClass"]], template: function EmptyStateComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 0, ["class", ""]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.illustrationType);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass], styles: ["@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('MaterialIcons.09e0a961d5a9fe9f.woff2') format(\"woff2\");\n}\n@font-face {\n  font-family: \"Material Icons Outlined\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('MaterialIconsOutlined.c02c0a5905a4f2f1.woff2') format(\"woff2\");\n}\n@font-face {\n  font-family: \"Poppins-Regular\";\n  src: url('Poppins-Regular.e3fe7ebf149d0933.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Poppins-Medium\";\n  src: url('Poppins-Medium.98591b8ee50c8033.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Poppins-ExtraLight\";\n  src: url('Poppins-ExtraLight.9102fb8415d8f327.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Poppins-Light\";\n  src: url('Poppins-Light.8b20023e8f811f53.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Poppins-SemiBold\";\n  src: url('Poppins-SemiBold.ba60cfd693c39204.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Poppins-Bold\";\n  src: url('Poppins-Bold.8001a01b32b71ef5.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"WorkSans-Light\";\n  src: url('WorkSans-Light.d2df7f6ddc3cf805.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"WorkSans-Regular\";\n  src: url('WorkSans-Regular.036e266b9cdbae6f.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"WorkSans-Medium\";\n  src: url('WorkSans-Medium.fab95ee371426d73.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"WorkSans-SemiBold\";\n  src: url('WorkSans-SemiBold.a06aa911f941ada0.ttf');\n  font-weight: normal;\n  font-style: normal;\n}\n[_ngcontent-%COMP%]:root {\n  --color-primary: #155eef;\n  --color-primary-1: #0040c1;\n  --color-primary-disabled: #b2ccff;\n  --color-background-neutral-1: #f9f9fb;\n  --color-background-neutral-2: #eef1f5;\n  --color-background-neutral-3: #dcdfea;\n  --color-background-primary-1: #f5f8ff;\n  --color-background-primary-2: #eff4ff;\n  --color-text-neutral-heading: #111322;\n  --color-text-neutral-body: #404968;\n  --color-text-neutral-subtitle: #5d6b98;\n  --color-text-primary-heading: var(--color-primary-1);\n  --color-text-primary-body: var(--color-primary-1);\n  --color-text-primary-subtitle: var(--color-primary);\n  --color-icon: #7d89b0;\n  --color-background-modulebar: var(--color-background-neutral-2);\n  --color-background-sidenav: var(--color-background-neutral-1);\n  --color-sidenav-selected: #d1e0ff;\n  --color-app-background: #ffffff;\n  --color-divider: #dcdfea;\n  --color-divider-darker: #b9c0d4;\n  --color-green: #12b76a;\n  --color-green-lighter: #d1fadf;\n  --color-green-lightest: #ecfdf3;\n  --color-green-darker: #027a48;\n  --color-green-darkest: #054f31;\n  --color-blue: #2970ff;\n  --color-blue-lighter: #d1e0ff;\n  --color-blue-lightest: #eff4ff;\n  --color-blue-darker: #004eeb;\n  --color-blue-darkest: #00359e;\n  --color-red: #f04438;\n  --color-red-lighter: #fee4e2;\n  --color-red-lightest: #fef3f2;\n  --color-red-darker: #b42318;\n  --color-red-darkest: #7a271a;\n  --color-orange: #fdb022;\n  --color-orange-lighter: #fef0c7;\n  --color-orange-lightest: #fffaeb;\n  --color-orange-darker: #b54708;\n  --color-orange-darkest: #7a2e0e;\n}\n.dark-mode[_ngcontent-%COMP%] {\n  --color-background-neutral-1: #30374F;\n  --color-background-neutral-2: #404968;\n  --color-background-neutral-3: #4A5578;\n  --color-background-primary-1: #00359E;\n  --color-background-primary-2: #0040C1;\n  --color-text-neutral-heading: #FFFFFF;\n  --color-text-neutral-body: #F9F9FB;\n  --color-text-neutral-subtitle: #EFF1F5;\n  --color-text-primary-heading: #F5F8FF;\n  --color-text-primary-body: #EEF4FF;\n  --color-text-primary-subtitle: #E0EAFF;\n  --color-icon: #B9C0D4;\n  --color-background-modulebar: var(--color-background-neutral-2);\n  --color-background-sidenav: var(--color-background-neutral-1);\n  --color-sidenav-selected: #d1e0ff;\n  --color-app-background: var(--color-background-neutral-1);\n  --color-divider: #4A5578;\n  --color-divider-darker: #5D6B98;\n}\n.empty-state[_ngcontent-%COMP%] {\n  margin-bottom: 4em;\n  color: #a3abc9;\n  text-align: center;\n}\n.empty-state[_ngcontent-%COMP%]   .illustration[_ngcontent-%COMP%] {\n  margin: auto;\n  margin-bottom: 0.5em;\n  width: 14em;\n  height: 8.5em;\n  background-size: 100%;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.empty-state[_ngcontent-%COMP%]   .illustration.documents[_ngcontent-%COMP%] {\n  background-image: url('no_documents.d0ce79c3a8183552.svg');\n}\n.empty-state[_ngcontent-%COMP%]   .illustration.box[_ngcontent-%COMP%] {\n  background-image: url('no_operations.889e9d89a99f44fe.svg');\n}\n.empty-state[_ngcontent-%COMP%]   .illustration.thumbs-up[_ngcontent-%COMP%] {\n  background-image: url('no_constats.c19608bf41155dfb.svg');\n}\n.empty-state[_ngcontent-%COMP%]   .illustration.comments[_ngcontent-%COMP%] {\n  background-image: url('no_comments.fdf99b514536d767.svg');\n}\n.empty-state[_ngcontent-%COMP%]   .illustration.unaccessible[_ngcontent-%COMP%] {\n  background-image: url('no_resource.e3a0e25efe2b28ba.svg');\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Fzc2V0cy9zY3NzL192YXJpYWJsZXMuc2NzcyIsImVtcHR5LXN0YXRlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBO0VBQ0UsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnRUFBQTtBQ1JGO0FEV0E7RUFDRSxzQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHdFQUFBO0FDVEY7QURZQTtFQUNFLDhCQUFBO0VBQ0EsZ0RBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDVkY7QURhQTtFQUNFLDZCQUFBO0VBQ0EsK0NBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDWEY7QURjQTtFQUNFLGlDQUFBO0VBQ0EsbURBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDWkY7QURlQTtFQUNFLDRCQUFBO0VBQ0EsOENBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDYkY7QURnQkE7RUFDRSwrQkFBQTtFQUNBLGlEQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQ2RGO0FEaUJBO0VBQ0UsMkJBQUE7RUFDQSw2Q0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUNmRjtBRGtCQTtFQUNFLDZCQUFBO0VBQ0EsK0NBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDaEJGO0FEbUJBO0VBQ0UsK0JBQUE7RUFDQSxpREFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUNqQkY7QURvQkE7RUFDRSw4QkFBQTtFQUNBLGdEQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQ2xCRjtBRHFCQTtFQUNFLGdDQUFBO0VBQ0Esa0RBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDbkJGO0FEcUVBO0VBQ0Usd0JBQUE7RUFDQSwwQkFBQTtFQUNBLGlDQUFBO0VBRUEscUNBQUE7RUFDQSxxQ0FBQTtFQUNBLHFDQUFBO0VBRUEscUNBQUE7RUFDQSxxQ0FBQTtFQUVBLHFDQUFBO0VBQ0Esa0NBQUE7RUFDQSxzQ0FBQTtFQUVBLG9EQUFBO0VBQ0EsaURBQUE7RUFDQSxtREFBQTtFQUVBLHFCQUFBO0VBRUEsK0RBQUE7RUFDQSw2REFBQTtFQUNBLGlDQUFBO0VBRUEsK0JBQUE7RUFFQSx3QkFBQTtFQUNBLCtCQUFBO0VBRUEsc0JBQUE7RUFDQSw4QkFBQTtFQUNBLCtCQUFBO0VBQ0EsNkJBQUE7RUFDQSw4QkFBQTtFQUVBLHFCQUFBO0VBQ0EsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFFQSxvQkFBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFDQSwyQkFBQTtFQUNBLDRCQUFBO0VBRUEsdUJBQUE7RUFDQSwrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsOEJBQUE7RUFDQSwrQkFBQTtBQy9FRjtBRGtGQTtFQUNJLHFDQUFBO0VBQ0EscUNBQUE7RUFDQSxxQ0FBQTtFQUVBLHFDQUFBO0VBQ0EscUNBQUE7RUFFQSxxQ0FBQTtFQUNBLGtDQUFBO0VBQ0Esc0NBQUE7RUFFQSxxQ0FBQTtFQUNBLGtDQUFBO0VBQ0Esc0NBQUE7RUFFQSxxQkFBQTtFQUVBLCtEQUFBO0VBQ0EsNkRBQUE7RUFDQSxpQ0FBQTtFQUVBLHlEQUFBO0VBRUEsd0JBQUE7RUFDQSwrQkFBQTtBQ3RGSjtBQXZJQTtFQUNFLGtCQUFBO0VBQ0EsY0RpR3FCO0VDaEdyQixrQkFBQTtBQTBJRjtBQXhJRTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7RUFDQSw0QkFBQTtFQUNBLDJCQUFBO0FBMElKO0FBeElJO0VBQ0UsMERBQUE7QUEwSU47QUF2SUk7RUFDRSwyREFBQTtBQXlJTjtBQXRJSTtFQUNFLHlEQUFBO0FBd0lOO0FBcklJO0VBQ0UseURBQUE7QUF1SU47QUFwSUk7RUFDRSx5REFBQTtBQXNJTiIsImZpbGUiOiJlbXB0eS1zdGF0ZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRvIGtlZXAgY29oZXJlbnQgd2l0aCBicmVha3BvaW50cyBpbiBjb25maWcuY29uc3RhdHMudHNcclxuJGJyZWFrcG9pbnQtbW9iaWxlOiA2MDBweDtcclxuJGJyZWFrcG9pbnQtdGFibGV0LXNtOiA4MDBweDtcclxuJGJyZWFrcG9pbnQtdGFibGV0LWxnOiAxMDI0cHg7XHJcblxyXG4kcGFkZGluZy1tb2JpbGU6IDFyZW07XHJcbiRwYWRkaW5nLXRhYmxldDogMS41cmVtO1xyXG5cclxuLy8gaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29uc1xyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29uc1wiO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XHJcbiAgc3JjOiB1cmwofnNyYy9hc3NldHMvZm9udHMvTWF0ZXJpYWxJY29ucy53b2ZmMikgZm9ybWF0KFwid29mZjJcIik7XHJcbn1cclxuLy8gaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucytPdXRsaW5lZFxyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29ucyBPdXRsaW5lZFwiO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XHJcbiAgc3JjOiB1cmwofnNyYy9hc3NldHMvZm9udHMvTWF0ZXJpYWxJY29uc091dGxpbmVkLndvZmYyKSBmb3JtYXQoXCJ3b2ZmMlwiKTtcclxufVxyXG5cclxuQGZvbnQtZmFjZSB7XHJcbiAgZm9udC1mYW1pbHk6IFwiUG9wcGlucy1SZWd1bGFyXCI7XHJcbiAgc3JjOiB1cmwoXCJ+c3JjL2Fzc2V0cy9mb250cy9Qb3BwaW5zLVJlZ3VsYXIudHRmXCIpO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG59XHJcblxyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogXCJQb3BwaW5zLU1lZGl1bVwiO1xyXG4gIHNyYzogdXJsKFwifnNyYy9hc3NldHMvZm9udHMvUG9wcGlucy1NZWRpdW0udHRmXCIpO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG59XHJcblxyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogXCJQb3BwaW5zLUV4dHJhTGlnaHRcIjtcclxuICBzcmM6IHVybChcIn5zcmMvYXNzZXRzL2ZvbnRzL1BvcHBpbnMtRXh0cmFMaWdodC50dGZcIik7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbn1cclxuXHJcbkBmb250LWZhY2Uge1xyXG4gIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnMtTGlnaHRcIjtcclxuICBzcmM6IHVybChcIn5zcmMvYXNzZXRzL2ZvbnRzL1BvcHBpbnMtTGlnaHQudHRmXCIpO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG59XHJcblxyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogXCJQb3BwaW5zLVNlbWlCb2xkXCI7XHJcbiAgc3JjOiB1cmwoXCJ+c3JjL2Fzc2V0cy9mb250cy9Qb3BwaW5zLVNlbWlCb2xkLnR0ZlwiKTtcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxufVxyXG5cclxuQGZvbnQtZmFjZSB7XHJcbiAgZm9udC1mYW1pbHk6IFwiUG9wcGlucy1Cb2xkXCI7XHJcbiAgc3JjOiB1cmwoXCJ+c3JjL2Fzc2V0cy9mb250cy9Qb3BwaW5zLUJvbGQudHRmXCIpO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG59XHJcblxyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogXCJXb3JrU2Fucy1MaWdodFwiO1xyXG4gIHNyYzogdXJsKFwifnNyYy9hc3NldHMvZm9udHMvV29ya1NhbnMtTGlnaHQudHRmXCIpO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG59XHJcblxyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogXCJXb3JrU2Fucy1SZWd1bGFyXCI7XHJcbiAgc3JjOiB1cmwoXCJ+c3JjL2Fzc2V0cy9mb250cy9Xb3JrU2Fucy1SZWd1bGFyLnR0ZlwiKTtcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxufVxyXG5cclxuQGZvbnQtZmFjZSB7XHJcbiAgZm9udC1mYW1pbHk6IFwiV29ya1NhbnMtTWVkaXVtXCI7XHJcbiAgc3JjOiB1cmwoXCJ+c3JjL2Fzc2V0cy9mb250cy9Xb3JrU2Fucy1NZWRpdW0udHRmXCIpO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG59XHJcblxyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogXCJXb3JrU2Fucy1TZW1pQm9sZFwiO1xyXG4gIHNyYzogdXJsKFwifnNyYy9hc3NldHMvZm9udHMvV29ya1NhbnMtU2VtaUJvbGQudHRmXCIpO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG59XHJcblxyXG4vLyBEZXNpZ24gU3lzdGVtIExpZ2h0IFBhbGV0dGVcclxuJGxpZ2h0LWJhY2tncm91bmQtMTogI2ZmZjtcclxuJGxpZ2h0LWJhY2tncm91bmQtMjogI2Y5ZmNmZjtcclxuJGxpZ2h0LWJhY2tncm91bmQtMzogI2Y0ZjlmZjtcclxuJGxpZ2h0LXByaW1hcnk6ICMzOTRlOTg7XHJcbiRsaWdodC1tYWluLXRleHQ6ICMwYzI3M2U7XHJcbiRsaWdodC1zZWNvbmRhcnktdGV4dDogI2EzYWJjOTtcclxuJGxpZ2h0LWRpc2FibGVkOiAjYTNhYmM5O1xyXG4kbGlnaHQtZGl2aWRlcjogI2RjZTRmMjtcclxuJGxpZ2h0LWFjY2VudC0xOiAjMTM3M2YzO1xyXG4kbGlnaHQtYWNjZW50LTI6ICM4OGI4Zjk7XHJcblxyXG4vLyBEZXNpZ24gU3lzdGVtIERhcmsgUGFsZXR0ZVxyXG4kZGFyay1iYWNrZ3JvdW5kLTE6ICMzOTRlOTg7XHJcbiRkYXJrLWJhY2tncm91bmQtMjogIzEzNzNmMztcclxuJGRhcmstcHJpbWFyeTogI2ZmZjtcclxuJGRhcmstbWFpbi10ZXh0OiAjZmZmO1xyXG4kZGFyay1zZWNvbmRhcnktdGV4dDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KTtcclxuJGRhcmstZGlzYWJsZWQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcclxuJGRhcmstZGl2aWRlcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTtcclxuJGRhcmstYWNjZW50LTE6ICNmZmY7XHJcbiRkYXJrLWFjY2VudC0yOiAjMzk0ZTk4O1xyXG5cclxuLy8gT3RoZXIgY29sb3JzXHJcbiRyZWQ6ICNmNTM2Njk7XHJcbiRncmVlbjogIzIyZDc4ODtcclxuJG9yYW5nZTogI2ZmODA0ZjtcclxuJHllbGxvdzogI2UzZDA4MTtcclxuXHJcbi8vIGJsYWNrICYgd2hpdGUgbW9kZWxcclxuJGdyZXktMDogIzJjMmEyYTtcclxuJGdyZXktMGRvdDU6ICM3NTc1NzU7XHJcbiRncmV5LTE6ICM5Yjk5OTk7XHJcbiRncmV5LTI6ICNkOGQ4ZDg7XHJcbiRncmV5LTM6ICNlY2VjZWM7XHJcbiRncmV5LTQ6ICNmNWY1ZjU7XHJcblxyXG5AbWl4aW4gY2FyZC1zaGFkb3cge1xyXG4gIGJveC1zaGFkb3c6IDAgM3B4IDE2cHggcmdiYSg1NywgNzgsIDE1MiwgMC4yNSkgIWltcG9ydGFudDtcclxufVxyXG5cclxuJGNvbG9yLWFjdGl2ZTogIzYwODNjOTtcclxuJGNvbG9yLXdoaXRlOiB3aGl0ZTtcclxuXHJcbi8vIEJ1dHRvbnMgb24gYWN0aXZpdHkgZm9ybXNcclxuJHdpZHRoLXZhbGlkYXRlLWJ1dHRvbnMtYWN0aXZpdHktZm9ybXM6IDMyMnB4O1xyXG5cclxuOnJvb3Qge1xyXG4gIC0tY29sb3ItcHJpbWFyeTogIzE1NWVlZjtcclxuICAtLWNvbG9yLXByaW1hcnktMTogIzAwNDBjMTtcclxuICAtLWNvbG9yLXByaW1hcnktZGlzYWJsZWQ6ICNiMmNjZmY7XHJcblxyXG4gIC0tY29sb3ItYmFja2dyb3VuZC1uZXV0cmFsLTE6ICNmOWY5ZmI7XHJcbiAgLS1jb2xvci1iYWNrZ3JvdW5kLW5ldXRyYWwtMjogI2VlZjFmNTtcclxuICAtLWNvbG9yLWJhY2tncm91bmQtbmV1dHJhbC0zOiAjZGNkZmVhO1xyXG5cclxuICAtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeS0xOiAjZjVmOGZmO1xyXG4gIC0tY29sb3ItYmFja2dyb3VuZC1wcmltYXJ5LTI6ICNlZmY0ZmY7XHJcblxyXG4gIC0tY29sb3ItdGV4dC1uZXV0cmFsLWhlYWRpbmc6ICMxMTEzMjI7XHJcbiAgLS1jb2xvci10ZXh0LW5ldXRyYWwtYm9keTogIzQwNDk2ODtcclxuICAtLWNvbG9yLXRleHQtbmV1dHJhbC1zdWJ0aXRsZTogIzVkNmI5ODtcclxuXHJcbiAgLS1jb2xvci10ZXh0LXByaW1hcnktaGVhZGluZzogdmFyKC0tY29sb3ItcHJpbWFyeS0xKTtcclxuICAtLWNvbG9yLXRleHQtcHJpbWFyeS1ib2R5OiB2YXIoLS1jb2xvci1wcmltYXJ5LTEpO1xyXG4gIC0tY29sb3ItdGV4dC1wcmltYXJ5LXN1YnRpdGxlOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcclxuXHJcbiAgLS1jb2xvci1pY29uOiAjN2Q4OWIwO1xyXG5cclxuICAtLWNvbG9yLWJhY2tncm91bmQtbW9kdWxlYmFyOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLW5ldXRyYWwtMik7XHJcbiAgLS1jb2xvci1iYWNrZ3JvdW5kLXNpZGVuYXY6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtbmV1dHJhbC0xKTtcclxuICAtLWNvbG9yLXNpZGVuYXYtc2VsZWN0ZWQ6ICNkMWUwZmY7XHJcblxyXG4gIC0tY29sb3ItYXBwLWJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblxyXG4gIC0tY29sb3ItZGl2aWRlcjogI2RjZGZlYTtcclxuICAtLWNvbG9yLWRpdmlkZXItZGFya2VyOiAjYjljMGQ0O1xyXG5cclxuICAtLWNvbG9yLWdyZWVuOiAjMTJiNzZhO1xyXG4gIC0tY29sb3ItZ3JlZW4tbGlnaHRlcjogI2QxZmFkZjtcclxuICAtLWNvbG9yLWdyZWVuLWxpZ2h0ZXN0OiAjZWNmZGYzO1xyXG4gIC0tY29sb3ItZ3JlZW4tZGFya2VyOiAjMDI3YTQ4O1xyXG4gIC0tY29sb3ItZ3JlZW4tZGFya2VzdDogIzA1NGYzMTtcclxuXHJcbiAgLS1jb2xvci1ibHVlOiAjMjk3MGZmO1xyXG4gIC0tY29sb3ItYmx1ZS1saWdodGVyOiAjZDFlMGZmO1xyXG4gIC0tY29sb3ItYmx1ZS1saWdodGVzdDogI2VmZjRmZjtcclxuICAtLWNvbG9yLWJsdWUtZGFya2VyOiAjMDA0ZWViO1xyXG4gIC0tY29sb3ItYmx1ZS1kYXJrZXN0OiAjMDAzNTllO1xyXG5cclxuICAtLWNvbG9yLXJlZDogI2YwNDQzODtcclxuICAtLWNvbG9yLXJlZC1saWdodGVyOiAjZmVlNGUyO1xyXG4gIC0tY29sb3ItcmVkLWxpZ2h0ZXN0OiAjZmVmM2YyO1xyXG4gIC0tY29sb3ItcmVkLWRhcmtlcjogI2I0MjMxODtcclxuICAtLWNvbG9yLXJlZC1kYXJrZXN0OiAjN2EyNzFhO1xyXG5cclxuICAtLWNvbG9yLW9yYW5nZTogI2ZkYjAyMjtcclxuICAtLWNvbG9yLW9yYW5nZS1saWdodGVyOiAjZmVmMGM3O1xyXG4gIC0tY29sb3Itb3JhbmdlLWxpZ2h0ZXN0OiAjZmZmYWViO1xyXG4gIC0tY29sb3Itb3JhbmdlLWRhcmtlcjogI2I1NDcwODtcclxuICAtLWNvbG9yLW9yYW5nZS1kYXJrZXN0OiAjN2EyZTBlO1xyXG59XHJcblxyXG4uZGFyay1tb2RlIHtcclxuICAgIC0tY29sb3ItYmFja2dyb3VuZC1uZXV0cmFsLTE6ICMzMDM3NEY7XHJcbiAgICAtLWNvbG9yLWJhY2tncm91bmQtbmV1dHJhbC0yOiAjNDA0OTY4O1xyXG4gICAgLS1jb2xvci1iYWNrZ3JvdW5kLW5ldXRyYWwtMzogIzRBNTU3ODtcclxuXHJcbiAgICAtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeS0xOiAjMDAzNTlFO1xyXG4gICAgLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnktMjogIzAwNDBDMTtcclxuXHJcbiAgICAtLWNvbG9yLXRleHQtbmV1dHJhbC1oZWFkaW5nOiAjRkZGRkZGO1xyXG4gICAgLS1jb2xvci10ZXh0LW5ldXRyYWwtYm9keTogI0Y5RjlGQjtcclxuICAgIC0tY29sb3ItdGV4dC1uZXV0cmFsLXN1YnRpdGxlOiAjRUZGMUY1O1xyXG5cclxuICAgIC0tY29sb3ItdGV4dC1wcmltYXJ5LWhlYWRpbmc6ICNGNUY4RkY7XHJcbiAgICAtLWNvbG9yLXRleHQtcHJpbWFyeS1ib2R5OiAjRUVGNEZGO1xyXG4gICAgLS1jb2xvci10ZXh0LXByaW1hcnktc3VidGl0bGU6ICNFMEVBRkY7XHJcblxyXG4gICAgLS1jb2xvci1pY29uOiAjQjlDMEQ0OyAvLyBPUiAjRENERkVBXHJcblxyXG4gICAgLS1jb2xvci1iYWNrZ3JvdW5kLW1vZHVsZWJhcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1uZXV0cmFsLTIpO1xyXG4gICAgLS1jb2xvci1iYWNrZ3JvdW5kLXNpZGVuYXY6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtbmV1dHJhbC0xKTtcclxuICAgIC0tY29sb3Itc2lkZW5hdi1zZWxlY3RlZDogI2QxZTBmZjtcclxuXHJcbiAgICAtLWNvbG9yLWFwcC1iYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLW5ldXRyYWwtMSk7XHJcblxyXG4gICAgLS1jb2xvci1kaXZpZGVyOiAjNEE1NTc4O1xyXG4gICAgLS1jb2xvci1kaXZpZGVyLWRhcmtlcjogIzVENkI5ODtcclxufVxyXG4iLCJAaW1wb3J0ICd+c3JjL2Fzc2V0cy9zY3NzL3ZhcmlhYmxlcyc7XHJcblxyXG4uZW1wdHktc3RhdGUge1xyXG4gIG1hcmdpbi1ib3R0b206IDRlbTtcclxuICBjb2xvcjogJGxpZ2h0LXNlY29uZGFyeS10ZXh0O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgLmlsbHVzdHJhdGlvbiB7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcclxuICAgIHdpZHRoOiAxNGVtO1xyXG4gICAgaGVpZ2h0OiA4LjVlbTtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcclxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcblxyXG4gICAgJi5kb2N1bWVudHMge1xyXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ35zcmMvYXNzZXRzL2ltYWdlcy9ub19kb2N1bWVudHMuc3ZnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgJi5ib3gge1xyXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ35zcmMvYXNzZXRzL2ltYWdlcy9ub19vcGVyYXRpb25zLnN2ZycpO1xyXG4gICAgfVxyXG5cclxuICAgICYudGh1bWJzLXVwIHtcclxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCd+c3JjL2Fzc2V0cy9pbWFnZXMvbm9fY29uc3RhdHMuc3ZnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgJi5jb21tZW50cyB7XHJcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnfnNyYy9hc3NldHMvaW1hZ2VzL25vX2NvbW1lbnRzLnN2ZycpO1xyXG4gICAgfVxyXG5cclxuICAgICYudW5hY2Nlc3NpYmxlIHtcclxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCd+c3JjL2Fzc2V0cy9pbWFnZXMvbm9fcmVzb3VyY2Uuc3ZnJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 8693:
/*!***********************************************************************!*\
  !*** ./src/app/referentials/paginated-table/async-table.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncTableComponent": () => (/* binding */ AsyncTableComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ 7217);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/sort */ 4316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6362);






function AsyncTableComponent_tr_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 4);
} }
function AsyncTableComponent_tr_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 5);
} }
const _c0 = function (a0, a1) { return { "hidden-from-view": a0, loading: a1 }; };
const _c1 = ["*"];
class AsyncTableComponent {
    constructor() {
        this.numberOfResults = 0;
    }
    set content(content) {
        this.sort = content;
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }
    ngOnInit() {
        this.dataSource.numberOfResults$.subscribe((nb) => (this.numberOfResults = nb));
    }
    ngAfterContentInit() {
        this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    }
}
AsyncTableComponent.ɵfac = function AsyncTableComponent_Factory(t) { return new (t || AsyncTableComponent)(); };
AsyncTableComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AsyncTableComponent, selectors: [["app-async-table"]], contentQueries: function AsyncTableComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatColumnDef, 4);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.columnDefs = _t);
    } }, viewQuery: function AsyncTableComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTable, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_2__.MatSort, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.table = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
    } }, inputs: { dataSource: "dataSource", displayedColumns: "displayedColumns" }, ngContentSelectors: _c1, decls: 6, vars: 9, consts: [[1, "table-wrapper", 3, "ngClass"], ["mat-table", "", 3, "dataSource"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-row", ""], ["mat-row", ""]], template: function AsyncTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, AsyncTableComponent_tr_4_Template, 1, 0, "tr", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, AsyncTableComponent_tr_5_Template, 1, 0, "tr", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](6, _c0, !ctx.numberOfResults, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 4, ctx.dataSource.loading$)));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRow, _angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe], styles: [".td[_ngcontent-%COMP%] {\n  white-space: nowrap !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzeW5jLXRhYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsOEJBQUE7QUFDRiIsImZpbGUiOiJhc3luYy10YWJsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50ZCB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXAgIWltcG9ydGFudDtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 4450:
/*!******************************************************************************************************!*\
  !*** ./src/app/referentials/private-networks/private-network-form/private-network-form.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivateNetworkFormComponent": () => (/* binding */ PrivateNetworkFormComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 5758);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 2938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_model_privateNetworkDto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/model/privateNetworkDto */ 6756);
/* harmony import */ var _private_networks_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../private-networks.service */ 8313);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/text-field */ 1307);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 4770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 3365);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ 1434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ 8133);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/radio */ 8390);
/* harmony import */ var _edition_wrapper_edition_wrapper_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../edition-wrapper/edition-wrapper.component */ 7819);



















function PrivateNetworkFormComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 16)(1, "mat-slide-toggle", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.form.get("enabled").value ? "Active" : "D\u00E9sactiv\u00E9e");
} }
function PrivateNetworkFormComponent_mat_error_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Ce nom est d\u00E9j\u00E0 associ\u00E9 \u00E0 un autre r\u00E9seau");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function PrivateNetworkFormComponent_mat_option_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const entry_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", entry_r7[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](entry_r7[1]);
} }
function PrivateNetworkFormComponent_mat_radio_button_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-radio-button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const entry_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", entry_r8[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](entry_r8[1]);
} }
function PrivateNetworkFormComponent_mat_error_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Seuls les caract\u00E8res num\u00E9riques sont accept\u00E9s pour ce champ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function PrivateNetworkFormComponent_mat_error_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Ce nom est d\u00E9j\u00E0 associ\u00E9 \u00E0 un autre r\u00E9seau");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
const _c0 = function () { return []; };
class PrivateNetworkFormComponent {
    constructor(dialogRef, data, privateNetworksService, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.privateNetworksService = privateNetworksService;
        this.isUpdateOngoing = false;
        this.wasFormModified = false;
        this.updated = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
        this.fluidTypeLabels = Object.entries(src_app_model_privateNetworkDto__WEBPACK_IMPORTED_MODULE_1__.FLUID_TYPE_LABELS);
        this.networkSensitivityLabels = Object.entries(src_app_model_privateNetworkDto__WEBPACK_IMPORTED_MODULE_1__.NETWORK_SENSITIVITY_LABELS);
        this.networkLocationLabels = Object.entries(src_app_model_privateNetworkDto__WEBPACK_IMPORTED_MODULE_1__.NETWORK_LOCATION_LABELS);
        this.form = fb.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]],
            fluidType: ['PUBLIC', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]],
            networkSensitivity: ['NOT_SENSITIVE', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]],
            code: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.pattern('[0-9]*')]],
            description: [''],
            enabled: true,
        });
    }
    ngOnInit() {
        this.dialogRef.disableClose = true;
        if (!this.data.isCreation) {
            this.form.patchValue(this.data.privateNetwork);
            this.originalObject = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.cloneDeep)(this.form.value);
        }
        this.form.valueChanges.subscribe((val) => {
            this.wasFormModified = !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)(this.originalObject, this.form.value);
        });
    }
    onCancelClick() {
        this.dialogRef.close();
    }
    onValidateClick() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            this.isUpdateOngoing = true;
            const callWrapper = this.data.isCreation
                ? yield this.privateNetworksService.postPrivateNetwork(this.form.value)
                : yield this.privateNetworksService.putPrivateNetwork(this.data.privateNetwork.privateNetworkId, this.form.value);
            if (!callWrapper.error) {
                this.updated.emit();
                this.dialogRef.close();
            }
            this.isUpdateOngoing = false;
        });
    }
}
PrivateNetworkFormComponent.ɵfac = function PrivateNetworkFormComponent_Factory(t) { return new (t || PrivateNetworkFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_private_networks_service__WEBPACK_IMPORTED_MODULE_2__.PrivateNetworksService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder)); };
PrivateNetworkFormComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: PrivateNetworkFormComponent, selectors: [["app-private-network-form"]], decls: 41, vars: 18, consts: [[1, "private-network-dialog"], [3, "title", "isUpdateOngoing", "isConfirmDisabled", "confirmText", "wasFormModified", "cancel", "confirm"], [3, "formGroup"], ["class", "private-network-status", 4, "ngIf"], [1, "field-wrapper"], ["appearance", "outline", 1, "full-width"], ["id", "name", "cdkFocusInitial", "", "autocomplete", "off", "matInput", "", "formControlName", "name", "maxlength", "20"], ["align", "end"], [4, "ngIf"], [1, "error-hint"], ["placeholder", "Choisissez un type de fluide", "formControlName", "fluidType"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "networkSensitivity", "aria-label", "Select an option"], ["id", "name", "autocomplete", "off", "matInput", "", "formControlName", "code", "maxlength", "20"], ["autocomplete", "off", "cdkAutosizeMinRows", "4", "cdkTextareaAutosize", "", "formControlName", "description", "matInput", "", "maxlength", "100", "name", "description", "placeholder", ""], ["technicalInformations", ""], [1, "private-network-status"], ["formControlName", "enabled"], [3, "value"]], template: function PrivateNetworkFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "app-edition-wrapper", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("cancel", function PrivateNetworkFormComponent_Template_app_edition_wrapper_cancel_1_listener() { return ctx.onCancelClick(); })("confirm", function PrivateNetworkFormComponent_Template_app_edition_wrapper_confirm_1_listener() { return ctx.onValidateClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, PrivateNetworkFormComponent_div_3_Template, 3, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 4)(5, "mat-form-field", 5)(6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Nom du r\u00E9seau");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "mat-hint", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, PrivateNetworkFormComponent_mat_error_11_Template, 2, 0, "mat-error", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 4)(14, "mat-form-field", 5)(15, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Type de r\u00E9seau");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "mat-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, PrivateNetworkFormComponent_mat_option_18_Template, 2, 2, "mat-option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 4)(20, "mat-radio-group", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, PrivateNetworkFormComponent_mat_radio_button_21_Template, 2, 2, "mat-radio-button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "div", 4)(23, "mat-form-field", 5)(24, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Code");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](26, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "mat-hint", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, PrivateNetworkFormComponent_mat_error_29_Template, 2, 0, "mat-error", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](30, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "div", 4)(32, "mat-form-field", 5)(33, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](34, "Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](35, "textarea", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "mat-hint", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](38);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](39, PrivateNetworkFormComponent_mat_error_39_Template, 2, 0, "mat-error", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](40, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", (ctx.data.isCreation ? "Cr\u00E9er" : "Modifier") + " un r\u00E9seau")("isUpdateOngoing", ctx.isUpdateOngoing)("isConfirmDisabled", !ctx.form.valid || !ctx.wasFormModified)("confirmText", ctx.data.isCreation ? "Cr\u00E9er" : "Modifier")("wasFormModified", ctx.wasFormModified);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.data.isCreation);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", (ctx.form.value.name || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](15, _c0)).length, "/20");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.form.get("name").errors == null ? null : ctx.form.get("name").errors["forbiddenValue"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.fluidTypeLabels);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.networkSensitivityLabels);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", (ctx.form.value.code || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](16, _c0)).length, "/20");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.form.get("code").errors == null ? null : ctx.form.get("code").errors["pattern"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", (ctx.form.value.description || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](17, _c0)).length, "/100");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.form.get("code").errors == null ? null : ctx.form.get("code").errors["forbiddenValue"]);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_9__.CdkTextareaAutosize, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_12__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__.MatOption, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_14__.MatSlideToggle, _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__.MatRadioButton, _edition_wrapper_edition_wrapper_component__WEBPACK_IMPORTED_MODULE_3__.EditionWrapperComponent], styles: [".private-network-dialog[_ngcontent-%COMP%] {\n  min-width: 27rem;\n}\n.private-network-dialog[_ngcontent-%COMP%]   .private-network-status[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  background: var(--color-background-neutral-1);\n  margin-bottom: 2rem;\n  padding: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZhdGUtbmV0d29yay1mb3JtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7QUFDRjtBQUNFO0VBQ0ksa0JBQUE7RUFDQSw2Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQUNOIiwiZmlsZSI6InByaXZhdGUtbmV0d29yay1mb3JtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByaXZhdGUtbmV0d29yay1kaWFsb2cge1xyXG4gIG1pbi13aWR0aDogMjdyZW07XHJcblxyXG4gIC5wcml2YXRlLW5ldHdvcmstc3RhdHVzIHtcclxuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLW5ldXRyYWwtMSk7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XHJcbiAgICAgIHBhZGRpbmc6IDFyZW07XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 3534:
/*!*****************************************************************************!*\
  !*** ./src/app/referentials/private-networks/private-networks.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivateNetworksComponent": () => (/* binding */ PrivateNetworksComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/paginator */ 9861);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 8759);
/* harmony import */ var src_app_model_privateNetworkDto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/model/privateNetworkDto */ 6756);
/* harmony import */ var _private_network_form_private_network_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./private-network-form/private-network-form.component */ 4450);
/* harmony import */ var src_app_API_mock_CustomAsyncDataSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/API/mock/CustomAsyncDataSource */ 8837);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/sort */ 4316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _private_networks_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./private-networks.service */ 8313);
/* harmony import */ var src_app_services_toaster_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/toaster.service */ 3786);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ 5758);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 7317);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/table */ 7217);
/* harmony import */ var _paginated_table_async_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../paginated-table/async-table.component */ 8693);
/* harmony import */ var _empty_state_empty_state_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../empty-state/empty-state.component */ 9698);


















function PrivateNetworksComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Ce navigateur n'est pas support\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PrivateNetworksComponent_h4_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Liste des r\u00E9seaux");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PrivateNetworksComponent_th_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Nom du r\u00E9seau");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PrivateNetworksComponent_td_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](element_r15.name);
} }
function PrivateNetworksComponent_th_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PrivateNetworksComponent_td_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r16 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r5.fluidTypeLabels[element_r16.fluidType], " ");
} }
function PrivateNetworksComponent_th_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Sensibilite");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PrivateNetworksComponent_td_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r17 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r7.networkSensitivityLabels[element_r17.networkSensitivity], " ");
} }
function PrivateNetworksComponent_th_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Code");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PrivateNetworksComponent_td_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", element_r18.code || "-", " ");
} }
function PrivateNetworksComponent_th_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PrivateNetworksComponent_td_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", element_r19.description || "-", " ");
} }
function PrivateNetworksComponent_app_empty_state_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-empty-state", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Aucun r\u00E9seau");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PrivateNetworksComponent_app_error_state_34_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-error-state", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("btnClicked", function PrivateNetworksComponent_app_error_state_34_Template_app_error_state_btnClicked_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r20.refreshLandPlots()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, " Impossible de r\u00E9cup\u00E9rer les r\u00E9seaux priv\u00E9s.");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("retryPossible", !!ctx_r13.errorDisplay.retryable)("retryOngoing", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](1, 3, ctx_r13.dataSource.loading$));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", ctx_r13.errorDisplay.message, " ");
} }
function PrivateNetworksComponent_esn_loader_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "esn-loader", 26);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("centered", true);
} }
const _c0 = function () { return { "hidden-from-view": true }; };
const _c1 = function () { return [20, 50, 100]; };
class PrivateNetworksComponent {
    constructor(privateNetworkservice, toasterService, dialog) {
        this.privateNetworkservice = privateNetworkservice;
        this.toasterService = toasterService;
        this.dialog = dialog;
        this.searchText = '';
        this.displayedColumns = [
            'name',
            'fluidType',
            'networkSensitivity',
            'code',
            'description',
        ];
        this.isEnabledTab = true;
        this.fluidTypeLabels = src_app_model_privateNetworkDto__WEBPACK_IMPORTED_MODULE_0__.FLUID_TYPE_LABELS;
        this.networkSensitivityLabels = src_app_model_privateNetworkDto__WEBPACK_IMPORTED_MODULE_0__.NETWORK_SENSITIVITY_LABELS;
        this.networkLocationLabels = src_app_model_privateNetworkDto__WEBPACK_IMPORTED_MODULE_0__.NETWORK_LOCATION_LABELS;
        this.numberOfResults = 0;
        this.onFirefox = false;
    }
    clearSort() {
        if (!this.sort) {
            return;
        }
        this.sort.sort({
            id: '',
            start: '',
            disableClear: false,
        });
    }
    detectBrowserName() {
        const agent = window.navigator.userAgent.toLowerCase();
        switch (true) {
            case agent.indexOf('edge') > -1:
                return 'edge';
            case agent.indexOf('opr') > -1 && !!window.opr:
                return 'opera';
            case agent.indexOf('chrome') > -1 && !!window.chrome:
                return 'chrome';
            case agent.indexOf('trident') > -1:
                return 'ie';
            case agent.indexOf('firefox') > -1:
                return 'firefox';
            case agent.indexOf('safari') > -1:
                return 'safari';
            default:
                return 'other';
        }
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            this.onFirefox = this.detectBrowserName() == 'firefox';
            this.dataSource = new src_app_API_mock_CustomAsyncDataSource__WEBPACK_IMPORTED_MODULE_2__.CustomAsyncDataSource((query, enabled, pageIndex = 0, pageSize = 200) => this.privateNetworkservice.getPrivateNetworks(query, enabled, pageIndex, pageSize));
            this.refreshPrivateNetworks();
            this.dataSource.numberOfResults$.subscribe((nb) => (this.numberOfResults = nb));
            this.dataSource.errorDisplay$.subscribe((val) => (this.errorDisplay = val));
        });
    }
    ngAfterViewInit() {
        this.paginator.page.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.tap)(() => this.loadElms())).subscribe();
    }
    loadElms() {
        this.dataSource.load(this.searchText, this.isEnabledTab, this.paginator.pageIndex, this.paginator.pageSize);
    }
    refreshPrivateNetworks() {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            if (this.paginator) {
                this.paginator.pageIndex = 0;
            }
            this.dataSource.load(this.searchText, this.isEnabledTab, 0, ((_a = this.paginator) === null || _a === void 0 ? void 0 : _a.pageSize) || 200);
            this.clearSort();
        });
    }
    openEditionDialog(elm) {
        this.dialog
            .open(_private_network_form_private_network_form_component__WEBPACK_IMPORTED_MODULE_1__.PrivateNetworkFormComponent, {
            data: {
                isCreation: !elm,
                privateNetwork: elm,
                otherPrivateNetworkNames: [],
                // this.privateNetworks
                //   .map((lp) => lp.name)
                //   .filter((code) => code !== elm?.name),
            },
        })
            .componentInstance.updated.subscribe(() => {
            this.toasterService.showToaster('success', `Le réseau a été ${!elm ? 'créé' : 'modifié'}`);
            this.refreshPrivateNetworks();
        });
    }
    setIsEnabledTab(val) {
        this.isEnabledTab = val;
        this.refreshPrivateNetworks();
    }
    doSort(e) {
        // bug tri sur description ne marche pas
        if (e.active === 'description') {
            return;
        }
        //tri sur le nom par défaut
        if (!e.direction) {
            e = { active: 'name', direction: 'asc' };
        }
        const current = this.dataSource.elementsSubject.value;
        this.sortOnProp(current, e.active, e.direction);
        this.dataSource.elementsSubject.next(current);
    }
    sortOnProp(elsToSort, attrName, direction) {
        const dir = direction === 'asc' ? 1 : -1;
        elsToSort.sort(function (a, b) {
            if (a[attrName] < b[attrName]) {
                return dir * -1;
            }
            if (a[attrName] > b[attrName]) {
                return dir;
            }
            return 0;
        });
    }
}
PrivateNetworksComponent.ɵfac = function PrivateNetworksComponent_Factory(t) { return new (t || PrivateNetworksComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_private_networks_service__WEBPACK_IMPORTED_MODULE_3__.PrivateNetworksService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_services_toaster_service__WEBPACK_IMPORTED_MODULE_4__.ToasterService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialog)); };
PrivateNetworksComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: PrivateNetworksComponent, selectors: [["app-private-networks"]], viewQuery: function PrivateNetworksComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginator, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSort, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
    } }, decls: 37, vars: 17, consts: [[4, "ngIf"], [1, "private-networks", 3, "ngClass"], [1, "page-header"], [1, "page-header__info"], [1, "page-header__title"], [1, "page-header__subtitle"], [1, "page-header__actions"], ["mat-flat-button", "", "color", "primary", 1, "btn-md", 3, "click"], [1, "add-icon", "gdd-icon", "gdd-icon__add"], [1, "tab-content"], ["matSort", "", 3, "dataSource", "displayedColumns", "matSortChange"], ["matColumnDef", "name"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "fluidType"], ["matColumnDef", "networkSensitivity"], ["matColumnDef", "code"], ["matColumnDef", "description"], ["showFirstLastButtons", "", 3, "ngClass", "length", "pageSizeOptions"], ["illustrationType", "documents", 4, "ngIf"], [3, "retryPossible", "retryOngoing", "btnClicked", 4, "ngIf"], [3, "centered", 4, "ngIf"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["illustrationType", "documents"], [3, "retryPossible", "retryOngoing", "btnClicked"], [3, "centered"]], template: function PrivateNetworksComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, PrivateNetworksComponent_div_0_Template, 2, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div")(5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "R\u00E9f\u00E9rentiel des r\u00E9seaux");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "Voir et g\u00E9rer tous les r\u00E9seaux");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 6)(10, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PrivateNetworksComponent_Template_button_click_10_listener() { return ctx.openEditionDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12, " Ajouter un r\u00E9seau ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](14, PrivateNetworksComponent_h4_14_Template, 2, 0, "h4", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "app-async-table", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("matSortChange", function PrivateNetworksComponent_Template_app_async_table_matSortChange_15_listener($event) { return ctx.doSort($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](16, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, PrivateNetworksComponent_th_17_Template, 2, 0, "th", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](18, PrivateNetworksComponent_td_18_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](19, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](20, PrivateNetworksComponent_th_20_Template, 2, 0, "th", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](21, PrivateNetworksComponent_td_21_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](22, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](23, PrivateNetworksComponent_th_23_Template, 2, 0, "th", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](24, PrivateNetworksComponent_td_24_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](25, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](26, PrivateNetworksComponent_th_26_Template, 2, 0, "th", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](27, PrivateNetworksComponent_td_27_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](28, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](29, PrivateNetworksComponent_th_29_Template, 2, 0, "th", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](30, PrivateNetworksComponent_td_30_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](31, "mat-paginator", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](32, PrivateNetworksComponent_app_empty_state_32_Template, 2, 0, "app-empty-state", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](33, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](34, PrivateNetworksComponent_app_error_state_34_Template, 5, 5, "app-error-state", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](35, PrivateNetworksComponent_esn_loader_35_Template, 1, 1, "esn-loader", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](36, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.onFirefox);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", ctx.onFirefox ? "hidden-from-view" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !!ctx.numberOfResults);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dataSource", ctx.dataSource)("displayedColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](15, _c0))("length", ctx.numberOfResults)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](16, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.errorDisplay && !ctx.numberOfResults && !_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](33, 11, ctx.dataSource.loading$));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !!ctx.errorDisplay);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](36, 13, ctx.dataSource.loading$) && !ctx.numberOfResults && !ctx.errorDisplay);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatCell, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginator, _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSortHeader, _paginated_table_async_table_component__WEBPACK_IMPORTED_MODULE_5__.AsyncTableComponent, _empty_state_empty_state_component__WEBPACK_IMPORTED_MODULE_6__.EmptyStateComponent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe], styles: [".private-networks[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n.private-networks[_ngcontent-%COMP%]   .gdd-icon[_ngcontent-%COMP%] {\n  margin-right: -7px;\n}\n  .td {\n  white-space: nowrap !important;\n}\n  .mat-radio-button {\n  margin-right: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZhdGUtbmV0d29ya3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0FBQ0Y7QUFDRTtFQUNFLGtCQUFBO0FBQ0o7QUFFQTtFQUNFLDhCQUFBO0FBQ0Y7QUFFQTtFQUNFLGtCQUFBO0FBQ0YiLCJmaWxlIjoicHJpdmF0ZS1uZXR3b3Jrcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcml2YXRlLW5ldHdvcmtzIHtcbiAgcGFkZGluZzogMnJlbTtcblxuICAuZ2RkLWljb24ge1xuICAgIG1hcmdpbi1yaWdodDogLTdweDtcbiAgfVxufVxuOjpuZy1kZWVwIC50ZCB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXAgIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwIC5tYXQtcmFkaW8tYnV0dG9uIHtcbiAgbWFyZ2luLXJpZ2h0OiAxNnB4O1xufVxuIl19 */"] });


/***/ }),

/***/ 8313:
/*!***************************************************************************!*\
  !*** ./src/app/referentials/private-networks/private-networks.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivateNetworksService": () => (/* binding */ PrivateNetworksService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4139);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var src_app_API_mock_referentialAPI_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/API/mock/referentialAPI.service */ 1135);
/* harmony import */ var src_app_services_api_call_wrapper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/api-call-wrapper.service */ 4466);





class PrivateNetworksService {
    constructor(referentialApi, callWrapper) {
        this.referentialApi = referentialApi;
        this.callWrapper = callWrapper;
    }
    getPrivateNetworks(query, enabled, pageIndex = 0, pageSize = 200) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            return this.callWrapper.makeApiCall(this.referentialApi.fetchPrivateNetworkUsingGET(query, enabled, pageIndex, pageSize), 'récupération des réseaux');
        });
    }
    postPrivateNetwork(privateNetwork) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            return this.callWrapper.makeApiCall(this.referentialApi.createPrivateNetworkUsingPOST(privateNetwork), 'création du réseau', true);
        });
    }
    putPrivateNetwork(id, privateNetwork) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            privateNetwork.privateNetworkId = id;
            return this.callWrapper.makeApiCall((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(), 'modification du réseau', true);
        });
    }
    privateNetworkWithNameDoesntExists(name) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(true);
        /* return this.referentialApi.privateNetworkExists(name).pipe(
          map((resp) => !resp.content),
          catchError((err) => {
            return of(true);
          })
        ); */
    }
}
PrivateNetworksService.ɵfac = function PrivateNetworksService_Factory(t) { return new (t || PrivateNetworksService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](src_app_API_mock_referentialAPI_service__WEBPACK_IMPORTED_MODULE_0__.ReferentialAPIService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](src_app_services_api_call_wrapper_service__WEBPACK_IMPORTED_MODULE_1__.ApiCallWrapperService)); };
PrivateNetworksService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: PrivateNetworksService, factory: PrivateNetworksService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4466:
/*!******************************************************!*\
  !*** ./src/app/services/api-call-wrapper.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiCallWrapperService": () => (/* binding */ ApiCallWrapperService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 7418);
/* harmony import */ var _utils_apiUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/apiUtils */ 9684);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _toaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toaster.service */ 3786);





class ApiCallWrapperService {
    constructor(toasterService) {
        this.toasterService = toasterService;
    }
    makeApiCall(apiCall, callLabel, showNotification = false) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                apiCall
                    .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)((err) => {
                    console.log({ err });
                    const error = _utils_apiUtils__WEBPACK_IMPORTED_MODULE_0__.ApiUtils.getErrorMessage(err, callLabel);
                    if (showNotification) {
                        this.toasterService.showToaster('error', 
                        /* `Erreur lors de l${
                          ['a', 'e', 'i', 'o', 'u', 'y'].includes(callLabel.charAt(0))
                            ? "'"
                            : 'a '
                        }${callLabel}`, */
                        'Erreur 500', error.message, { disableTimeOut: true });
                    }
                    resolve({
                        error,
                    });
                    throw err;
                }))
                    .subscribe((resp) => {
                    resolve({ resp: resp === null || resp === void 0 ? void 0 : resp.content });
                });
            });
        });
    }
}
ApiCallWrapperService.ɵfac = function ApiCallWrapperService_Factory(t) { return new (t || ApiCallWrapperService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_toaster_service__WEBPACK_IMPORTED_MODULE_1__.ToasterService)); };
ApiCallWrapperService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: ApiCallWrapperService, factory: ApiCallWrapperService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3786:
/*!*********************************************!*\
  !*** ./src/app/services/toaster.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToasterService": () => (/* binding */ ToasterService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-toastr */ 2808);


const INFO_TOASTER_CONFIG = {
    timeOut: 2500,
    enableHtml: true,
};
const ERROR_TOASTER_CONFIG = {
    disableTimeOut: true,
    enableHtml: true,
    closeButton: true,
};
const SUCCESS_TOASTER_CONFIG = INFO_TOASTER_CONFIG;
class ToasterService {
    constructor(toasterService) {
        this.toasterService = toasterService;
    }
    showToaster(type, title, message, config) {
        switch (type) {
            case 'info':
                return this.toasterService.info(message, title, Object.assign(Object.assign({}, INFO_TOASTER_CONFIG), config));
            case 'error':
                return this.toasterService.error(message, title, Object.assign(Object.assign({}, ERROR_TOASTER_CONFIG), config));
            case 'success':
                return this.toasterService.success(message, title, Object.assign(Object.assign({}, INFO_TOASTER_CONFIG), config));
            default:
                throw 'This toaster type is not implemented yet';
        }
    }
}
ToasterService.ɵfac = function ToasterService_Factory(t) { return new (t || ToasterService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_1__.ToastrService)); };
ToasterService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ToasterService, factory: ToasterService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9684:
/*!***********************************!*\
  !*** ./src/app/utils/apiUtils.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiUtils": () => (/* binding */ ApiUtils)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _gddUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gddUtils */ 7512);
/* harmony import */ var _model_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/event */ 7769);



class ApiUtils {
    static retry(func, condition = () => true, stepName = '', bodySent = 'Unavailable', retries = 2, interval = 5000) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            const stepNamePrecision = stepName ? ' for ' + stepName : '';
            let count = 0;
            let resp;
            let error;
            while (count < retries) {
                try {
                    resp = yield func();
                    if (condition(resp)) {
                        return resp;
                    }
                    else {
                        console.log(`Call number ${count + 1} failed${stepNamePrecision}: Condition unfullfilled`);
                        console.log(resp);
                    }
                }
                catch (err) {
                    error = err;
                    console.log(`Call number ${count + 1} failed${stepNamePrecision} with following error:`);
                    console.log(err);
                }
                count++;
                yield _gddUtils__WEBPACK_IMPORTED_MODULE_0__.GddUtils.sleep(interval);
            }
            console.log(`Call failed ${stepNamePrecision} after ${retries} retries. Stopping Synchro:`);
            throw {
                message: `Api call error: Call failed${stepNamePrecision}`,
                responseReceived: resp,
                error,
                bodySent,
            };
        });
    }
    static getErrorMessage(error, errorType = '') {
        var _a;
        const ofErrorTypeWording = `${['a', 'e', 'i', 'o', 'u', 'y'].includes(errorType.charAt(0))
            ? `d'`
            : 'de '}${errorType}`;
        if (!navigator.onLine) {
            return {
                message: `Merci de vérifier votre connexion et réessayer.`,
                retryable: true,
            };
        }
        const status = (error === null || error === void 0 ? void 0 : error.status) || ((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.status);
        if (!status) {
            return {
                message: `Une erreur technique s'est produite, merci de contacter le support.`,
            };
        }
        switch (status) {
            case 400:
                return {
                    code: 400,
                    message: `Requête rejetée par le serveur, merci de contacter le support.`,
                };
            case 401:
                return {
                    code: 401,
                    message: `Votre authentification Gardian a expiré, merci de vous reconnecter.`,
                };
            case 403:
                return {
                    code: 403,
                    message: `L'accès à cette ressource n'est pas autorisé. Merci de contacter le support.`,
                };
            // case 409:
            //   return `Erreur ${ofErrorTypeWording}, conflit détecté.`;
            case 500:
                return {
                    code: 500,
                    message: `Une erreur non gérée s'est produite, merci de contacter le support.`,
                };
            case 503:
                return {
                    code: 503,
                    message: `Le service est temporairement indisponible, merci de réessayer ultérieurement.`,
                    retryable: true,
                };
            default:
                return {
                    message: `Une erreur technique s'est produite, merci de contacter le support.`,
                    code: status,
                };
        }
    }
    static handleOffLineAndUnauthentifiedEventOptions(error) {
        const options = {
            error,
            severity: !navigator.onLine || (error && error.status === 401)
                ? _model_event__WEBPACK_IMPORTED_MODULE_1__.GddWebappEventSeverity.DEBUG
                : undefined,
        };
        if (!navigator.onLine) {
            options.titleAppend = ' (Offline)';
        }
        else if (error && error.status === 401) {
            options.titleAppend = ' (Non authentifié)';
        }
        else if (error &&
            error.status === 200 &&
            error.message.startsWith('Http failure during parsing')) {
            options.titleAppend = ' (Erreur FHM)';
            options.severity = _model_event__WEBPACK_IMPORTED_MODULE_1__.GddWebappEventSeverity.FATAL;
        }
        return options;
    }
}


/***/ }),

/***/ 7512:
/*!***********************************!*\
  !*** ./src/app/utils/gddUtils.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GddUtils": () => (/* binding */ GddUtils)
/* harmony export */ });
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bowser */ 3962);
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 2938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


class GddUtils {
    static sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    static generateRandomUuid() {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }
    static isBrowserSupported() {
        const browser = bowser__WEBPACK_IMPORTED_MODULE_0__.getParser(window.navigator.userAgent);
        const isValidBrowser = Boolean(browser.satisfies({
            chrome: '>1',
            firefox: '>1',
            'Microsoft Edge': '>=79',
        }));
        const browserCapabilitiesOK = 'reversed' in document.createElement('ol') && // Edge before chromium
            'querySelector' in document &&
            'localStorage' in window &&
            'addEventListener' in window &&
            'IntersectionObserver' in window &&
            'indexedDB' in window &&
            'serviceWorker' in navigator &&
            'databases' in indexedDB;
        return isValidBrowser && browserCapabilitiesOK;
    }
    static pruneEmpty(obj) {
        return (function prune(current) {
            lodash__WEBPACK_IMPORTED_MODULE_1__.forOwn(current, function (value, key) {
                if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(value) ||
                    lodash__WEBPACK_IMPORTED_MODULE_1__.isNull(value) ||
                    lodash__WEBPACK_IMPORTED_MODULE_1__.isNaN(value) ||
                    (lodash__WEBPACK_IMPORTED_MODULE_1__.isString(value) && lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty(value)) ||
                    (lodash__WEBPACK_IMPORTED_MODULE_1__.isObject(value) && lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty(prune(value)))) {
                    delete current[key];
                }
            });
            // remove any leftover undefined values from the delete
            // operation on an array
            if (lodash__WEBPACK_IMPORTED_MODULE_1__.isArray(current))
                lodash__WEBPACK_IMPORTED_MODULE_1__.pull(current, undefined);
            return current;
        })(lodash__WEBPACK_IMPORTED_MODULE_1__.cloneDeep(obj)); // Do not modify the original object, create a clone instead
    }
}
//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
GddUtils.hashCode = function (str) {
    var hash = 0, i, chr;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
const environment = {
    production: true
};


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.78df3602648fd0e0.js.map