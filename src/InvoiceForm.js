import React, { useState } from 'react';
import './InvoiceForm.css'; // Import CSS file

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerAddress: '',
    sellerCity: '',
    sellerState: '',
    sellerPincode: '',
    sellerPAN: '',
    sellerGST: '',
    placeOfSupply: '',
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
    billingStateCode: '',
    shippingName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    shippingStateCode: '',
    placeOfDelivery: '',
    orderNo: '',
    orderDate: '',
    invoiceNo: '',
    invoiceDetails: '',
    invoiceDate: '',
    reverseCharge: 'No',
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
    <form className="invoice-form" onSubmit={handleSubmit}>
      <h2 className="form-heading">Invoice Form</h2>
      <div className="form-field">
        <label htmlFor="sellerName">Seller Name:</label>
        <input type="text" id="sellerName" name="sellerName" value={formData.sellerName} onChange={handleChange} required />
      </div>
      <div className="form-field">
        <label htmlFor="sellerAddress">Seller Address:</label>
        <input type="text" id="sellerAddress" name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} required />
      </div>
      {/* Add more fields for seller, billing, and shipping details as required */}
      {formData.items.map((item, index) => (
        <div key={index}>
          <h3>Item {index + 1}</h3>
          <div className="form-field">
            <label htmlFor={`description-${index}`}>Description:</label>
            <input type="text" id={`description-${index}`} name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
          </div>
          <div className="form-field">
            <label htmlFor={`unitPrice-${index}`}>Unit Price:</label>
            <input type="number" id={`unitPrice-${index}`} name="unitPrice" value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} />
          </div>
          <div className="form-field">
            <label htmlFor={`quantity-${index}`}>Quantity:</label>
            <input type="number" id={`quantity-${index}`} name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
          </div>
          <div className="form-field">
            <label htmlFor={`discount-${index}`}>Discount:</label>
            <input type="number" id={`discount-${index}`} name="discount" value={item.discount} onChange={(e) => handleItemChange(index, e)} />
          </div>
          <div className="form-field">
            <label htmlFor={`taxRate-${index}`}>Tax Rate:</label>
            <input type="number" id={`taxRate-${index}`} name="taxRate" value={item.taxRate} onChange={(e) => handleItemChange(index, e)} />
          </div>
          <button type="button" onClick={() => removeItem(index)}>Remove Item</button>
        </div>
      ))}
      <button type="button" className="add-item-btn" onClick={addItem}>Add Item</button>
      <button type="submit" className="submit-btn">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
