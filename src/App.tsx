import React, { useState } from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import InvoiceList from './InvoiceList/InvoiceList';
import InvoiceProcessing from './InvoiceProcessing/InvoiceProcessing';

const App: React.FC = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  return (
    <div className="App">
      <Heading level={1}>Invoices</Heading>
      <InvoiceList />
      <Heading level={3}>1. Upload your invoice</Heading>
      <StorageManager
        acceptedFileTypes={['.pdf']}
        path="invoices/"
        autoUpload={false}
        maxFileCount={1}
        isResumable
        onUploadSuccess={() => setIsFileUploaded(true)}
      />
      <Heading level={3}>2. Run text extraction</Heading>
      <InvoiceProcessing isFileUploaded={isFileUploaded} />
      <Heading level={3}>3. Review invoice data</Heading>
    </div>
  );
};

export default App;
