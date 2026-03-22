const express = require('express');
const app = express();
const PORT = 3111;

app.get('/', (req, res) => {
    res.send('API is running inside Docker!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});