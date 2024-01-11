# GCPBudgetApp

## TL;DR
Gives users and developers the ability to host their own budget web application through Google Cloud's App Script Service. Typically App Script Applications are little one-off scripts that give users the ability to connect mulitple Google Services together or give the ability for developers to add additionally functionality to their SpreadSheets or Documents. In the case of the GCPBudgetApp, AppScript is leveraged to host a small web application which graphically displays any recent purchases performed by the user. Recent purchases are gathered via Gmail labels, one label denotes a new email with a new purchase, the other label denotes a purchase has already been read.

## Setup
Run `clasp login` (If you haven't logged in recently).

Ran `clasp create <project name>`.

Select `webapp` for the project type when prompted.

Lastly you need to configure your Gmail labels, one to mark the emails as new unread transactions and the other for the web-app to leverage marking transactions as read.
