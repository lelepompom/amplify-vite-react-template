import React, { useState } from 'react';
import { list, ListPaginateWithPathOutput, getUrl } from 'aws-amplify/storage';
import { Button, Loader, Accordion } from '@aws-amplify/ui-react';


const InvoiceList: React.FC = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [showAccordion, setShowAccordion] = useState(false);
    const [accordionData, setAccordionData] = useState<{ trigger: React.ReactNode; content: React.ReactNode; value: string | undefined; }[]>()

    let accordionItems: {
        trigger: React.ReactNode;
        content: React.ReactNode;
        value: string | undefined;
    }[] = [];

    function initAccordion(list: ListPaginateWithPathOutput) {
        list.items.forEach(async item => {
            if (item.size && item.size > 0) {
                const linkToStorageFile = await getUrl({
                    path: item.path,
                    // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
                    // options: {
                    //   validateObjectExistence?: false,  // defaults to false
                    //   expiresIn?: 20, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
                    //   useAccelerateEndpoint: true // Whether to use accelerate endpoint.
                    // }
                });
                accordionItems.push({
                    trigger: item.path,
                    value: item.path,
                    content: <a href={linkToStorageFile.url.toString()} target="_blank" rel="noreferrer">{item.path}</a>
                });
            }
        });
        setAccordionData(accordionItems)
    }

    async function listInvoices() {
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

    return (
        <div>
            {!showAccordion && !accordionData && <Button variation="link" loadingText="" onClick={() => listInvoices()}>List all invoices</Button>}
            {!showAccordion && accordionData && <Button variation="link" loadingText="" onClick={() => setShowAccordion(true)}>List all invoices</Button>}
            {showLoader && <Loader variation="linear" />}
            {showAccordion && (
                <div>
                    <Accordion items={accordionData} />
                    <Button variation="link" loadingText="" onClick={() => setShowAccordion(false)}>Hide invoices</Button>
                </div>
            )}
        </div>
    );
};

export default InvoiceList;
