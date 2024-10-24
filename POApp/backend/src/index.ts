import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

interface Invoice {
  id: number;
  customer: string;
  amount: number;
  date: string;
}

let invoices: Invoice[] = [];
let idCounter = 1;

app.get('/invoices', (req, res) => {
  res.json(invoices);
});

app.post('/invoices', (req, res) => {
  const { customer, amount, date } = req.body;
  const newInvoice: Invoice = { id: idCounter++, customer, amount, date };
  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
