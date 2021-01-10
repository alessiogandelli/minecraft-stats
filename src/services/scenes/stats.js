import Composer from 'telegraf/composer.js'
import WizardScene from 'telegraf/scenes/wizard/index.js'
import databaseHelper from '../../helpers/database.helper.js';
import Markup from 'telegraf/markup.js'


const tastieraSpeciale = Markup.inlineKeyboard([[   Markup.callbackButton('varie', 'varie'),
                                                    Markup.callbackButton('cose droppate', 'drop')],
                                                    [Markup.callbackButton('cose scassate', 'scassate'),
                                                    Markup.callbackButton('le volte che sei morto', 'dead')],
                                                    [Markup.callbackButton('cose minate', 'minate'),
                                                    Markup.callbackButton('cose craftate', 'craftate')],
                                                    [Markup.callbackButton('cose usate', 'usate'),
                                                    Markup.callbackButton('cose uccide', 'kill')],
                                                    [Markup.callbackButton('cose raccolte', 'raccolte'),
                                                    Markup.callbackButton('esci', 'esci')]
                                                    ]).extra();

const inizio = (ctx) => {

    ctx.reply('di chi vuoi vedere le statistiche?', Markup.inlineKeyboard([[Markup.callbackButton('Cavich', 'cav'),
                                                                            Markup.callbackButton('d8eea', 'd8')],
                                                                            [Markup.callbackButton('SkuZ', 'sk'),
                                                                            Markup.callbackButton('valzo', 'va')]
    ]).extra())
    return ctx.wizard.next();
}


const user = new Composer();
user.action('cav', (ctx) => {
    ctx.wizard.state.user = 'Cavich';
    getStats(ctx);
    ctx.reply('che statistiche vuoi vedere?', tastieraSpeciale);
    return ctx.wizard.next();
})

user.action('d8', (ctx) => {
    ctx.wizard.state.user = 'd8eea';
    getStats(ctx);
    
    ctx.reply('che statistiche vuoi vedere?', tastieraSpeciale);
    return ctx.wizard.next();
})
user.action('sk', (ctx) => {
    ctx.wizard.state.user = 'SkuZ';
    getStats(ctx);
    ctx.reply('che statistiche vuoi vedere?', tastieraSpeciale);
    return ctx.wizard.next();
})

user.action('va', (ctx) => {
    ctx.wizard.state.user = 'valzo';
    getStats(ctx)
    ctx.reply('che statistiche vuoi vedere?', tastieraSpeciale);
    return ctx.wizard.next();
})

const tipologia = new Composer();
tipologia.action('varie', (ctx) => {
    
    let type = 'minecraft:custom'
    ctx.reply(createAnswer(ctx.wizard.state.stats, type));
    ctx.wizard.next()
})

tipologia.action('drop', (ctx) => {
    let type = 'minecraft:dropped'
    ctx.reply(createAnswer(ctx.wizard.state.stats, type));
    ctx.scene.leave();
})

tipologia.action('scassate', (ctx) => {
    let type = 'minecraft:broken'
    ctx.reply(createAnswer(ctx.wizard.state.stats, type));
    ctx.scene.leave();
})

tipologia.action('dead', (ctx) => {
    let type = 'minecraft:killed_by'
    ctx.reply(createAnswer(ctx.wizard.state.stats, type));
    ctx.scene.leave();
})

tipologia.action('minate', (ctx) => {
    let type = 'minecraft:mined'
    ctx.reply(createAnswer(ctx.wizard.state.stats, type));
    ctx.scene.leave();
})

tipologia.action('craftate', (ctx) => {
    let type = 'minecraft:crafted'
    ctx.reply(createAnswer(ctx.wizard.state.stats, type));
    ctx.scene.leave();
})

tipologia.action('usate', (ctx) => {
    let type = 'minecraft:used'
    ctx.reply(createAnswer(ctx.wizard.state.stats, type));
    ctx.scene.leave();
})

tipologia.action('kill', (ctx) => {
    let type = 'minecraft:killed'
    ctx.reply(createAnswer(ctx.wizard.state.stats, type));
    ctx.scene.leave();
})

tipologia.action('raccolte', (ctx) => {
    let type = 'minecraft:picked_up'
    ctx.reply(createAnswer(ctx.wizard.state.stats, type));
    ctx.scene.leave();
})

tipologia.action('esci', (ctx) => {

    ctx.reply('ciao');
    ctx.scene.leave();
})


function createAnswer(st, type){

    let answer = '';

    Object.keys(st['0'][type]).forEach(el =>{
        console.log(el)
        if(el != '_id' && el != 'timestamp'){
            let name = el.split(':')[1]
            answer += name + '= '+st['0'][type][el] + '\n\n';
        }
    })

    return answer;
}



async function getStats(ctx){
    console.log('getto le stats')
    ctx.wizard.state.stats = await databaseHelper.getCollection(String(ctx.wizard.state.user)).find({}).sort({timestamp:-1}).limit(1).toArray();
    ctx.wizard.next()
}





export const stats = new WizardScene('stats',
    inizio,
    user,
    getStats, // non so perchè ma funziona
    tipologia,
    user,
    user,
    user

)

