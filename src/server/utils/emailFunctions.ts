import { GetProps } from "./propFunctions"
import { Purchase } from "../../shared/types";

const GetLatestUnreadPurchases = (): Purchase[] => {
    const props = GetProps();

    const result: Purchase[] = [];
    
    let mail: GoogleAppsScript.Gmail.GmailThread[];
    let index = 0;
    do {
        mail = GmailApp.search(`label:${props['EMAIL_UNREAD_LABEL']}`, index, 50);
        
        for (const thread of mail) {
            const message = thread.getMessages()[0];
            const subject = message.getSubject();
            const body = message.getBody();

            let amountMatch = subject.match(/\$([0-9,.]+)/);
            if (amountMatch == null) {
                amountMatch = body.match(/\$([0-9,.]+)/);
            }
            const amount =  amountMatch == null ? 0.0 : parseFloat(amountMatch[1]);

            let description = subject;

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

const MarkThreadAsRead = (threadId) => {
    const props = GetProps();
    GmailApp.getThreadById(threadId).addLabel(GmailApp.getUserLabelByName(props['EMAIL_READ_LABEL']));
    GmailApp.getThreadById(threadId).removeLabel(GmailApp.getUserLabelByName(props['EMAIL_UNREAD_LABEL']));
}

export { GetLatestUnreadPurchases, MarkThreadAsRead };