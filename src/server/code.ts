import { GetLatestUnreadPurchases } from "./utils/emailFunctions";

// @ts-ignore
global.doGet = (e) => {
    return HtmlService.createHtmlOutputFromFile('dist/index.html').setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).addMetaTag('viewport', 'width=device-width, initial-scale=1').setTitle("BudgetApp");
};
// @ts-ignore
global.GetLatestUnreadPurchases = () => {
    return GetLatestUnreadPurchases();
}

// @ts-ignore
global.test = () => {
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