import React from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const App: React.FC = () => {

  return (
    <div className="App">
      <h1>Invoices</h1>
      <StorageManager
        acceptedFileTypes={['.pdf']}
        path="invoices/"
        autoUpload={false}
        maxFileCount={1}
        isResumable
      />
    </div>
  );
};

export default App;
