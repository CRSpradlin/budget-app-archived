// import { uploadFile, cleanFiles } from "./utils/fileProcessor";

// @ts-ignore
global.doGet = (e) => {
    return HtmlService.createHtmlOutputFromFile('dist/index.html').setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).addMetaTag('viewport', 'width=device-width, initial-scale=1').setTitle("BudgetApp");
};

// @ts-ignore
global.test = () => {
};

// // @ts-ignore
// global.setScriptProp = () => {
//     // const key = 'MAIN_SHORT_SHEET_ID';
//     // const value = '<sheet id>';

//     // const key = 'MAIN_SHORT_SHEET_RACE_NAMES';
//     // const value = '<sheet id>';

//     // const key = 'MAIN_LONG_SHEET_ID';
//     // const value = '<sheet id>';

//     // const key = 'MAIN_LONG_SHEET_RACE_NAMES';
//     // const value = '<sheet id>';

//     const key = 'TEMP_FOLDER_ID';
//     const value = '<temp folder id>';

//     const scriptProps = PropertiesService.getScriptProperties();
//     scriptProps.setProperty(key, value);
//     return true;
// }