# GCPBudgetApp

### **Docs and Setup Instructions are W.I.P**
## TL;DR
Gives users and developers the ability to host their own budget web application through Google Cloud's App Script Service. Typically App Script Applications are little one-off scripts that give users the ability to connect mulitple Google Services together or give the ability for developers to add additionally functionality to their SpreadSheets or Documents. In the case of the GCPBudgetApp, AppScript is leveraged to host a small web application which graphically displays any recent purchases performed by the user. Recent purchases are gathered via Gmail labels, one label denotes a new email with a new purchase, the other label denotes a purchase has already been read.

## Setup

### Create Google Cloud Project
Clone down the repository and run an `bun install`
![bun_install_repo.png](./docs/media/bun_install_repo.png)

Run `bun run clasp login`
![type_clasp_login.png](./docs/media/type_clasp_login.png)
The `clasp login` command will open a browser window to have you sign-in to your Google/Gmail account. Ensure you use the account you want to have the budget app recieve and manage your bank transaction emails. Click `Allow`.
![run_clasp_login_allow_page.png](./docs/media/run_clasp_login_allow_page.png)

Allow Google App Script API. If you have not done so, navigate to [https://script.google.com/home/usersettings](https://script.google.com/home/usersettings) and ensure the App Script API is enabled as shown below.

![usersettings_appscript_api.png](./docs/media/usersettings_appscript_api.png)

Enable the App Script API
![usersettings_appscript_api_on.png](./docs/media/usersettings_appscript_api_on.png)

Next, run `bun run clasp create <project name>` in the cloned down repository.
![type_clasp_create.png](./docs/media/type_clasp_create.png)
Select `webapp` for the project type when prompted.
![run_clasp_create.png](./docs/media/run_clasp_create.png)
![done_bun_clasp_create.png](./docs/media/done_bun_clasp_create.png)

Next, you need to configure your bank email notifications and add two new Gmail labels, one to mark the emails as new unread transactions and the other for the web-app to leverage marking transactions as read.

### Enable Bank/Card Transaction Notifications
Most banks and credit card providers have the ability to send you notifications on any transactions made over a certain amount. By setting the transaction amount to a small amount like `$0.01` or similar, email notifications can be sent for almost all transactions. These emails will then be picked up by the bugeting app along with their transaction amounts so you can keep track of your purchases. 

### Add New Labels to Gmail
Create a new label for all the unread transactions you will recieve from your bank. If you already 

1. Navigate to your Gmail account and click the `create new label` plus button.
![create_new_label.png](./docs/media/create_new_label.png)

2. Fill in the new name for your unread transactions label. In this case, the label name is `BudgetAppUnread` but it can realisitically be anything. Just remember which label you want to act as the unread transactions and which label will act as the read transactions.
![name_new_lable.png](./docs/media/name_new_label.png)

3. Create the second label for your read transactions. In this case, the label name is `BudgetAppRead` but it can also be anything you want.
![create_second_label.png](./docs/media/create_second_label.png)

### Apply Filter Parameters for Unread Label
Once you've created your two labels or already have labels that you can re-purpose in your Gmail account, the next step would be to apply a filter to automatically place inbox items to your unread label.

1. Click on the `show search options` button to the right of the search box.
![click_show_search_options.png](./docs/media/click_show_search_options.png)

2. Fill in the search options to target emails from your bank. 
![fill_search_options.png](./docs/media/fill_search_options.png)
Replace `<enter filter parameters here>` with a filter which targets the subject and bank email address. As an example, lets say the bank send their notification email from the email address: `example@bank.com`, and lets say the subject of those notification emails contain the words `You made a credit card purchase of` followed by the transaction amount. With this information, we can create a filter that looks for that particular subject from the bank's email address: `(from:(example@bank.com) AND {subject:"You made a credit card purchase of "})`. Place this newly created filter parameter under the `Has the words` field. Once you have set your filter parameters, click the `Create Filter` button.

3. On the next page for creating a filter, select the `Apply the label` option and select the **UNREAD** label. By selecting this option, any new messages to your email with the subject you specified and from the specified bank email address will now have the unread label assigned to it.
![select_filter_options.png](./docs/media/select_filter_options.png)
You may also want to select the `Skip the Inbox (Archive it)` option if you do not want your inbox to be riddled with transaction emails. I personally don't have this option selected since I like recieving notifications about any new transactions but if that gets or sounds anoying this option can be selected. Selecting the `Skip the Inbox` option does not affect the functionality of the budget application.
Once finished you can click the `Create Filter` button.

### Create Budget Spreadsheet
A spreadsheet is needed by the budget app in order to store and retrieve. Navigate to your Google Drive and create a new Spreadsheet. ![click_create_google_spreadsheet.png](./docs/media/click_create_google_spreadsheet.png) After creating a new Google SpreadSheet and giving it a name of your choice, select and copy the entire sheet URL as shown below. ![select_spreadsheet_url.png](./docs/media/select_spreadsheet_url.png) The URL should look something like `https://docs.google.com/spreadsheets/d/XXXX/edit#gid=0` where the `XXXX` in the example is a long string of numbers and characters. This value is the SpreadSheet ID. Save this value somewhere since we will be needing it for the following step.

### Configure Properties in Budget App (Labels and Sheet ID)
Now that the labels have been created, we can now configure them in the budget app so that they can be used to identify and mark incomming transactions.

1. Navigate back to the repository that you have cloned down and ran the previous `clasp` commands to create a new Google Cloud Project.

2. Run `bun run clasp open`.

