
import Telegraf from 'telegraf'
import session from 'telegraf/session.js'
import Stage from 'telegraf/stage.js'
import dotenv from 'dotenv'
import main from './services/dumpa.js'
import databaseHelper from './helpers/database.helper.js'
import {stats} from './services/scenes/stats.js'
import fs from 'fs'



dotenv.config()
start()
main();

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([stats]);

bot.use(session()); 
bot.use(stage.middleware());
bot.use()
bot.start((ctx)=> stats());
bot.command('d8eea', Stage.enter('stats'));
bot.launch();






async function start(){
    await databaseHelper.connect()
    console.log('database connected')
}  
 
