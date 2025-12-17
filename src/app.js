const express = require('express');
const path = require('path');
const tripRouter = require('./routes/tripsRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', tripRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    const message = err.message || "Wystąpił błąd serwera";
    res.status(statusCode).render('pages/error', { statusCode, message });
});

app.use((req, res) => {
    res.status(404).render('pages/error', { statusCode: 404, message: "Strona nie istnieje" });
});

module.exports = app;