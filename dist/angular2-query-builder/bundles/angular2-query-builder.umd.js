(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/forms'), require('@angular/core'), require('@ng-select/ng-select'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular2-query-builder', ['exports', '@angular/forms', '@angular/core', '@ng-select/ng-select', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["angular2-query-builder"] = {}, global.ng.forms, global.ng.core, global.i1, global.ng.common));
})(this, (function (exports, i3, i0, i1, i2) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }

    var QueryOperatorDirective = /** @class */ (function () {
        function QueryOperatorDirective(template) {
            this.template = template;
        }
        return QueryOperatorDirective;
    }());
    QueryOperatorDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryOperatorDirective, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    QueryOperatorDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryOperatorDirective, selector: "[queryOperator]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryOperatorDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[queryOperator]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; } });

    var QueryFieldDirective = /** @class */ (function () {
        function QueryFieldDirective(template) {
            this.template = template;
        }
        return QueryFieldDirective;
    }());
    QueryFieldDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryFieldDirective, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    QueryFieldDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryFieldDirective, selector: "[queryField]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryFieldDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[queryField]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; } });

    var QueryEntityDirective = /** @class */ (function () {
        function QueryEntityDirective(template) {
            this.template = template;
        }
        return QueryEntityDirective;
    }());
    QueryEntityDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryEntityDirective, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    QueryEntityDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryEntityDirective, selector: "[queryEntity]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryEntityDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[queryEntity]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; } });

    var QuerySwitchGroupDirective = /** @class */ (function () {
        function QuerySwitchGroupDirective(template) {
            this.template = template;
        }
        return QuerySwitchGroupDirective;
    }());
    QuerySwitchGroupDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QuerySwitchGroupDirective, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    QuerySwitchGroupDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QuerySwitchGroupDirective, selector: "[querySwitchGroup]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QuerySwitchGroupDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[querySwitchGroup]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; } });

    var QueryButtonGroupDirective = /** @class */ (function () {
        function QueryButtonGroupDirective(template) {
            this.template = template;
        }
        return QueryButtonGroupDirective;
    }());
    QueryButtonGroupDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryButtonGroupDirective, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    QueryButtonGroupDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryButtonGroupDirective, selector: "[queryButtonGroup]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryButtonGroupDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[queryButtonGroup]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; } });

    var QueryInputDirective = /** @class */ (function () {
        function QueryInputDirective(template) {
            this.template = template;
        }
        Object.defineProperty(QueryInputDirective.prototype, "queryInputType", {
            /** Unique name for query input type. */
            get: function () { return this._type; },
            set: function (value) {
                // If the directive is set without a type (updated programatically), then this setter will
                // trigger with an empty string and should not overwrite the programatically set value.
                if (!value) {
                    return;
                }
                this._type = value;
            },
            enumerable: false,
            configurable: true
        });
        return QueryInputDirective;
    }());
    QueryInputDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryInputDirective, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    QueryInputDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryInputDirective, selector: "[queryInput]", inputs: { queryInputType: "queryInputType" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryInputDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[queryInput]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; }, propDecorators: { queryInputType: [{
                    type: i0.Input
                }] } });

    var QueryRemoveButtonDirective = /** @class */ (function () {
        function QueryRemoveButtonDirective(template) {
            this.template = template;
        }
        return QueryRemoveButtonDirective;
    }());
    QueryRemoveButtonDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryRemoveButtonDirective, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    QueryRemoveButtonDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryRemoveButtonDirective, selector: "[queryRemoveButton]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryRemoveButtonDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[queryRemoveButton]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; } });

    var QueryEmptyWarningDirective = /** @class */ (function () {
        function QueryEmptyWarningDirective(template) {
            this.template = template;
        }
        return QueryEmptyWarningDirective;
    }());
    QueryEmptyWarningDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryEmptyWarningDirective, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    QueryEmptyWarningDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryEmptyWarningDirective, selector: "[queryEmptyWarning]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryEmptyWarningDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[queryEmptyWarning]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; } });

    var QueryArrowIconDirective = /** @class */ (function () {
        function QueryArrowIconDirective(template) {
            this.template = template;
        }
        return QueryArrowIconDirective;
    }());
    QueryArrowIconDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryArrowIconDirective, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    QueryArrowIconDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryArrowIconDirective, selector: "[queryArrowIcon]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryArrowIconDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[queryArrowIcon]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; } });

    var CONTROL_VALUE_ACCESSOR = {
        provide: i3.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return QueryBuilderComponent; }),
        multi: true,
    };
    var VALIDATOR = {
        provide: i3.NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return QueryBuilderComponent; }),
        multi: true,
    };
    var QueryBuilderComponent = /** @class */ (function () {
        function QueryBuilderComponent(changeDetectorRef) {
            var _this = this;
            this.changeDetectorRef = changeDetectorRef;
            this.defaultClassNames = {
                arrowIconButton: "q-arrow-icon-button",
                arrowIcon: "q-icon q-arrow-icon",
                removeIcon: "q-icon q-remove-icon",
                addIcon: "q-icon q-add-icon",
                button: "q-button",
                buttonGroup: "q-button-group",
                removeButton: "q-remove-button",
                switchGroup: "q-switch-group",
                switchLabel: "q-switch-label",
                switchRadio: "q-switch-radio",
                rightAlign: "q-right-align",
                transition: "q-transition",
                collapsed: "q-collapsed",
                treeContainer: "q-tree-container",
                tree: "q-tree",
                row: "q-row",
                connector: "q-connector",
                rule: "q-rule",
                ruleSet: "q-ruleset",
                invalidRuleSet: "q-invalid-ruleset",
                emptyWarning: "q-empty-warning",
                fieldControl: "q-field-control",
                fieldControlSize: "q-control-size",
                entityControl: "q-entity-control",
                entityControlSize: "q-control-size",
                operatorControl: "q-operator-control",
                operatorControlSize: "q-control-size",
                inputControl: "q-input-control",
                inputControlSize: "q-control-size",
            };
            this.defaultOperatorMap = {
                string: ["=", "!=", "contains", "like"],
                number: ["=", "!=", ">", ">=", "<", "<="],
                time: ["=", "!=", ">", ">=", "<", "<="],
                date: ["=", "!=", ">", ">=", "<", "<="],
                category: ["=", "!=", "in", "not in"],
                boolean: ["="],
            };
            this.disabled = false;
            this.data = { condition: "add", rules: [] };
            this.allowRuleset = true;
            this.allowCollapse = false;
            this.emptyMessage = "A ruleset cannot be empty. Please add a rule or remove it all together.";
            this.classNames = {};
            this.operatorMap = {};
            this.parentValue = { condition: "add", rules: [] };
            this.config = { fields: {} };
            this.persistValueOnFieldChange = false;
            this.defaultTemplateTypes = [
                "string",
                "number",
                "time",
                "date",
                "category",
                "boolean",
                "multiselect",
            ];
            this.defaultPersistValueTypes = [
                "string",
                "number",
                "time",
                "date",
                "boolean",
            ];
            this.defaultEmptyList = [];
            this.operatorsCache = {};
            this.inputContextCache = new Map();
            this.operatorContextCache = new Map();
            this.fieldContextCache = new Map();
            this.entityContextCache = new Map();
            this.removeButtonContextCache = new Map();
            // ----------END----------
            this.getDisabledState = function () {
                return _this.disabled;
            };
            this.fields = [];
            this.filterFields = [];
            this.entities = [];
        }
        // ----------OnInit Implementation----------
        // ----------OnChanges Implementation----------
        QueryBuilderComponent.prototype.ngOnChanges = function (changes) {
            var config = this.config;
            var type = typeof config;
            if (type === "object") {
                this.fields = Object.keys(config.fields).map(function (value) {
                    var field = config.fields[value];
                    field.value = field.value || value;
                    return field;
                });
                if (config.entities) {
                    this.entities = Object.keys(config.entities).map(function (value) {
                        var entity = config.entities ? config.entities[value] : [];
                        entity.value = entity.value || value;
                        return entity;
                    });
                }
                else {
                    this.entities = [];
                }
                this.operatorsCache = {};
            }
            else {
                throw new Error("Expected 'config' must be a valid object, got " + type + " instead.");
            }
        };
        // ----------Validator Implementation----------
        QueryBuilderComponent.prototype.validate = function (control) {
            var errors = {};
            var ruleErrorStore = [];
            var hasErrors = false;
            if (!this.config.allowEmptyRulesets &&
                this.checkEmptyRuleInRuleset(this.data)) {
                errors['empty'] = "Empty rulesets are not allowed.";
                hasErrors = true;
            }
            this.validateRulesInRuleset(this.data, ruleErrorStore);
            if (ruleErrorStore.length) {
                errors['rules'] = ruleErrorStore;
                hasErrors = true;
            }
            return hasErrors ? errors : null;
        };
        Object.defineProperty(QueryBuilderComponent.prototype, "value", {
            // ----------ControlValueAccessor Implementation----------
            get: function () {
                return this.data;
            },
            set: function (value) {
                var e_1, _a;
                if (value) {
                    try {
                        for (var _b = __values(value.rules), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var rule = _c.value;
                            rule.tempField = rule.field;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                // When component is initialized without a formControl, null is passed to value
                this.data = value || { condition: "add", rules: [] };
                this.handleDataChange();
            },
            enumerable: false,
            configurable: true
        });
        QueryBuilderComponent.prototype.writeValue = function (obj) {
            this.value = obj;
        };
        QueryBuilderComponent.prototype.registerOnChange = function (fn) {
            var _this = this;
            this.onChangeCallback = function () { return fn(_this.data); };
        };
        QueryBuilderComponent.prototype.registerOnTouched = function (fn) {
            var _this = this;
            this.onTouchedCallback = function () { return fn(_this.data); };
        };
        QueryBuilderComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this.changeDetectorRef.detectChanges();
        };
        QueryBuilderComponent.prototype.findTemplateForRule = function (rule) {
            var type = this.getInputType(rule.field, rule.operator);
            if (type) {
                var queryInput = this.findQueryInput(type);
                if (queryInput) {
                    return queryInput.template;
                }
                else {
                    if (this.defaultTemplateTypes.indexOf(type) === -1) {
                        console.warn("Could not find template for field with type: " + type);
                    }
                    return null;
                }
            }
        };
        QueryBuilderComponent.prototype.findQueryInput = function (type) {
            var templates = this.parentInputTemplates || this.inputTemplates;
            return templates.find(function (item) { return item.queryInputType === type; });
        };
        QueryBuilderComponent.prototype.getOperators = function (field) {
            var tempField = JSON.parse(JSON.stringify(field));
            if (this.operatorsCache[tempField]) {
                return this.operatorsCache[tempField];
            }
            var operators = this.defaultEmptyList;
            var fieldObject = this.config.fields[tempField];
            if (this.config.getOperators) {
                return this.config.getOperators(tempField, fieldObject);
            }
            var type = fieldObject.type;
            if (fieldObject && fieldObject.operators) {
                operators = fieldObject.operators;
            }
            else if (type) {
                operators =
                    (this.operatorMap && this.operatorMap[type]) ||
                        this.defaultOperatorMap[type] ||
                        this.defaultEmptyList;
                if (operators.length === 0) {
                    console.warn("No operators found for field '" + field + "' with type " + fieldObject.type + ". " +
                        "Please define an 'operators' property on the field or use the 'operatorMap' binding to fix this.");
                }
                if (fieldObject.nullable) {
                    operators = operators.concat(["is null", "is not null"]);
                }
            }
            else {
                console.warn("No 'type' property found on field: '" + field + "'");
            }
            // Cache reference to array object, so it won't be computed next time and trigger a rerender.
            this.operatorsCache[field] = operators;
            return operators;
        };
        QueryBuilderComponent.prototype.getFields = function (entity) {
            if (this.entities.length && entity) {
                return this.fields.filter(function (field) {
                    return field && field.entity === entity;
                });
            }
            else {
                return this.fields;
            }
        };
        QueryBuilderComponent.prototype.getInputType = function (field, operator) {
            if (this.config.getInputType) {
                return this.config.getInputType(field, operator);
            }
            if (!this.config.fields[field]) {
                throw new Error("No configuration for field '" + field + "' could be found! Please add it to config.fields.");
            }
            var type = this.config.fields[field].type;
            switch (operator) {
                case "is null":
                case "is not null":
                    return null; // No displayed component
                case "in":
                case "not in":
                    return type === "category" || type === "boolean" ? "multiselect" : type;
                default:
                    return type;
            }
        };
        QueryBuilderComponent.prototype.getOptions = function (field) {
            var tempField = JSON.parse(JSON.stringify(field));
            // tempField = tempField.slice(1,tempField.length-1);       //added
            if (this.config.getOptions) {
                return this.config.getOptions(tempField);
            }
            return this.config.fields[tempField].options || this.defaultEmptyList;
        };
        QueryBuilderComponent.prototype.getClassNames = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var clsLookup = this.classNames
                ? this.classNames
                : this.defaultClassNames;
            var defaultClassNames = this.defaultClassNames;
            var classNames = args
                .map(function (id) { return clsLookup[id] || defaultClassNames[id]; })
                .filter(function (c) { return !!c; });
            return classNames.length ? classNames.join(" ") : [];
        };
        QueryBuilderComponent.prototype.getDefaultField = function (entity) {
            if (!entity) {
                return null;
            }
            else if (entity.defaultField !== undefined) {
                return this.getDefaultValue(entity.defaultField);
            }
            else {
                var entityFields = this.fields.filter(function (field) {
                    return field && field.entity === entity.value;
                });
                if (entityFields && entityFields.length) {
                    return entityFields[0];
                }
                else {
                    console.warn("No fields found for entity '" + entity.name + "'. " +
                        "A 'defaultOperator' is also not specified on the field config. Operator value will default to null.");
                    return null;
                }
            }
        };
        QueryBuilderComponent.prototype.getDefaultOperator = function (field) {
            if (field && field.defaultOperator !== undefined) {
                return this.getDefaultValue(field.defaultOperator);
            }
            else {
                var operators = this.getOperators(field.value);
                if (operators && operators.length) {
                    return operators[0];
                }
                else {
                    console.warn("No operators found for field '" + field.value + "'. " +
                        "A 'defaultOperator' is also not specified on the field config. Operator value will default to null.");
                    return null;
                }
            }
        };
        QueryBuilderComponent.prototype.addRule = function (parent) {
            if (this.disabled) {
                return;
            }
            parent = parent || this.data;
            if (this.config.addRule) {
                this.config.addRule(parent);
            }
            else {
                var field = this.fields[0];
                parent.rules = parent.rules.concat([
                    {
                        field: field.value,
                        operator: this.getDefaultOperator(field),
                        value: this.getDefaultValue(field.defaultValue),
                        entity: field.entity,
                    },
                ]);
            }
            this.handleTouched();
            this.handleDataChange();
        };
        QueryBuilderComponent.prototype.removeRule = function (rule, parent) {
            if (this.disabled) {
                return;
            }
            parent = parent || this.data;
            if (this.config.removeRule) {
                this.config.removeRule(rule, parent);
            }
            else {
                parent.rules = parent.rules.filter(function (r) { return r !== rule; });
            }
            this.inputContextCache.delete(rule);
            this.operatorContextCache.delete(rule);
            this.fieldContextCache.delete(rule);
            this.entityContextCache.delete(rule);
            this.removeButtonContextCache.delete(rule);
            this.handleTouched();
            this.handleDataChange();
        };
        QueryBuilderComponent.prototype.addRuleSet = function (parent) {
            if (this.disabled) {
                return;
            }
            parent = parent || this.data;
            if (this.config.addRuleSet) {
                this.config.addRuleSet(parent);
            }
            else {
                parent.rules = parent.rules.concat([{ condition: "add", rules: [] }]);
            }
            this.handleTouched();
            this.handleDataChange();
        };
        QueryBuilderComponent.prototype.removeRuleSet = function (ruleset, parent) {
            if (this.disabled) {
                return;
            }
            ruleset = ruleset || this.data;
            parent = parent || this.parentValue;
            if (this.config.removeRuleSet) {
                this.config.removeRuleSet(ruleset, parent);
            }
            else {
                parent.rules = parent.rules.filter(function (r) { return r !== ruleset; });
            }
            this.handleTouched();
            this.handleDataChange();
        };
        QueryBuilderComponent.prototype.transitionEnd = function (e) {
            this.treeContainer.nativeElement.style.maxHeight = null;
        };
        QueryBuilderComponent.prototype.toggleCollapse = function () {
            var _this = this;
            this.computedTreeContainerHeight();
            setTimeout(function () {
                _this.data.collapsed = !_this.data.collapsed;
            }, 100);
        };
        QueryBuilderComponent.prototype.computedTreeContainerHeight = function () {
            var nativeElement = this.treeContainer.nativeElement;
            if (nativeElement && nativeElement.firstElementChild) {
                nativeElement.style.maxHeight =
                    nativeElement.firstElementChild.clientHeight + 8 + "px";
            }
        };
        QueryBuilderComponent.prototype.changeCondition = function (value) {
            if (this.disabled) {
                return;
            }
            this.data.condition = value;
            console.log(this.data);
            this.handleTouched();
            this.handleDataChange();
        };
        QueryBuilderComponent.prototype.changeOperator = function (rule) {
            if (this.disabled) {
                return;
            }
            if (this.config.coerceValueForOperator) {
                rule.value = this.config.coerceValueForOperator(rule.operator, rule.value, rule);
            }
            else {
                rule.value = this.coerceValueForOperator(rule.operator, rule.value, rule);
            }
            this.handleTouched();
            this.handleDataChange();
        };
        QueryBuilderComponent.prototype.coerceValueForOperator = function (operator, value, rule) {
            var inputType = this.getInputType(rule.field, operator);
            if (inputType === "multiselect" && !Array.isArray(value)) {
                return [value];
            }
            return value;
        };
        QueryBuilderComponent.prototype.changeInput = function () {
            if (this.disabled) {
                return;
            }
            this.handleTouched();
            this.handleDataChange();
        };
        QueryBuilderComponent.prototype.changeField = function (fieldValue, rule) {
            if (this.disabled || fieldValue == null) {
                return;
            }
            rule.field = JSON.parse(JSON.stringify(rule.tempField));
            var inputContext = this.inputContextCache.get(rule);
            var currentField = inputContext && inputContext.field;
            var nextField = this.config.fields[fieldValue];
            var nextValue = this.calculateFieldChangeValue(currentField, nextField, rule.value);
            if (nextValue !== undefined) {
                rule.value = nextValue;
            }
            else {
                delete rule.value;
            }
            rule.operator = this.getDefaultOperator(nextField);
            // Create new context objects so templates will automatically update
            this.inputContextCache.delete(rule);
            this.operatorContextCache.delete(rule);
            this.fieldContextCache.delete(rule);
            this.entityContextCache.delete(rule);
            this.getInputContext(rule);
            this.getFieldContext(rule);
            this.getOperatorContext(rule);
            this.getEntityContext(rule);
            this.handleTouched();
            this.handleDataChange();
        };
        QueryBuilderComponent.prototype.changeEntity = function (entityValue, rule, index, data) {
            if (this.disabled) {
                return;
            }
            var i = index;
            var rs = data;
            var entity = this.entities.find(function (e) { return e.value === entityValue; });
            var defaultField = this.getDefaultField(entity);
            if (!rs) {
                rs = this.data;
                i = rs.rules.findIndex(function (x) { return x === rule; });
            }
            rule.field = defaultField.value;
            rs.rules[i] = rule;
            if (defaultField) {
                this.changeField(defaultField.value, rule);
            }
            else {
                this.handleTouched();
                this.handleDataChange();
            }
        };
        QueryBuilderComponent.prototype.getDefaultValue = function (defaultValue) {
            switch (typeof defaultValue) {
                case "function":
                    return defaultValue();
                default:
                    return defaultValue;
            }
        };
        QueryBuilderComponent.prototype.getOperatorTemplate = function () {
            var t = this.parentOperatorTemplate || this.operatorTemplate;
            return t ? t.template : null;
        };
        QueryBuilderComponent.prototype.getFieldTemplate = function () {
            var t = this.parentFieldTemplate || this.fieldTemplate;
            return t ? t.template : null;
        };
        QueryBuilderComponent.prototype.getEntityTemplate = function () {
            var t = this.parentEntityTemplate || this.entityTemplate;
            return t ? t.template : null;
        };
        QueryBuilderComponent.prototype.getArrowIconTemplate = function () {
            var t = this.parentArrowIconTemplate || this.arrowIconTemplate;
            return t ? t.template : null;
        };
        QueryBuilderComponent.prototype.getButtonGroupTemplate = function () {
            var t = this.parentButtonGroupTemplate || this.buttonGroupTemplate;
            return t ? t.template : null;
        };
        QueryBuilderComponent.prototype.getSwitchGroupTemplate = function () {
            var t = this.parentSwitchGroupTemplate || this.switchGroupTemplate;
            return t ? t.template : null;
        };
        QueryBuilderComponent.prototype.getRemoveButtonTemplate = function () {
            var t = this.parentRemoveButtonTemplate || this.removeButtonTemplate;
            return t ? t.template : null;
        };
        QueryBuilderComponent.prototype.getEmptyWarningTemplate = function () {
            var t = this.parentEmptyWarningTemplate || this.emptyWarningTemplate;
            return t ? t.template : null;
        };
        QueryBuilderComponent.prototype.getQueryItemClassName = function (local) {
            var cls = this.getClassNames("row", "connector", "transition");
            cls += " " + this.getClassNames(local.ruleset ? "ruleSet" : "rule");
            if (local.invalid) {
                cls += " " + this.getClassNames("invalidRuleSet");
            }
            return cls;
        };
        QueryBuilderComponent.prototype.getButtonGroupContext = function () {
            if (!this.buttonGroupContext) {
                this.buttonGroupContext = {
                    addRule: this.addRule.bind(this),
                    addRuleSet: this.allowRuleset && this.addRuleSet.bind(this),
                    removeRuleSet: this.allowRuleset &&
                        this.parentValue &&
                        this.removeRuleSet.bind(this),
                    getDisabledState: this.getDisabledState,
                    $implicit: this.data,
                };
            }
            return this.buttonGroupContext;
        };
        QueryBuilderComponent.prototype.getRemoveButtonContext = function (rule) {
            if (!this.removeButtonContextCache.has(rule)) {
                this.removeButtonContextCache.set(rule, {
                    removeRule: this.removeRule.bind(this),
                    getDisabledState: this.getDisabledState,
                    $implicit: rule,
                });
            }
            return this.removeButtonContextCache.get(rule);
        };
        QueryBuilderComponent.prototype.getFieldContext = function (rule) {
            if (!this.fieldContextCache.has(rule)) {
                this.fieldContextCache.set(rule, {
                    onChange: this.changeField.bind(this),
                    getFields: this.getFields.bind(this),
                    getDisabledState: this.getDisabledState,
                    fields: this.fields,
                    $implicit: rule,
                });
            }
            return this.fieldContextCache.get(rule);
        };
        QueryBuilderComponent.prototype.getEntityContext = function (rule) {
            if (!this.entityContextCache.has(rule)) {
                this.entityContextCache.set(rule, {
                    onChange: this.changeEntity.bind(this),
                    getDisabledState: this.getDisabledState,
                    entities: this.entities,
                    $implicit: rule,
                });
            }
            return this.entityContextCache.get(rule);
        };
        QueryBuilderComponent.prototype.getSwitchGroupContext = function () {
            return {
                onChange: this.changeCondition.bind(this),
                getDisabledState: this.getDisabledState,
                $implicit: this.data,
            };
        };
        QueryBuilderComponent.prototype.getArrowIconContext = function () {
            return {
                getDisabledState: this.getDisabledState,
                $implicit: this.data,
            };
        };
        QueryBuilderComponent.prototype.getEmptyWarningContext = function () {
            return {
                getDisabledState: this.getDisabledState,
                message: this.emptyMessage,
                $implicit: this.data,
            };
        };
        QueryBuilderComponent.prototype.getOperatorContext = function (rule) {
            if (!this.operatorContextCache.has(rule)) {
                this.operatorContextCache.set(rule, {
                    onChange: this.changeOperator.bind(this),
                    getDisabledState: this.getDisabledState,
                    operators: this.getOperators(rule.field),
                    $implicit: rule,
                });
            }
            return this.operatorContextCache.get(rule);
        };
        QueryBuilderComponent.prototype.getInputContext = function (rule) {
            if (!this.inputContextCache.has(rule)) {
                this.inputContextCache.set(rule, {
                    onChange: this.changeInput.bind(this),
                    getDisabledState: this.getDisabledState,
                    options: this.getOptions(rule.field),
                    field: this.config.fields[rule.field],
                    $implicit: rule,
                });
            }
            return this.inputContextCache.get(rule);
        };
        QueryBuilderComponent.prototype.calculateFieldChangeValue = function (currentField, nextField, currentValue) {
            var _this = this;
            if (this.config.calculateFieldChangeValue != null) {
                return this.config.calculateFieldChangeValue(currentField, nextField, currentValue);
            }
            var canKeepValue = function () {
                if (currentField == null || nextField == null) {
                    return false;
                }
                return (currentField.type === nextField.type &&
                    _this.defaultPersistValueTypes.indexOf(currentField.type) !== -1);
            };
            if (this.persistValueOnFieldChange && canKeepValue()) {
                return currentValue;
            }
            if (nextField && nextField.defaultValue !== undefined) {
                return this.getDefaultValue(nextField.defaultValue);
            }
            return undefined;
        };
        QueryBuilderComponent.prototype.checkEmptyRuleInRuleset = function (ruleset) {
            var _this = this;
            if (!ruleset || !ruleset.rules || ruleset.rules.length === 0) {
                return true;
            }
            else {
                return ruleset.rules.some(function (item) {
                    if (item.rules) {
                        return _this.checkEmptyRuleInRuleset(item);
                    }
                    else {
                        return false;
                    }
                });
            }
        };
        QueryBuilderComponent.prototype.validateRulesInRuleset = function (ruleset, errorStore) {
            var _this = this;
            if (ruleset && ruleset.rules && ruleset.rules.length > 0) {
                ruleset.rules.forEach(function (item) {
                    if (item.rules) {
                        return _this.validateRulesInRuleset(item, errorStore);
                    }
                    else if (item.field) {
                        var field = _this.config.fields[item.field];
                        if (field && field.validator && field.validator.apply) {
                            var error = field.validator(item, ruleset);
                            if (error != null) {
                                errorStore.push(error);
                            }
                        }
                    }
                });
            }
        };
        QueryBuilderComponent.prototype.handleDataChange = function () {
            this.changeDetectorRef.markForCheck();
            if (this.onChangeCallback) {
                this.onChangeCallback();
            }
            if (this.parentChangeCallback) {
                this.parentChangeCallback();
            }
        };
        QueryBuilderComponent.prototype.handleTouched = function () {
            if (this.onTouchedCallback) {
                this.onTouchedCallback();
            }
            if (this.parentTouchedCallback) {
                this.parentTouchedCallback();
            }
        };
        return QueryBuilderComponent;
    }());
    QueryBuilderComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryBuilderComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    QueryBuilderComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: QueryBuilderComponent, selector: "query-builder", inputs: { disabled: "disabled", data: "data", allowRuleset: "allowRuleset", allowCollapse: "allowCollapse", emptyMessage: "emptyMessage", classNames: "classNames", operatorMap: "operatorMap", parentValue: "parentValue", config: "config", parentArrowIconTemplate: "parentArrowIconTemplate", parentInputTemplates: "parentInputTemplates", parentOperatorTemplate: "parentOperatorTemplate", parentFieldTemplate: "parentFieldTemplate", parentEntityTemplate: "parentEntityTemplate", parentSwitchGroupTemplate: "parentSwitchGroupTemplate", parentButtonGroupTemplate: "parentButtonGroupTemplate", parentRemoveButtonTemplate: "parentRemoveButtonTemplate", parentEmptyWarningTemplate: "parentEmptyWarningTemplate", parentChangeCallback: "parentChangeCallback", parentTouchedCallback: "parentTouchedCallback", persistValueOnFieldChange: "persistValueOnFieldChange", value: "value" }, providers: [CONTROL_VALUE_ACCESSOR, VALIDATOR], queries: [{ propertyName: "buttonGroupTemplate", first: true, predicate: QueryButtonGroupDirective, descendants: true }, { propertyName: "switchGroupTemplate", first: true, predicate: QuerySwitchGroupDirective, descendants: true }, { propertyName: "fieldTemplate", first: true, predicate: QueryFieldDirective, descendants: true }, { propertyName: "entityTemplate", first: true, predicate: QueryEntityDirective, descendants: true }, { propertyName: "operatorTemplate", first: true, predicate: QueryOperatorDirective, descendants: true }, { propertyName: "removeButtonTemplate", first: true, predicate: QueryRemoveButtonDirective, descendants: true }, { propertyName: "emptyWarningTemplate", first: true, predicate: QueryEmptyWarningDirective, descendants: true }, { propertyName: "arrowIconTemplate", first: true, predicate: QueryArrowIconDirective, descendants: true }, { propertyName: "inputTemplates", predicate: QueryInputDirective }], viewQueries: [{ propertyName: "treeContainer", first: true, predicate: ["treeContainer"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<div [ngClass]=\"getClassNames('switchRow')\">\n  <ng-template #defaultArrowIcon>\n    <em [ngClass]=\"getClassNames('arrowIcon')\"></em>\n  </ng-template>\n\n  <a\n    *ngIf=\"allowCollapse\"\n    (click)=\"toggleCollapse()\"\n    [ngClass]=\"\n      getClassNames('arrowIconButton', data.collapsed ? 'collapsed' : '')\n    \"\n  >\n    <ng-container\n      *ngIf=\"getArrowIconTemplate() as template; else defaultArrowIcon\"\n    >\n      <ng-container\n        *ngTemplateOutlet=\"template; context: getArrowIconContext()\"\n      ></ng-container>\n    </ng-container>\n  </a>\n\n  <ng-container\n    *ngIf=\"getButtonGroupTemplate() as template; else defaultButtonGroup\"\n  >\n    <div [ngClass]=\"getClassNames('buttonGroup', 'rightAlign')\">\n      <ng-container\n        *ngTemplateOutlet=\"template; context: getButtonGroupContext()\"\n      ></ng-container>\n    </div>\n  </ng-container>\n\n  <ng-template #defaultButtonGroup>\n    <div [ngClass]=\"getClassNames('buttonGroup', 'rightAlign')\">\n      <button\n        type=\"button\"\n        (click)=\"addRule()\"\n        [ngClass]=\"getClassNames('button')\"\n        [disabled]=\"disabled\"\n      >\n        <em [ngClass]=\"getClassNames('addIcon')\"></em> Rule\n      </button>\n      <button\n        type=\"button\"\n        (click)=\"addRuleSet()\"\n        [ngClass]=\"getClassNames('button')\"\n        *ngIf=\"allowRuleset\"\n        [disabled]=\"disabled\"\n      >\n        <em [ngClass]=\"getClassNames('addIcon')\"></em> Ruleset\n      </button>\n      <ng-container *ngIf=\"!!parentValue && allowRuleset\">\n        <button\n          type=\"button\"\n          (click)=\"removeRuleSet()\"\n          [ngClass]=\"getClassNames('button', 'removeButton')\"\n          [disabled]=\"disabled\"\n        >\n          Remove\n          <em [ngClass]=\"getClassNames('removeIcon')\"></em>\n        </button>\n      </ng-container>\n    </div>\n  </ng-template>\n\n  <ng-container\n    *ngIf=\"getSwitchGroupTemplate() as template; else defaultSwitchGroup\"\n  >\n    <ng-container\n      *ngTemplateOutlet=\"template; context: getSwitchGroupContext()\"\n    ></ng-container>\n  </ng-container>\n\n  <ng-template #defaultSwitchGroup>\n    <div [ngClass]=\"getClassNames('switchGroup', 'transition')\" *ngIf=\"data\">\n      <div [ngClass]=\"getClassNames('switchControl')\">\n        <input\n          type=\"radio\"\n          [ngClass]=\"getClassNames('switchRadio')\"\n          [(ngModel)]=\"data.condition\"\n          [disabled]=\"disabled\"\n          (click)=\"changeCondition(andOption.value)\"\n          value=\"and\"\n          #andOption\n        />\n        <label\n          (click)=\"changeCondition(andOption.value)\"\n          [ngClass]=\"getClassNames('switchLabel')\"\n          >AND</label\n        >\n      </div>\n      <div [ngClass]=\"getClassNames('switchControl')\">\n        <input\n          type=\"radio\"\n          [ngClass]=\"getClassNames('switchRadio')\"\n          [(ngModel)]=\"data.condition\"\n          (click)=\"changeCondition(orOption.value)\"\n          [disabled]=\"disabled\"\n          value=\"or\"\n          #orOption\n        />\n        <label\n          (click)=\"changeCondition(orOption.value)\"\n          [ngClass]=\"getClassNames('switchLabel')\"\n          >OR</label\n        >\n      </div>\n    </div>\n  </ng-template>\n</div>\n\n<div\n  #treeContainer\n  (transitionend)=\"transitionEnd($event)\"\n  [ngClass]=\"getClassNames('treeContainer', data.collapsed ? 'collapsed' : '')\"\n>\n  <ul [ngClass]=\"getClassNames('tree')\" *ngIf=\"data && data.rules\">\n    <ng-container *ngFor=\"let rule of data.rules; let i = index\">\n      <ng-container\n        *ngIf=\"{\n          ruleset: !!rule.rules,\n          invalid:\n            !config.allowEmptyRulesets && rule.rules && rule.rules.length === 0\n        } as local\"\n      >\n        <li class=\"rule\" [ngClass]=\"getQueryItemClassName(local)\">\n          <ng-container *ngIf=\"!local.ruleset\">\n            <ng-container\n              *ngIf=\"\n                getRemoveButtonTemplate() as template;\n                else defaultRemoveButton\n              \"\n            >\n              <div [ngClass]=\"getClassNames('buttonGroup', 'rightAlign')\">\n                <ng-container\n                  *ngTemplateOutlet=\"\n                    template;\n                    context: getRemoveButtonContext(rule)\n                  \"\n                ></ng-container>\n              </div>\n            </ng-container>\n\n            <ng-template #defaultRemoveButton>\n              <div [ngClass]=\"getClassNames('removeButtonSize', 'rightAlign')\">\n                <button\n                  type=\"button\"\n                  [ngClass]=\"getClassNames('button', 'removeButton')\"\n                  (click)=\"removeRule(rule, data)\"\n                  [disabled]=\"disabled\"\n                >\n                  Remove rule\n                  <em [ngClass]=\"getClassNames('removeIcon')\"></em>\n                </button>\n              </div>\n            </ng-template>\n\n            <div *ngIf=\"entities?.length\" class=\"q-inline-block-display\">\n              <ng-container\n                *ngIf=\"getEntityTemplate() as template; else defaultEntity\"\n              >\n                <ng-container\n                  *ngTemplateOutlet=\"template; context: getEntityContext(rule)\"\n                ></ng-container>\n              </ng-container>\n            </div>\n\n            <ng-template #defaultEntity>\n              <div [ngClass]=\"getClassNames('entityControlSize')\">\n                <select\n                  [ngClass]=\"getClassNames('entityControl')\"\n                  [(ngModel)]=\"rule.entity\"\n                  (ngModelChange)=\"changeEntity($event, rule, i, data)\"\n                  [disabled]=\"disabled\"\n                >\n                  <!-- <option *ngFor=\"let entity of entities\" [ngValue]=\"entity.value\"> -->\n                  <!-- {{entity.name}} -->\n                  <!-- </option> -->\n                </select>\n              </div>\n            </ng-template>\n\n            <ng-container\n              *ngIf=\"getFieldTemplate() as template; else defaultField\"\n            >\n              <ng-container\n                *ngTemplateOutlet=\"template; context: getFieldContext(rule)\"\n              ></ng-container>\n            </ng-container>\n\n            <ng-template #defaultField>\n              <div [ngClass]=\"getClassNames('fieldControlSize')\">\n                <ng-select\n                  [(ngModel)]=\"rule.tempField\"\n                  [ngClass]=\"getClassNames('fieldControl')\"\n                  (change)=\"changeField($event, rule)\"\n                  [disabled]=\"disabled\"\n                >\n                  <ng-option\n                    *ngFor=\"let field of getFields(rule.entity)\"\n                    [value]=\"field.value\"\n                  >\n                    {{ field.name }}\n                  </ng-option>\n                </ng-select>\n              </div>\n            </ng-template>\n\n            <ng-container\n              *ngIf=\"getOperatorTemplate() as template; else defaultOperator\"\n            >\n              <ng-container\n                *ngTemplateOutlet=\"template; context: getOperatorContext(rule)\"\n              ></ng-container>\n            </ng-container>\n\n            <ng-template #defaultOperator>\n              <div [ngClass]=\"getClassNames('operatorControlSize')\">\n                <select\n                  [ngClass]=\"getClassNames('operatorControl')\"\n                  [(ngModel)]=\"rule.operator\"\n                  (ngModelChange)=\"changeOperator(rule)\"\n                  [disabled]=\"disabled\"\n                >\n                  <option\n                    *ngFor=\"let operator of getOperators(rule.field)\"\n                    [ngValue]=\"operator\"\n                  >\n                    {{ operator }}\n                  </option>\n                </select>\n              </div>\n            </ng-template>\n\n            <ng-container\n              *ngIf=\"findTemplateForRule(rule) as template; else defaultInput\"\n            >\n              <ng-container\n                *ngTemplateOutlet=\"template; context: getInputContext(rule)\"\n              ></ng-container>\n            </ng-container>\n\n            <ng-template #defaultInput>\n              <div\n                [ngClass]=\"getClassNames('inputControlSize')\"\n                [ngSwitch]=\"getInputType(rule.field, rule.operator)\"\n              >\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'string'\"\n                  type=\"text\"\n                />\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'number'\"\n                  type=\"number\"\n                />\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'date'\"\n                  type=\"date\"\n                />\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'time'\"\n                  type=\"time\"\n                />\n                <select\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'category'\"\n                >\n                  <option\n                    *ngFor=\"let opt of getOptions(rule.field)\"\n                    [ngValue]=\"opt.value\"\n                  >\n                    {{ opt.name }}\n                  </option>\n                </select>\n                <ng-container *ngSwitchCase=\"'multiselect'\">\n                  <select\n                    [ngClass]=\"getClassNames('inputControl')\"\n                    [(ngModel)]=\"rule.value\"\n                    (ngModelChange)=\"changeInput()\"\n                    [disabled]=\"disabled\"\n                    multiple\n                  >\n                    <option\n                      *ngFor=\"let opt of getOptions(rule.field)\"\n                      [ngValue]=\"opt.value\"\n                    >\n                      {{ opt.name }}\n                    </option>\n                  </select>\n                </ng-container>\n                <input\n                  [ngClass]=\"getClassNames('inputControl')\"\n                  [(ngModel)]=\"rule.value\"\n                  (ngModelChange)=\"changeInput()\"\n                  [disabled]=\"disabled\"\n                  *ngSwitchCase=\"'boolean'\"\n                  type=\"checkbox\"\n                />\n              </div>\n            </ng-template>\n          </ng-container>\n          <query-builder\n            *ngIf=\"local.ruleset\"\n            [data]=\"rule\"\n            [disabled]=\"disabled\"\n            [parentTouchedCallback]=\"parentTouchedCallback || onTouchedCallback\"\n            [parentChangeCallback]=\"parentChangeCallback || onChangeCallback\"\n            [parentInputTemplates]=\"parentInputTemplates || inputTemplates\"\n            [parentOperatorTemplate]=\"\n              parentOperatorTemplate || operatorTemplate\n            \"\n            [parentFieldTemplate]=\"parentFieldTemplate || fieldTemplate\"\n            [parentEntityTemplate]=\"parentEntityTemplate || entityTemplate\"\n            [parentSwitchGroupTemplate]=\"\n              parentSwitchGroupTemplate || switchGroupTemplate\n            \"\n            [parentButtonGroupTemplate]=\"\n              parentButtonGroupTemplate || buttonGroupTemplate\n            \"\n            [parentRemoveButtonTemplate]=\"\n              parentRemoveButtonTemplate || removeButtonTemplate\n            \"\n            [parentEmptyWarningTemplate]=\"\n              parentEmptyWarningTemplate || emptyWarningTemplate\n            \"\n            [parentArrowIconTemplate]=\"\n              parentArrowIconTemplate || arrowIconTemplate\n            \"\n            [parentValue]=\"data\"\n            [classNames]=\"classNames\"\n            [config]=\"config\"\n            [allowRuleset]=\"allowRuleset\"\n            [allowCollapse]=\"allowCollapse\"\n            [emptyMessage]=\"emptyMessage\"\n            [operatorMap]=\"operatorMap\"\n          >\n          </query-builder>\n\n          <ng-container\n            *ngIf=\"\n              getEmptyWarningTemplate() as template;\n              else defaultEmptyWarning\n            \"\n          >\n            <ng-container *ngIf=\"local.invalid\">\n              <ng-container\n                *ngTemplateOutlet=\"template; context: getEmptyWarningContext()\"\n              ></ng-container>\n            </ng-container>\n          </ng-container>\n\n          <ng-template #defaultEmptyWarning>\n            <p [ngClass]=\"getClassNames('emptyWarning')\" *ngIf=\"local.invalid\">\n              {{ emptyMessage }}\n            </p>\n          </ng-template>\n        </li>\n      </ng-container>\n    </ng-container>\n  </ul>\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host .q-icon{font-style:normal;font-size:12px}:host .q-remove-icon:before{content:\"\\274c\"}:host .q-arrow-icon-button{float:left;margin:4px 6px 4px 0;transform:rotate(90deg);transition:linear .25s transform;cursor:pointer}:host .q-arrow-icon-button.q-collapsed{transform:rotate(0)}:host .q-arrow-icon:before{content:\"\\25b6\"}:host .q-add-icon{color:#555}:host .q-add-icon:before{content:\"\\2795\"}:host .q-remove-button{color:#b3415d;width:31px}:host .q-switch-group,:host .q-button-group{font-family:\"Lucida Grande\",Tahoma,Verdana,sans-serif;overflow:hidden}:host .q-right-align{float:right}:host .q-button{margin-left:8px;padding:0 8px;background-color:#fff}:host .q-button:disabled{display:none}:host .q-control-size{display:inline-block;vertical-align:top;padding-right:10px}:host .q-input-control,:host .q-operator-control,:host .q-field-control,:host .q-entity-control{display:inline-block;padding:5px 8px;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;width:auto;min-width:180px}:host .q-input-control:disabled,:host .q-operator-control:disabled,:host .q-field-control:disabled,:host .q-entity-control:disabled{border-color:transparent}:host .q-operator-control,:host .q-field-control,:host .q-entity-control,:host .q-input-control:not([type=checkbox]){min-height:32px;-webkit-appearance:none}:host .q-switch-label,:host .q-button{float:left;margin-bottom:0;font-size:14px;line-height:30px;font-weight:normal;text-align:center;text-shadow:none;border:1px solid rgba(0,0,0,.2);box-sizing:border-box}:host .q-switch-label:hover,:host .q-button:hover{cursor:pointer;background-color:#f0f0f0}:host .q-switch-label{background-color:#e4e4e4;padding:0 8px}:host .q-switch-radio{position:absolute;clip:rect(0,0,0,0);height:1px;width:1px;border:0;overflow:hidden}:host .q-switch-radio:checked+.q-switch-label{border:1px solid #619ed7;background:white;color:#3176b3}:host .q-switch-radio:disabled+.q-switch-label{display:none}:host .q-switch-radio:checked:disabled+.q-switch-label{display:initial;color:initial;cursor:default;border-color:transparent}:host .q-invalid-ruleset{border:1px solid rgba(179,65,93,.5)!important;background:rgba(179,65,93,.1)!important}:host .q-empty-warning{color:#8d252e;text-align:center}:host .q-ruleset{border:1px solid #ccc}:host .q-rule{border:1px solid #ccc;background:white}:host .q-transition{transition:all .1s ease-in-out}:host .q-tree-container{width:100%;overflow:hidden;transition:ease-in .25s max-height}:host .q-tree-container.q-collapsed{max-height:0!important}:host .q-tree{list-style:none;margin:4px 0 2px}:host .q-row{padding:6px 8px;margin-top:6px}:host .q-connector{position:relative}:host .q-connector:before{top:-5px;border-width:0 0 2px 2px}:host .q-connector:after{border-width:0 0 0 2px;top:50%}:host .q-connector:before,:host .q-connector:after{content:\"\";left:-12px;border-color:#ccc;border-style:solid;width:9px;height:calc(50% + 6px);position:absolute}:host .q-connector:last-child:after{content:none}:host .q-inline-block-display{display:inline-block;vertical-align:top}:host .q-tree-container{overflow:visible!important}\n"], components: [{ type: i1__namespace.NgSelectComponent, selector: "ng-select", inputs: ["markFirst", "dropdownPosition", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "bufferAmount", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd", "bindLabel", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "virtualScroll", "openOnEnter", "appendTo", "bindValue", "appearance", "maxSelectedItems", "groupBy", "groupValue", "tabIndex", "typeahead"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { type: i1__namespace.ɵr, selector: "ng-option", inputs: ["disabled", "value"] }, { type: QueryBuilderComponent, selector: "query-builder", inputs: ["disabled", "data", "allowRuleset", "allowCollapse", "emptyMessage", "classNames", "operatorMap", "parentValue", "config", "parentArrowIconTemplate", "parentInputTemplates", "parentOperatorTemplate", "parentFieldTemplate", "parentEntityTemplate", "parentSwitchGroupTemplate", "parentButtonGroupTemplate", "parentRemoveButtonTemplate", "parentEmptyWarningTemplate", "parentChangeCallback", "parentTouchedCallback", "persistValueOnFieldChange", "value"] }], directives: [{ type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3__namespace.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { type: i3__namespace.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i3__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3__namespace.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i3__namespace.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i3__namespace.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3__namespace.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { type: i3__namespace.SelectMultipleControlValueAccessor, selector: "select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]", inputs: ["compareWith"] }, { type: i3__namespace.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: QueryBuilderComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: "query-builder",
                        templateUrl: "./query-builder.component.html",
                        styleUrls: ["./query-builder.component.scss"],
                        providers: [CONTROL_VALUE_ACCESSOR, VALIDATOR],
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                    type: i0.Input
                }], data: [{
                    type: i0.Input
                }], allowRuleset: [{
                    type: i0.Input
                }], allowCollapse: [{
                    type: i0.Input
                }], emptyMessage: [{
                    type: i0.Input
                }], classNames: [{
                    type: i0.Input
                }], operatorMap: [{
                    type: i0.Input
                }], parentValue: [{
                    type: i0.Input
                }], config: [{
                    type: i0.Input
                }], parentArrowIconTemplate: [{
                    type: i0.Input
                }], parentInputTemplates: [{
                    type: i0.Input
                }], parentOperatorTemplate: [{
                    type: i0.Input
                }], parentFieldTemplate: [{
                    type: i0.Input
                }], parentEntityTemplate: [{
                    type: i0.Input
                }], parentSwitchGroupTemplate: [{
                    type: i0.Input
                }], parentButtonGroupTemplate: [{
                    type: i0.Input
                }], parentRemoveButtonTemplate: [{
                    type: i0.Input
                }], parentEmptyWarningTemplate: [{
                    type: i0.Input
                }], parentChangeCallback: [{
                    type: i0.Input
                }], parentTouchedCallback: [{
                    type: i0.Input
                }], persistValueOnFieldChange: [{
                    type: i0.Input
                }], treeContainer: [{
                    type: i0.ViewChild,
                    args: ["treeContainer", { static: true }]
                }], buttonGroupTemplate: [{
                    type: i0.ContentChild,
                    args: [QueryButtonGroupDirective]
                }], switchGroupTemplate: [{
                    type: i0.ContentChild,
                    args: [QuerySwitchGroupDirective]
                }], fieldTemplate: [{
                    type: i0.ContentChild,
                    args: [QueryFieldDirective]
                }], entityTemplate: [{
                    type: i0.ContentChild,
                    args: [QueryEntityDirective]
                }], operatorTemplate: [{
                    type: i0.ContentChild,
                    args: [QueryOperatorDirective]
                }], removeButtonTemplate: [{
                    type: i0.ContentChild,
                    args: [QueryRemoveButtonDirective]
                }], emptyWarningTemplate: [{
                    type: i0.ContentChild,
                    args: [QueryEmptyWarningDirective]
                }], inputTemplates: [{
                    type: i0.ContentChildren,
                    args: [QueryInputDirective]
                }], arrowIconTemplate: [{
                    type: i0.ContentChild,
                    args: [QueryArrowIconDirective]
                }], value: [{
                    type: i0.Input
                }] } });

    var Angular2QueryBuilderModule = /** @class */ (function () {
        function Angular2QueryBuilderModule() {
        }
        return Angular2QueryBuilderModule;
    }());
    Angular2QueryBuilderModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Angular2QueryBuilderModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    Angular2QueryBuilderModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Angular2QueryBuilderModule, declarations: [QueryBuilderComponent,
            QueryInputDirective,
            QueryOperatorDirective,
            QueryFieldDirective,
            QueryEntityDirective,
            QueryButtonGroupDirective,
            QuerySwitchGroupDirective,
            QueryRemoveButtonDirective,
            QueryEmptyWarningDirective,
            QueryArrowIconDirective], imports: [i1.NgSelectModule,
            i2.CommonModule,
            i3.FormsModule], exports: [QueryBuilderComponent,
            QueryInputDirective,
            QueryOperatorDirective,
            QueryFieldDirective,
            QueryEntityDirective,
            QueryButtonGroupDirective,
            QuerySwitchGroupDirective,
            QueryRemoveButtonDirective,
            QueryEmptyWarningDirective,
            QueryArrowIconDirective] });
    Angular2QueryBuilderModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Angular2QueryBuilderModule, imports: [[
                i1.NgSelectModule,
                i2.CommonModule,
                i3.FormsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Angular2QueryBuilderModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1.NgSelectModule,
                            i2.CommonModule,
                            i3.FormsModule
                        ],
                        declarations: [
                            QueryBuilderComponent,
                            QueryInputDirective,
                            QueryOperatorDirective,
                            QueryFieldDirective,
                            QueryEntityDirective,
                            QueryButtonGroupDirective,
                            QuerySwitchGroupDirective,
                            QueryRemoveButtonDirective,
                            QueryEmptyWarningDirective,
                            QueryArrowIconDirective
                        ],
                        exports: [
                            QueryBuilderComponent,
                            QueryInputDirective,
                            QueryOperatorDirective,
                            QueryFieldDirective,
                            QueryEntityDirective,
                            QueryButtonGroupDirective,
                            QuerySwitchGroupDirective,
                            QueryRemoveButtonDirective,
                            QueryEmptyWarningDirective,
                            QueryArrowIconDirective
                        ]
                    }]
            }] });

    /*
     * Public API Surface of angular2-query-builder
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angular2QueryBuilderModule = Angular2QueryBuilderModule;
    exports.CONTROL_VALUE_ACCESSOR = CONTROL_VALUE_ACCESSOR;
    exports.QueryArrowIconDirective = QueryArrowIconDirective;
    exports.QueryBuilderComponent = QueryBuilderComponent;
    exports.QueryButtonGroupDirective = QueryButtonGroupDirective;
    exports.QueryEmptyWarningDirective = QueryEmptyWarningDirective;
    exports.QueryEntityDirective = QueryEntityDirective;
    exports.QueryFieldDirective = QueryFieldDirective;
    exports.QueryInputDirective = QueryInputDirective;
    exports.QueryOperatorDirective = QueryOperatorDirective;
    exports.QueryRemoveButtonDirective = QueryRemoveButtonDirective;
    exports.QuerySwitchGroupDirective = QuerySwitchGroupDirective;
    exports.VALIDATOR = VALIDATOR;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=angular2-query-builder.umd.js.map
