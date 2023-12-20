import { GetLatestUnreadPurchases } from "./utils/emailFunctions";
import { AddPurchaseToSheet, GetMonthPurchases } from "./utils/sheetFunctions";
import { Purchase, PurchaseCategory, FormObjToPurchase } from "../shared/types";

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

    return purchase;
}

// @ts-ignore
global.MarkPurchaseAsRead = (purchase: Purchase) => {
    Logger.log(JSON.stringify(purchase));

    return purchase;
}

// @ts-ignore
global.test = () => {
    // const newPurchase = {
    //     amount: 20.20,
    //     description: 'Testing',
    //     category: PurchaseCategory.Rent,
    //     isoDate: new Date().toLocaleString()
    // }
    // Logger.log(AddPurchaseToSheet(newPurchase));

    Logger.log(GetLatestUnreadPurchases());
};

// // @ts-ignore
// global.setScriptProp = () => {
//     const key = 'MAIN_SHEET_ID';
//     const value = '<sheet id>';

//     const key = 'EMAIL_UREAD_LABEL';
//     const value = '<uread label>';

//     const key = 'EMAIL_READ_LABEL';
//     const value = '<read label>';

//     const scriptProps = PropertiesService.getScriptProperties();
//     scriptProps.setProperty(key, value);
//     return true;
// }