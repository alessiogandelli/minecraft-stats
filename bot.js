
import Telegraf from 'telegraf'
import session from 'telegraf/session.js'
import Stage from 'telegraf/stage.js'
import dotenv from 'dotenv'
import main from './dumpa.js'
import databaseHelper from './helpers/database.helper.js'
import fs from 'fs'
import { get } from 'http'


dotenv.config()


main();

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([ ]);
bot.use(session()); 
bot.use(stage.middleware());
bot.use()
bot.start((ctx)=> stats());
bot.launch();

