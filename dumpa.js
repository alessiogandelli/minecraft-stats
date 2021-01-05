import databaseHelper from './helpers/database.helper.js'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()



export default function main(){
    start();
    stats(); 
}

async function stats(){
    
    await new Promise(r => setTimeout(r, 2000));
    
    saveUsers();

    saveStats('d8eea')
    saveStats('SkuZ')
    saveStats('valzo')
    saveStats('Cavich')

}

async function saveUsers(){
    const usercache = fs.readFileSync('./usercache.json' ,'utf8');
    const users = JSON.parse(usercache);
    const dbuser = await databaseHelper.getCollection('users').stats();
    if(dbuser.count == 0)
        await databaseHelper.getCollection('users').insertMany(users);
}

async function saveStats(username){
    const path = './stats/';
    const user = await databaseHelper.getCollection('users').findOne({"name" : username});
    const stats = fs.readFileSync( path+ user.uuid +'.json', 'utf8');
    const parsed = JSON.parse(stats).stats;
    parsed.timestamp = new Date();
    await databaseHelper.getCollection(username).insertOne(parsed);

}

async function start(){
    await databaseHelper.connect()
}