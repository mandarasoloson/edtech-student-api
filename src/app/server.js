import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API EdTech démarrée sur http://localhost:${PORT}`);
});