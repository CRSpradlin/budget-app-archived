function doGet(e) {}

function GetLatestUnreadPurchases() {}

function SubmitNewPurchase(formObject) {}

function test() {}

 /******/ (() => {
    // webpackBootstrap
    /******/ "use strict";
    /******/ // The require scope
    /******/    var __webpack_require__ = {};
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/global */
    /******/    
    /******/ __webpack_require__.g = function() {
        /******/ if ("object" == typeof globalThis) return globalThis;
        /******/        try {
            /******/ return this || new Function("return this")();
            /******/        } catch (e) {
            /******/ if ("object" == typeof window) return window;
            /******/        }
        /******/    }(), 
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = exports => {
        /******/ "undefined" != typeof Symbol && Symbol.toStringTag && 
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        })
        /******/ , Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }
    /******/;
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // ESM COMPAT FLAG
        __webpack_require__.r(__webpack_exports__);
    // CONCATENATED MODULE: ./src/server/utils/propFunctions.ts
    var GetLatestUnreadPurchases = function() {
        var mail, props = PropertiesService.getScriptProperties().getProperties(), result = [], index = 0;
        do {
            for (var _i = 0, mail_1 = mail = GmailApp.search("label:".concat(props.EMAIL_UREAD_LABEL), index, 50); _i < mail_1.length; _i++) {
                var thread = mail_1[_i], description = thread.getMessages()[0].getSubject(), amountMatch = description.match(/\$([0-9,.]+)/), amount = null == amountMatch ? 0 : parseFloat(amountMatch[1]), newPurchase = {
                    threadId: thread.getId(),
                    amount,
                    isoDate: thread.getLastMessageDate().toISOString(),
                    description
                };
                result.unshift(newPurchase), index++;
            }
        } while (0 != mail.length);
        return result;
    }, __assign = undefined && undefined.__assign || function() {
        return __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
            return t;
        }, __assign.apply(this, arguments);
    };
    __webpack_require__.g.doGet = function(e) {
        return HtmlService.createHtmlOutputFromFile("dist/index.html").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).addMetaTag("viewport", "width=device-width, initial-scale=1").setTitle("BudgetApp");
    }, __webpack_require__.g.GetLatestUnreadPurchases = function() {
        return GetLatestUnreadPurchases();
    }, __webpack_require__.g.SubmitNewPurchase = function(formObject) {
        return Logger.log(JSON.stringify(formObject)), __assign({}, formObject);
    }, __webpack_require__.g.test = function() {
        Logger.log(GetLatestUnreadPurchases());
    };
    for (var i in __webpack_exports__) this[i] = __webpack_exports__[i];
    __webpack_exports__.__esModule && Object.defineProperty(this, "__esModule", {
        value: !0
    })
    /******/;
})();