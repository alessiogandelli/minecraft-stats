
import Telegraf from 'telegraf'
import session from 'telegraf/session.js'
import Stage from 'telegraf/stage.js'
import dotenv from 'dotenv'
import main from './services/dumpa.js'
import databaseHelper from './helpers/database.helper.js'
import fs from 'fs'



dotenv.config()
start()
main();

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([ ]);
bot.use(session()); 
bot.use(stage.middleware());
bot.use()
bot.start((ctx)=> stats());
bot.launch();
bot.command('d8eea', (ctx)=> getStats(ctx, 'd8eea'));



async function getStats(ctx, username){
    const stats = await databaseHelper.getCollection(username).find({}).sort({timestamp:-1}).limit(1).toArray();
    
    console.log(JSON.parse(stats[0]))
}


async function start(){
    await databaseHelper.connect()
    console.log('database connected')
}  
 
