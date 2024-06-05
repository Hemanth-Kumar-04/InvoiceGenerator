import React, { useState } from 'react';
import './App.css';
import InvoiceForm from './InvoiceForm';
import Invoice from './Invoice';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleInvoiceSubmit = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice Generator</h1>
      </header>
      <div className="container">
        <div className="form-container">
          <InvoiceForm onSubmit={handleInvoiceSubmit} />
        </div>
        <div className="invoice-container">
          {invoiceData && <Invoice data={invoiceData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
