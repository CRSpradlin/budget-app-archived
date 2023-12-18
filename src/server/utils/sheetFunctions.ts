import { GetProps } from "./propFunctions";
import { Purchase } from "../../shared/types";

const getNextEmptyRow = (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {
    const rangeValueArray = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues();
    let emptyRowIndex = 1;
    for (const row of rangeValueArray) {
        if (row[0] == "")
            return emptyRowIndex;
        emptyRowIndex++;
    }
    throw Error(`Could not find an empty row for ${sheet.getName()}`);
}

const getSheetForPurchase = (purchase: Purchase) => {
    const props = GetProps();
    const mainSheet = SpreadsheetApp.openById(props['MAIN_SHEET_ID']);
    
    const purchaseDate = new Date(purchase.isoDate);
    const sheetName = `${purchaseDate.toLocaleString('default', { month: 'long' })}, ${purchaseDate.getFullYear()}`;

    let monthRecordSheet = mainSheet.getSheetByName(sheetName);
    if (!monthRecordSheet) {
        monthRecordSheet = mainSheet.insertSheet(sheetName, 1);
        monthRecordSheet.getRange(1, 1, 1, 7).setValues([['Amount', 'Category', 'Date', 'Description', 'Gmail I.D.', '', 'Total for Month']]);
        monthRecordSheet.getRange(2, 7).setFormula('=SUM(A:A)');
    } 

    return monthRecordSheet;
}

const AddPurchaseToSheet = (newPurchase: Purchase) => {
    const monthRecordSheet = getSheetForPurchase(newPurchase);
    monthRecordSheet.getRange(getNextEmptyRow(monthRecordSheet), 1, 1, 5).setValues(
        [
            [
                newPurchase.amount,
                newPurchase.category ? newPurchase.category : 'Uncategorized', 
                newPurchase.isoDate, 
                newPurchase.description, 
                newPurchase.threadId ? newPurchase.threadId : 'N/A'
            ]
        ]
    );
}

export { AddPurchaseToSheet }