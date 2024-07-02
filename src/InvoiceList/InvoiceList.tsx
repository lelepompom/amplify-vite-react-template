import React, { useState } from 'react';
import { list, ListPaginateWithPathOutput } from 'aws-amplify/storage';
import { Button, Loader, Accordion } from '@aws-amplify/ui-react';


const InvoiceList: React.FC = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [showAccordion, setShowAccordion] = useState(false);
    const [accordionData, setAccordionData] = useState<{trigger: React.ReactNode;content: React.ReactNode;value: string | undefined;}[]>();

    let accordeinItems: {
        trigger: React.ReactNode;
        content: React.ReactNode;
        value: string | undefined;
    }[] = [];

    function initAccordion(list: ListPaginateWithPathOutput) {
        list.items.forEach(item => {
            if (item.size && item.size > 0) {
                accordeinItems.push({
                    trigger: item.path,
                    value: 'content',
                    content: 'aaaaa'
                });
            }
        });
        setAccordionData(accordeinItems)
    }

    function listInvoices() {
        async () => {
            setShowLoader(true)
            try {
                const ListBucketResult = await list({
                    path: 'invoices/',
                    // Alternatively, path: ({identityId}) => `album/{identityId}/photos/`
                });
                initAccordion(ListBucketResult)
                setShowLoader(false)
                setShowAccordion(true)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            {!showAccordion && !accordionData && <Button variation="link" loadingText="" onClick={() => listInvoices()}>List all invoices</Button>}
            {!showAccordion && accordionData && <Button variation="link" loadingText="" onClick={() => setShowAccordion(true)}>List all invoices</Button>}
            {showLoader && <Loader variation="linear" />}
            {showAccordion && (
                <div>
                    <Accordion items={accordionData}/>
                    <Button variation="link" loadingText="" onClick={() => setShowAccordion(false)}>Hide invoices</Button>
                </div>
            )}
        </div>
    );
};

export default InvoiceList;
