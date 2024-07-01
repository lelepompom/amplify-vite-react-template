import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'amplifyInvoicesReadSoft',
    access: (allow) => ({
        'invoices/{entity_id}/*': [
            allow.guest.to(['read']),
            allow.entity('identity').to(['read', 'write', 'delete'])
        ],
        'invoices/*': [
            allow.authenticated.to(['read', 'write']),
            allow.guest.to(['read', 'write'])
        ],
    })
});