import { GetLatestUnreadPurchases, MarkThreadAsRead } from "./utils/emailFunctions";
import { AddPurchaseToSheet, GetMonthPurchases } from "./utils/sheetFunctions";
import { Purchase, PurchaseCategory, FormObjToPurchase } from "../shared/types";
import { GetProps } from "./utils/propFunctions";

// @ts-ignore
global.doGet = (e) => {
    return HtmlService.createHtmlOutputFromFile('dist/index.html').setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).addMetaTag('viewport', 'width=device-width, initial-scale=1').setTitle("BudgetApp");
};

// @ts-ignore
global.GetLatestUnreadPurchases = () => {
    return GetLatestUnreadPurchases();
}

// @ts-ignore
global.GetCurrentMonthPurchases = () => {
    const currDate = new Date();

    const monthName = currDate.toLocaleString('default', { month: 'long' });
    const fullYear = currDate.getFullYear();

    const result = GetMonthPurchases(monthName, fullYear);

    return JSON.stringify(result);
}

// @ts-ignore
global.SubmitNewPurchase = (formObject) => {

    const purchase = FormObjToPurchase(formObject)
    AddPurchaseToSheet(purchase);

    if (purchase.threadId) {
        MarkThreadAsRead(purchase.threadId);
    }

    return purchase;
}

// @ts-ignore
global.MarkPurchaseAsRead = (purchase: Purchase) => {
    if (purchase.threadId) {
        MarkThreadAsRead(purchase.threadId);
    }

    return purchase;
}

// @ts-ignore
global.test = () => {
    Logger.log("Test Function");
};

// @ts-ignore
global.setScriptProp = () => {

    const labelsToEdit = [
        {
            key: 'MAIN_SHEET_ID',
            value: '<sheet id>'
        },
        {
            key: 'EMAIL_UNREAD_LABEL',
            value: '<unread label>'
        },
        {
            key: 'EMAIL_READ_LABEL',
            value: '<read label>'
        }
    ];

    const scriptProps = PropertiesService.getScriptProperties();
    for (const item of labelsToEdit) {
        scriptProps.setProperty(item.key, item.value);
    }

    return true;
}