const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');
const { encrypt, decrypt } = require('../utils/crypto');

async function getAllTrips(filters = {}, sort = {}) {
    const db = getDB();
    const query = {};

    if (filters.continent && filters.continent !== '') query.continent = filters.continent;
    if (filters.status && filters.status !== '') query.status = filters.status;

    const trips = await db.collection('trips').find(query).sort(sort).toArray();

    return trips.map(trip => ({
        ...trip,
        name: decrypt(trip.name),
        surname: decrypt(trip.surname)
    }));
}

async function getTripById(id) {
    const db = getDB();
    const trip = await db.collection('trips').findOne({ _id: new ObjectId(id) });
    if (!trip) return null;
    return {
        ...trip,
        name: decrypt(trip.name),
        surname: decrypt(trip.surname)
    };
}

async function addTrip(title, continent, name, surname, dateFrom, dateTo, status) {
    const db = getDB();
    await db.collection('trips').insertOne({
        title,
        continent,
        name: encrypt(name),
        surname: encrypt(surname),
        dateFrom,
        dateTo,
        status,
        createdAt: new Date()
    });
}

async function updateTrip(id, title, continent, name, surname, dateFrom, dateTo, status) {
    const db = getDB();
    const result = await db.collection('trips').updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                title,
                continent,
                name: encrypt(name),
                surname: encrypt(surname),
                dateFrom,
                dateTo,
                status
            }
        }
    );
    return result.modifiedCount > 0;
}

async function deleteTrip(id) {
    const db = getDB();
    const result = await db.collection('trips').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}

module.exports = { getAllTrips, getTripById, addTrip, updateTrip, deleteTrip };
