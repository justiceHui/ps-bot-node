const express = require('express');
const app = express();
const router = require('./routers/index');

app.get('/', (req, res) => {
    res.send("hello");
});
app.use(router);

app.listen(3000, () => {
    console.log("hello");
});