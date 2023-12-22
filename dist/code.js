function doGet(e) {}

function GetLatestUnreadPurchases() {}

function GetCurrentMonthPurchases() {}

function SubmitNewPurchase(formObject) {}

function MarkPurchaseAsRead(purchase) {}

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
    var PurchaseCategory, propFunctions_GetProps = function() {
        return PropertiesService.getScriptProperties().getProperties();
    };
    !function(PurchaseCategory) {
        PurchaseCategory.Rent = "Rent", PurchaseCategory.Utilities = "Utilities", PurchaseCategory.Grocery = "Grocery", 
        PurchaseCategory.Dining = "Dining", PurchaseCategory.Dog = "Dog", PurchaseCategory.Car = "Car", 
        PurchaseCategory.Shopping = "Shopping", PurchaseCategory.Uncategorized = "Uncategorized";
    }(PurchaseCategory || (PurchaseCategory = {}));
    // CONCATENATED MODULE: ./src/server/utils/sheetFunctions.ts
    var AddPurchaseToSheet = function(newPurchase) {
        var monthRecordSheet = function(purchase) {
            var props = propFunctions_GetProps(), mainSheet = SpreadsheetApp.openById(props.MAIN_SHEET_ID), purchaseDate = new Date(purchase.isoDate), sheetName = "".concat(purchaseDate.toLocaleString("default", {
                month: "long"
            }), ", ").concat(purchaseDate.getFullYear()), monthRecordSheet = mainSheet.getSheetByName(sheetName);
            return monthRecordSheet || ((monthRecordSheet = mainSheet.insertSheet(sheetName, 1)).getRange(1, 1, 1, 7).setValues([ [ "Amount", "Category", "Date", "Description", "Gmail I.D.", "", "Total for Month" ] ]), 
            monthRecordSheet.getRange(2, 7).setFormula("=SUM(A:A)")), monthRecordSheet;
        }(newPurchase);
        monthRecordSheet.getRange(function(sheet) {
            for (var emptyRowIndex = 1, _i = 0, rangeValueArray_1 = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues(); _i < rangeValueArray_1.length; _i++) {
                if ("" == rangeValueArray_1[_i][0]) return emptyRowIndex;
                emptyRowIndex++;
            }
            throw Error("Could not find an empty row for ".concat(sheet.getName()));
        }(monthRecordSheet), 1, 1, 5).setValues([ [ newPurchase.amount, newPurchase.category ? newPurchase.category : "Uncategorized", newPurchase.isoDate, newPurchase.description, newPurchase.threadId ? newPurchase.threadId : "N/A" ] ]);
    };
    // CONCATENATED MODULE: ./src/server/code.ts
    __webpack_require__.g.doGet = function(e) {
        return HtmlService.createHtmlOutputFromFile("dist/index.html").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).addMetaTag("viewport", "width=device-width, initial-scale=1").setTitle("BudgetApp");
    }, __webpack_require__.g.GetLatestUnreadPurchases = function() {
        return function() {
            var mail, props = propFunctions_GetProps(), result = [], index = 0;
            do {
                for (var _i = 0, mail_1 = mail = GmailApp.search("label:".concat(props.EMAIL_UNREAD_LABEL), index, 50); _i < mail_1.length; _i++) {
                    var thread = mail_1[_i], description = thread.getMessages()[0].getSubject(), amountMatch = description.match(/\$([0-9,.]+)/), amount = null == amountMatch ? 0 : parseFloat(amountMatch[1]), newPurchase = {
                        threadId: thread.getId(),
                        amount,
                        isoDate: thread.getLastMessageDate().toLocaleString(),
                        description
                    };
                    result.unshift(newPurchase), index++;
                }
            } while (0 != mail.length);
            return result;
        }();
    }, __webpack_require__.g.GetCurrentMonthPurchases = function() {
        var currDate = new Date, result = function(monthName, fullYear) {
            var props = propFunctions_GetProps(), monthRecordSheet = SpreadsheetApp.openById(props.MAIN_SHEET_ID).getSheetByName("".concat(monthName, ", ").concat(fullYear)), purchases = [], categoryResults = {};
            if (monthRecordSheet) for (var _i = 0, purchaseRecordValues_1 = monthRecordSheet.getRange(2, 1, monthRecordSheet.getMaxRows(), 5).getValues(); _i < purchaseRecordValues_1.length; _i++) {
                var purchaseEntry = purchaseRecordValues_1[_i];
                if ("" == purchaseEntry[0]) break;
                var amount = parseFloat(purchaseEntry[0]), category = PurchaseCategory[purchaseEntry[1]];
                categoryResults[category] ? categoryResults[category] += amount : categoryResults[category] = amount, 
                purchases.push({
                    amount,
                    category,
                    isoDate: purchaseEntry[2],
                    description: purchaseEntry[3]
                });
            }
            return {
                purchases,
                categories: categoryResults
            };
        }(currDate.toLocaleString("default", {
            month: "long"
        }), currDate.getFullYear());
        return JSON.stringify(result);
    }, __webpack_require__.g.SubmitNewPurchase = function(formObject) {
        var purchase = function(formObject) {
            return {
                threadId: formObject.threadId ? formObject.threadId : undefined,
                amount: parseFloat(formObject.amount),
                category: formObject.category ? PurchaseCategory[formObject.category] : undefined,
                isoDate: formObject.isoDate,
                description: formObject.description,
                purchaseIndex: formObject.purchaseIndex == undefined ? undefined : parseInt(formObject.purchaseIndex)
            };
        }(formObject);
        return AddPurchaseToSheet(purchase), purchase.threadId, purchase;
    }, __webpack_require__.g.MarkPurchaseAsRead = function(purchase) {
        return purchase.threadId, purchase;
    }, __webpack_require__.g.test = function() {
        var props = propFunctions_GetProps();
        Logger.log(props), Logger.log(props.EMAIL_UNREAD_LABEL), Logger.log(GmailApp.getUserLabelByName(props.EMAIL_UNREAD_LABEL));
    };
    for (var i in __webpack_exports__) this[i] = __webpack_exports__[i];
    __webpack_exports__.__esModule && Object.defineProperty(this, "__esModule", {
        value: !0
    })
    /******/;
})();