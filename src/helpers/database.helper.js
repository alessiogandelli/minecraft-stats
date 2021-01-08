import pkg from 'mongodb';
const { MongoClient } = pkg;
const url = process.env.CONNECTION_STRING;

let connection;

async function connect() {
    connection = await (new MongoClient(process.env.MONGODB_CONNECTION_STRING , { useUnifiedTopology: true }).connect());
    return connection;
}

function getConnection() {
    if (connection === null) {
        throw new Error('Connection not found');
    }
    return connection;
}

function closeConnection() {
    connection?.close();
    connection = null;
}
function getDb(){
    if (connection === null) {
        throw new Error('Connection not found');
    }
    return connection?.db(process.env.DEFAULT_DB);
}

function getCollection(collection){
    return getDb().collection(collection);
}


export default {
    connect: connect,
    getConnection: getConnection,
    closeConnection: closeConnection,
    getCollection: getCollection
};