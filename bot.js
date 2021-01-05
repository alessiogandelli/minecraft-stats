
import Telegraf from 'telegraf'
import session from 'telegraf/session.js'
import Stage from 'telegraf/stage.js'
import dotenv from 'dotenv'
import databaseHelper from './helpers/database.helper.js'
import fs from 'fs'
import { get } from 'http'


dotenv.config()


async function start(){
    await databaseHelper.connect()
}

start();

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([ ]);
bot.use(session()); 
bot.use(stage.middleware());
bot.use((ctx) => stats(ctx))
bot.start();

//bot.command('/addlibro', Stage.enter('addLibro'));

bot.launch();

async function stats(ctx){
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