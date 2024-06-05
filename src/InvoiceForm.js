import React, { useState } from 'react';
import './InvoiceForm.css'; // Import the CSS file

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerAddress: '',
    sellerCity: '',
    sellerState: '',
    sellerPAN: '',
    sellerGST: '',
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingStateCode: '',
    shippingName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingStateCode: '',
    placeOfSupply: '',
    placeOfDelivery: '',
    orderNo: '',
    orderDate: '',
    invoiceNo: '',
    invoiceDetails: '',
    invoiceDate: '',
    items: [
      {
        description: '',
        unitPrice: 0,
        quantity: 0,
        discount: 0,
        taxRate: 18
      }
    ],
    signatureImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;
    setFormData({ ...formData, items });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { description: '', unitPrice: 0, quantity: 0, discount: 0, taxRate: 18 }
      ]
    });
  };

  const removeItem = (index) => {
    const items = [...formData.items];
    items.splice(index, 1);
    setFormData({ ...formData, items });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Invoice Form</h2>
      <div className="form-section">
        <h3>Sold By</h3>
        <label className="form-label">Name of the Company:</label>
        <input type="text" className="form-input" name="sellerName" value={formData.sellerName} onChange={handleChange} required />
        <label className="form-label">Address:</label>
        <input type="text" className="form-input" name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} required />
        <label className="form-label">City:</label>
        <input type="text" className="form-input" name="sellerCity" value={formData.sellerCity} onChange={handleChange} required />
        <label className="form-label">State:</label>
        <input type="text" className="form-input" name="sellerState" value={formData.sellerState} onChange={handleChange} required />
        <label className="form-label">PAN No:</label>
        <input type="text" className="form-input" name="sellerPAN" value={formData.sellerPAN} onChange={handleChange} required />
        <label className="form-label">GST Registration No:</label>
        <input type="text" className="form-input" name="sellerGST" value={formData.sellerGST} onChange={handleChange} required />
      </div>
      <div className="form-section">
        <h3>Billing Address</h3>
        <label className="form-label">Name:</label>
        <input type="text" className="form-input" name="billingName" value={formData.billingName} onChange={handleChange} required />
        <label className="form-label">Address:</label>
        <input type="text" className="form-input" name="billingAddress" value={formData.billingAddress} onChange={handleChange} required />
        <label className="form-label">City:</label>
        <input type="text" className="form-input" name="billingCity" value={formData.billingCity} onChange={handleChange} required />
        <label className="form-label">State:</label>
        <input type="text" className="form-input" name="billingState" value={formData.billingState} onChange={handleChange} required />
        <label className="form-label">UT Code:</label>
        <input type="text" className="form-input" name="billingStateCode" value={formData.billingStateCode} onChange={handleChange} required />
      </div>
      <div className="form-section">
        <h3>Shipping Address</h3>
        <label className="form-label">Name:</label>
        <input type="text" className="form-input" name="shippingName" value={formData.shippingName} onChange={handleChange} required />
        <label className="form-label">Address:</label>
        <input type="text" className="form-input" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} required />
        <label className="form-label">City:</label>
        <input type="text" className="form-input" name="shippingCity" value={formData.shippingCity} onChange={handleChange} required />
        <label className="form-label">State:</label>
        <input type="text" className="form-input" name="shippingState" value={formData.shippingState} onChange={handleChange} required />
        <label className="form-label">UT Code:</label>
        <input type="text" className="form-input" name="shippingStateCode" value={formData.shippingStateCode} onChange={handleChange} required />
      </div>
      <div className="form-section">
        <h3>Order and Invoice Details</h3>
        <label className="form-label">Place of Supply:</label>
        <input type="text" className="form-input" name="placeOfSupply" value={formData.placeOfSupply} onChange={handleChange} required />
        <label className="form-label">Place of Delivery:</label>
        <input type="text" className="form-input" name="placeOfDelivery" value={formData.placeOfDelivery} onChange={handleChange} required />
        <label className="form-label">Order Number:</label>
        <input type="text" className="form-input" name="orderNo" value={formData.orderNo} onChange={handleChange} required />
        <label className="form-label">Order Date:</label>
        <input type="date" className="form-input" name="orderDate" value={formData.orderDate} onChange={handleChange} required />
        <label className="form-label">Invoice Number:</label>
        <input type="text" className="form-input" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} required />
        <label className="form-label">Invoice Details:</label>
        <input type="text" className="form-input" name="invoiceDetails" value={formData.invoiceDetails} onChange={handleChange} required />
        <label className="form-label">Invoice Date:</label>
        <input type="date" className="form-input" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} required />
        </div>
      <div className="form-section">
        <h3>Item Details</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="item-section">
            <h4>Item {index + 1}</h4>
            <label className="form-label">Description:</label>
            <input type="text" className="form-input" name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
            <label className="form-label">Unit Price:</label>
            <input type="number" className="form-input" name="unitPrice" value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} />
            <label className="form-label">Quantity:</label>
            <input type="number" className="form-input" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
            <label className="form-label">Discount:</label>
            <input type="number" className="form-input" name="discount" value={item.discount} onChange={(e) => handleItemChange(index, e)} />
            <label className="form-label">Tax Rate:</label>
            <input type="number" className="form-input" name="taxRate" value={item.taxRate} onChange={(e) => handleItemChange(index, e)} />
            <button type="button" className="remove-button" onClick={() => removeItem(index)}>Remove Item</button>
          </div>
        ))}
        <button type="button" className="add-item-button" onClick={addItem}>Add Item</button>
      </div>
      <div className="form-section">
        <h3>Signature Image</h3>
        <input type="file" accept="image/*" className="form-input" name="signatureImage" onChange={handleChange} />
      </div>
      <button type="submit" className="submit-button">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
