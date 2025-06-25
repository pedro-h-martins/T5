import express from 'express';
import cors from 'cors';
import { rotasCliente } from './routes/rotaCliente';
import { rotasPet } from './routes/rotaPet';
import { rotasProduto } from './routes/rotaProduto';
import { rotasServico } from './routes/rotaServico';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/clientes', rotasCliente);
app.use('/api/pets', rotasPet);
app.use('/api/produtos', rotasProduto);
app.use('/api/servicos', rotasServico);

app.get('/api/relatorios/top-clientes-produtos', (req, res) => {
  res.status(200).json([]);
});

app.get('/api/relatorios/top-clientes-servicos', (req, res) => {
  res.status(200).json([]);
});

app.get('/api/relatorios/top-produtos', (req, res) => {
  res.status(200).json([]);
});

app.get('/api/relatorios/top-servicos', (req, res) => {
  res.status(200).json([]);
});

app.get('/api/relatorios/top5-clientes-valor', (req, res) => {
  res.status(200).json([]);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

app.listen(port, () => {
  console.log(`C4P API Server running at http://localhost:${port}`);
});
