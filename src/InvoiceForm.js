import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h2>Invoice Form</h2>
      <div>
        <label>Seller Name:</label>
        <input type="text" name="sellerName" value={formData.sellerName} onChange={handleChange} required />
      </div>
      <div>
        <label>Seller Address:</label>
        <input type="text" name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} required />
      </div>
      {/* Add more fields for seller, billing, and shipping details as required */}
      {formData.items.map((item, index) => (
        <div key={index}>
          <h3>Item {index + 1}</h3>
          <label>Description:</label>
          <input type="text" name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
          <label>Unit Price:</label>
          <input type="number" name="unitPrice" value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} />
          <label>Quantity:</label>
          <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
          <label>Discount:</label>
          <input type="number" name="discount" value={item.discount} onChange={(e) => handleItemChange(index, e)} />
          <label>Tax Rate:</label>
          <input type="number" name="taxRate" value={item.taxRate} onChange={(e) => handleItemChange(index, e)} />
          <button type="button" onClick={() => removeItem(index)}>Remove Item</button>
        </div>
      ))}
      <button type="button" onClick={addItem}>Add Item</button>
      <button type="submit">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
