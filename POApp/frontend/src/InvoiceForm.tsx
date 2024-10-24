import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InvoiceForm.css'; // Import the CSS file

interface Invoice {
  id: number;
  customer: string;
  amount: number;
  date: string;
}

const InvoiceForm: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');

  const fetchInvoices = async () => {
    const response = await axios.get<Invoice[]>('http://localhost:5000/invoices');
    setInvoices(response.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/invoices', { customer, amount, date });
    setCustomer('');
    setAmount(0);
    setDate('');
    fetchInvoices();
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="container">
      <h2>Create PO</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Customer" 
          value={customer} 
          onChange={(e) => setCustomer(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(Number(e.target.value))} 
          required 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
        <button type="submit">Create PO</button>
      </form>
      <h2>PO List</h2>
      <div className="invoice-list">
        {invoices.map(invoice => (
          <div className="invoice-card" key={invoice.id}>
            <h3>{invoice.customer}</h3>
            <p>Amount: ${invoice.amount}</p>
            <p>Date: {invoice.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceForm;
