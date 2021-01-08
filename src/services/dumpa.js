import databaseHelper from '../helpers/database.helper.js'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()


export default function main(){
    stats(); 
}

async function stats(){
    
    await new Promise(r => setTimeout(r, 8000));
    
    saveUsers();

    saveStats('d8eea')
    saveStats('SkuZ')
    saveStats('valzo')
    saveStats('Cavich')
    
    
}

async function saveUsers(){
    const usercache = fs.readFileSync(process.env.PATH_TO_SERVER +'usercache.json' ,'utf8');
    const users = JSON.parse(usercache);
    let dbuser = {};
    try {
        dbuser = await databaseHelper.getCollection('users').stats();
    } catch (error) {
        console.log('non trovo gli utenti ');
    }
    
    if(dbuser.count == 0)
        await databaseHelper.getCollection('users').insertMany(users);
}

async function saveStats(username){
    const path = process.env.PATH_TO_SERVER + 'world/stats/';
    const user = await getUser(username);
    const stats = JSON.parse(fs.readFileSync( path+ user.uuid +'.json', 'utf8')).stats;
    stats.timestamp = new Date();
   // await databaseHelper.getCollection(username).insertOne(stats);
    
    
}

async function getUser(username){
    let user ;
    try {
        user = await databaseHelper.getCollection('users').findOne({"name" : username});

    } catch (error) {
        console.log('non riesco a salvare' + error);
    }
    return user
}
