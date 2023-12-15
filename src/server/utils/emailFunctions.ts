import { GetProps } from "./propFunctions"

type Purchase = {
    emailId: string,
    amount: number,
    isoDate: string,
    description: string
}

const GetLatestUnreadPurchases = (): Purchase[] => {
    const props = GetProps();

    const result: Purchase[] = [];
    
    let mail: GoogleAppsScript.Gmail.GmailThread[];
    let index = 0;
    do {
        mail = GmailApp.search(`label:${props['EMAIL_UREAD_LABEL']} -{label:${props['EMAIL_READ_LABEL']}}`, index, 50);
        
        for (const convo of mail) {
            const description = convo.getMessages()[0].getSubject();
            const amountMatch = description.match(/\$([0-9,.]+)/);
            const amount =  amountMatch == null ? 0.0 : parseFloat(amountMatch[1]);

            const newPurchase = {
                emailId: convo.getId(),
                amount,
                isoDate: convo.getLastMessageDate().toISOString(),
                description
            }
            
            result.push(newPurchase);
            index++;
        }

    } while (mail.length != 0)
    
    return result;
}

export { GetLatestUnreadPurchases };