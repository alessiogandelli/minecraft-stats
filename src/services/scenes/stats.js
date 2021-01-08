import Composer from 'telegraf/composer.js'
import WizardScene from 'telegraf/scenes/wizard/index.js'
import databaseHelper from '../../helpers/database.helper.js';
import Markup from 'telegraf/markup.js'




const inizio = (ctx)=>{
    
    ctx.reply('di chi vuoi vedere le statistiche?' , Markup.inlineKeyboard([[Markup.callbackButton('Cavich', 'cav'),
                                                                            Markup.callbackButton('d8eea', 'd8')],
                                                                            [Markup.callbackButton('SkuZ', 'sk'),
                                                                            Markup.callbackButton('valzo', 'va')]
                                                                            ]).extra())
    return ctx.wizard.next();
}


const user = new Composer();
user.action('cav', (ctx)=>{
    ctx.wizard.state.libro = 'Cavich'
    ctx.reply('che statistiche vuoi vedere?' , Markup.inlineKeyboard([[     Markup.callbackButton('varie', 'varie'),
                                                                            Markup.callbackButton('cose droppate', 'drop')],
                                                                        [   Markup.callbackButton('cose scassate', 'scassate'),
                                                                            Markup.callbackButton('le volte che sei morto', 'dead')],
                                                                         [   Markup.callbackButton('cose minate', 'minate'),
                                                                            Markup.callbackButton('cose craftate', 'craftate')],
                                                                          [  Markup.callbackButton('cose usate', 'usate'),
                                                                            Markup.callbackButton('cose uccide', 'kill')],
                                                                            [Markup.callbackButton('cose raccolte', 'raccolte')]
                                                                            ]).extra())
    return ctx.wizard.next();
})

user.action('d8', (ctx)=>{
    ctx.wizard.state.libro = 'd8eea'
    return ctx.wizard.next();
})
user.action('sk', (ctx)=>{
    ctx.wizard.state.libro = 'SkuZ'
    return ctx.wizard.next();
})

user.action('va', (ctx)=>{
    ctx.wizard.state.libro = 'valzo'
    return ctx.wizard.next();
})

const tipologia = new Composer();
tipologia.use((ctx)=>{ 
   

    ctx.wizard.next()
    
})

const inserisci = new Composer();
inserisci.action('y', (ctx) =>{

    ctx.scene.leave();
})
inserisci.action('n', (ctx) =>{
    ctx.reply('si ma non sei buono nemmeno a scrivere due numeri, riprovaci /nanna');
    ctx.scene.leave();
})




export const stats = new WizardScene('stats',
        inizio,
        user,
        tipologia,
        inserisci
)

 