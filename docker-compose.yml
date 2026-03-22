const express = require('express');
const app = express();
const port = process.env.PORT || 3111;
const domain = process.env.MY_APP_DOMAIN || 'localhost';

// Для обробки JSON у POST запитах
app.use(express.json());

// GET Ендпоінт
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST Ендпоінт для дебагу (Крок 15-16)
app.post('/debug', (req, res) => {
  console.log('Вхідні дані:', req.body);
  res.json({
    message: "Дані отримано",
    debug: req.body,
    host: domain
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  console.log(`Доступно за адресою: http://${domain}:${port}`);
});