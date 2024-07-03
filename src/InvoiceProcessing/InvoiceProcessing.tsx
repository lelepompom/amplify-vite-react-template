import React, { useState } from 'react';
import { Button } from '@aws-amplify/ui-react';


const InvoiceProcessing: React.FC<{ isFileUploaded: boolean }> = ({ isFileUploaded }) => {

    const [isTextReady, setIsTextReady] = useState(true);

    function processInvoice() {
        setIsTextReady(!isTextReady)
    }

    return (
        <Button
            isDisabled={!isFileUploaded}
            isFullWidth={true}
            isLoading={isFileUploaded && !isTextReady}
            variation="primary"
            size="small"
            loadingText="processing invoice"
            onClick={() => processInvoice()}
        >
            Start processing invoice
        </Button>

    );
};

export default InvoiceProcessing