const tripsModel = require('../models/tripsModel');
const { ObjectId } = require('mongodb');

async function getAll(req, res) {
    try {
        const { continent, status, sortField1, sortOrder1, sortField2, sortOrder2 } = req.query;

        const sort = {};
        if (sortField1) sort[sortField1] = sortOrder1 === 'desc' ? -1 : 1;
        if (sortField2) sort[sortField2] = sortOrder2 === 'desc' ? -1 : 1; // poprawione

        const trips = await tripsModel.getAllTrips({ continent, status }, sort);
        res.render('pages/index', { trips });
    } catch (err) {
        console.error(err);
        res.status(500).send("Błąd serwera");
    }
}

function validateTripInput({ title, continent, name, surname, dateFrom, dateTo, status }) {
    const continents = ["Afryka", "Antarktyda", "Azja", "Australia", "Europa", "Ameryka Północna", "Ameryka Południowa"];
    const statuses = ["planuje", "realizuje", "zrealizowane"];

    if (!title || !name || !surname) return "Tytuł, imię i nazwisko są wymagane";
    if (continent && !continents.includes(continent)) return "Nieprawidłowy kontynent";
    if (status && !statuses.includes(status)) return "Nieprawidłowy status";
    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) return "Data rozpoczęcia nie może być po dacie zakończenia";
    return null;
}

async function getAddForm(req, res) {
    res.render('pages/add');
}

async function postAdd(req, res) {
    try {
        const error = validateTripInput(req.body);
        if (error) return res.status(400).send(error);

        const { title, continent, name, surname, dateFrom, dateTo, status } = req.body;
        await tripsModel.addTrip(title, continent, name, surname, dateFrom, dateTo, status);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Błąd serwera");
    }
}

async function getEditForm(req, res, next) {
    try {
        if (!ObjectId.isValid(req.params.id)) throw { status: 400, message: "Nieprawidłowe ID" };

        const trip = await tripsModel.getTripById(req.params.id);
        if (!trip) throw { status: 404, message: "Nie znaleziono podróży" };

        res.render('pages/edit', { trip });
    } catch (err) {
        next(err);
    }
}

async function postEdit(req, res) {
    try {
        if (!ObjectId.isValid(req.params.id)) return res.status(400).send("Nieprawidłowe ID");

        const error = validateTripInput(req.body);
        if (error) return res.status(400).send(error);

        const { title, continent, name, surname, dateFrom, dateTo, status } = req.body;
        const updated = await tripsModel.updateTrip(req.params.id, title, continent, name, surname, dateFrom, dateTo, status);

        if (!updated) return res.status(404).send("Nie znaleziono podróży");
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Błąd serwera");
    }
}

async function getDetails(req, res) {
    try {
        if (!ObjectId.isValid(req.params.id)) return res.status(400).send("Nieprawidłowe ID");

        const trip = await tripsModel.getTripById(req.params.id);
        if (!trip) return res.status(404).send("Nie znaleziono podróży");

        res.render('pages/details', { trip });
    } catch (err) {
        console.error(err);
        res.status(500).send("Błąd serwera");
    }
}

function getAbout(req, res) {
    res.render('pages/about');
}

async function deleteTrip(req, res) {
    try {
        if (!ObjectId.isValid(req.params.id)) return res.status(400).send("Nieprawidłowe ID");

        const deleted = await tripsModel.deleteTrip(req.params.id);
        if (!deleted) return res.status(404).send("Nie znaleziono podróży");

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Błąd serwera");
    }
}

module.exports = { getAll, getAddForm, postAdd, getEditForm, postEdit, deleteTrip, getDetails, getAbout };
