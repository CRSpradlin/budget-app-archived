type Purchase = {
    threadId?: string,
    amount: number,
    category?: PurchaseCategory,
    isoDate: string,
    description: string,
    purchaseIndex?: number
}

type PendingTransactionsTabState = {
    modalVisability: boolean,
    unreadPurchases: Purchase[],
    formAmount: number,
    formCategory: PurchaseCategory,
    formDescription: string,
    formThreadId: string,
    formISODate: string,
    formPurchaseIndex: number
}

enum PurchaseCategory {
    Rent = 'Rent',
    Utilities = 'Utilities',
    Grocery = 'Groceries',
    Dining = 'Dining',
    Dog = 'Dog',
    Car = 'Car',
    Shopping = 'Shopping',
    Uncategorized = 'Uncategorized'
}

export { Purchase, PurchaseCategory, PendingTransactionsTabState }