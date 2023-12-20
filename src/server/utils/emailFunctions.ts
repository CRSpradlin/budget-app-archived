import { GetProps } from "./propFunctions"
import { Purchase } from "../../shared/types";

const GetLatestUnreadPurchases = (): Purchase[] => {
    const props = GetProps();

    const result: Purchase[] = [];
    
    let mail: GoogleAppsScript.Gmail.GmailThread[];
    let index = 0;
    do {
        mail = GmailApp.search(`label:${props['EMAIL_UREAD_LABEL']}`, index, 50);
        
        for (const thread of mail) {
            const description = thread.getMessages()[0].getSubject();
            const amountMatch = description.match(/\$([0-9,.]+)/);
            const amount =  amountMatch == null ? 0.0 : parseFloat(amountMatch[1]);

            const newPurchase = {
                threadId: thread.getId(),
                amount,
                isoDate: thread.getLastMessageDate().toLocaleString(),
                description
            }
            
            result.unshift(newPurchase);
            index++;
        }

    } while (mail.length != 0)
    
    return result;
}

const AddReadLabelToThread = (threadId) => {
    const props = GetProps();
    GmailApp.getThreadById(threadId).addLabel(GmailApp.getUserLabelByName(props['EMAIL_READ_LABEL']));
    GmailApp.getThreadById(threadId).removeLabel(GmailApp.getUserLabelByName(props['EMAIL_UNREAD_LABEL']));
}

export { GetLatestUnreadPurchases, AddReadLabelToThread };