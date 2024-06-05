import React from 'react';
// import './Invoice.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Invoice = ({ data }) => {
  const calculateNetAmount = (unitPrice, quantity, discount) => unitPrice * quantity - discount;
  const calculateTaxAmount = (netAmount, taxRate) => (netAmount * taxRate) / 100;
  const calculateTotalAmount = (netAmount, taxAmount) => netAmount + taxAmount;

  const getTaxType = (placeOfSupply, placeOfDelivery) =>
    placeOfSupply === placeOfDelivery ? 'CGST/SGST' : 'IGST';

  const renderItems = () => {
    return data.items.map((item, index) => {
      const netAmount = calculateNetAmount(item.unitPrice, item.quantity, item.discount);
      const taxAmount = calculateTaxAmount(netAmount, item.taxRate);
      const totalAmount = calculateTotalAmount(netAmount, taxAmount);

      return (
        <tr key={index}>
          <td>{item.description}</td>
          <td>{item.unitPrice}</td>
          <td>{item.quantity}</td>
          <td>{item.discount}</td>
          <td>{netAmount.toFixed(2)}</td>
          <td>{item.taxRate}%</td>
          <td>{taxAmount.toFixed(2)}</td>
          <td>{totalAmount.toFixed(2)}</td>
        </tr>
      );
    });
  };

  const renderTotals = () => {
    const netTotal = data.items.reduce((acc, item) => acc + calculateNetAmount(item.unitPrice, item.quantity, item.discount), 0);
    const taxTotal = data.items.reduce((acc, item) => acc + calculateTaxAmount(calculateNetAmount(item.unitPrice, item.quantity, item.discount), item.taxRate), 0);
    const total = netTotal + taxTotal;

    return (
      <tr>
        <td colSpan="4">Total</td>
        <td>{netTotal.toFixed(2)}</td>
        <td></td>
        <td>{taxTotal.toFixed(2)}</td>
        <td>{total.toFixed(2)}</td>
      </tr>
    );
  };

  const downloadPDF = () => {
    const downloadButton = document.getElementById('download-btn');
    downloadButton.style.display = 'none'; // Hide the download button
    
    const input = document.getElementById('invoice');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 290;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 10, 10 + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, 10 + position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('invoice.pdf');
      
      downloadButton.style.display = 'block'; // Show the download button after PDF generation
    });
  };
  
  return (
    <div className="invoice" id="invoice">
      <h2>Invoice</h2>
      <div className="seller-details">
        <h3>Seller Details</h3>
        <p>{data.sellerName}</p>
        <p>{data.sellerAddress}</p>
        <p>{data.sellerCity}, {data.sellerState}, {data.sellerPincode}</p>
        <p>PAN: {data.sellerPAN}</p>
        <p>GST: {data.sellerGST}</p>
      </div>
      {/* Add more sections for billing, shipping, order, and invoice details */}
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Discount</th>
            <th>Net Amount</th>
            <th>Tax Rate</th>
            <th>Tax Amount</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {renderItems()}
          {renderTotals()}
        </tbody>
      </table>
      <div className="signature">
        <p>For {data.sellerName}:</p>
        <img src={data.signatureImage} alt="Signature" />
        <p>Authorised Signatory</p>
      </div>
      <button id="download-btn" onClick={downloadPDF}>Download PDF</button>

    </div>
  );
};

export default Invoice;
