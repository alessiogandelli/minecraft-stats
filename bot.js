
import Telegraf from 'telegraf'
import session from 'telegraf/session.js'
import Stage from 'telegraf/stage.js'
import dotenv from 'dotenv'
import databaseHelper from './helpers/database.helper.js'


dotenv.config()

async function start(){
    await databaseHelper.connect()
}

start();
const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([ ]);
bot.use(session()); 
bot.use(stage.middleware());
bot.start((ctx) => savestats(ctx));

//bot.command('/addlibro', Stage.enter('addLibro'));

bot.launch();

function saveStats(ctx){
    
}