import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Invoice.css'
const Invoice = ({ data }) => {
  const calculateNetAmount = (unitPrice, quantity, discount) => unitPrice * quantity - discount;
  const calculateTaxAmount = (netAmount, taxRate) => (netAmount * taxRate) / 100;
  const calculateTotalAmount = (netAmount, taxAmount) => netAmount + taxAmount;

  const renderItems = () => {
    return data.items.map((item, index) => {
      const netAmount = calculateNetAmount(item.unitPrice, item.quantity, item.discount);
      const taxAmount = calculateTaxAmount(netAmount, item.taxRate);
      const totalAmount = calculateTotalAmount(netAmount, taxAmount);

      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.description}</td>
          <td>{item.unitPrice}</td>
          <td>{item.quantity}</td>
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
      <h2 className="invoice-title">Invoice</h2>
      <div className="seller-details">
        <h3 className="section-title">Sold By</h3>
        <p>Name of the Company: {data.sellerName}</p>
        <p>Address: {data.sellerAddress}</p>
        <p>City: {data.sellerCity}</p>
        <p>State: {data.sellerState}</p>
        <p>PAN No: {data.sellerPAN}</p>
        <p>GST Registration No: {data.sellerGST}</p>
      </div>
      <div className="billing-address">
        <h3 className="section-title">Billing Address</h3>
        <p>Name: {data.billingName}</p>
        <p>Address: {data.billingAddress}</p>
        <p>City: {data.billingCity}</p>
        <p>State: {data.billingState}</p>
        <p>UT Code: {data.billingStateCode}</p>
      </div>
      <div className="pan-gst-ut">
        <p>PAN No: {data.sellerPAN}</p>
        <p>GST Registration No: {data.sellerGST}</p>
        <p>UT Code: {data.billingStateCode}</p>
      </div>
      <div className="shipping-address">
        <h3 className="section-title">Shipping Address</h3>
        <p>Name: {data.shippingName}</p>
        <p>Address: {data.shippingAddress}</p>
        <p>City: {data.shippingCity}</p>
        <p>State: {data.shippingState}</p>
        <p>UT Code: {data.shippingStateCode}</p>
      </div>
      <div className="order-details">
        <h3 className="section-title">Order Details</h3>
        <p>Place of Supply: {data.placeOfSupply}</p>
        <p>Place of Delivery: {data.placeOfDelivery}</p>
        <p>Order Number: {data.orderNo}</p>
        <p>Order Date: {data.orderDate}</p>
        <p>Invoice Number: {data.invoiceNo}</p>
        <p>Invoice Details: {data.invoiceDetails}</p>
        <p>Invoice Date: {data.invoiceDate}</p>
      </div>
      <table className="item-table">
        <thead>
          <tr>
            <th>SI No.</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Qty</th>
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
      <div className="amount-in-words">
        <h3>Amount in Words</h3>
        {/* Add logic to convert amount to words */}
      </div>
      <div className="signature">
        <p>Authorised Signature</p>
        <img src={data.signatureImage} alt="Signature" />
      </div>
      <button id="download-btn" onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default Invoice;
