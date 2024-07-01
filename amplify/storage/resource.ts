import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'amplifyInvoicesReadSoft',
    access: (allow) => ({
        'invoices/*': [
            allow.authenticated.to(['read', 'write']),
            allow.guest.to(['read', 'write'])
        ],
    })
});