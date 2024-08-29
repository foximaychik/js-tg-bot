const { Telegraf, Markup, Extra } = require('telegraf')
const { message } = require('telegraf/filters')
const assets = require('./assets/assets.json')
//!TOKEN
const bot = new Telegraf(assets.token);
bot.command('start', (ctx) => {
    ctx.reply("Приветик!",
     Markup.keyboard([ //Usual Keyboard
        ['Меню'], ['Обо мне']
    ]))
    ctx.reply('Прошу подписатся на канал моего разработчика!', 
    Markup.inlineKeyboard([ //Inline Keyboard
        { text: "Канал разработчика", url: "https://t.me/foximay" },
        { text: "Подписался", callback_data: "dev-chan"}
    ]))
})

//Bot on click
bot.hears('Меню', (ctx) => {
    ctx.replyWithPhoto({source: "./assets/img/menu.png"},
    Markup.inlineKeyboard([ //Inline Keyboard
        { text: "Рандомный фан-арт", callback_data: "rfa"}
    ]))
    ctx.reply(assets.status)
})
bot.hears('debug', (ctx) => {
    ctx.reply(`*Bot info: *\nBot username: ${ctx.botInfo.username}\nBot name: ${ctx.botInfo.first_name}\nBot author: ${assets.author}\nBot version: ${assets.version}\nBot status: ${assets.status}`, {parse_mode: "Markdown"})
    ctx.reply(`*Chat info: *\nChat type is: ${ctx.message.chat.type}\nChat username: ${ctx.chat.title}`, {parse_mode: "Markdown"})
})

//Inline button action
bot.action('dev-chan', (ctx) => {
    ctx.editMessageText("Спасибки)")
})
bot.action('rfa', (ctx) => {
    ctx.reply(`Status: ${assets.status}\n*Will be soon!*`, {parse_mode: "Markdown"})
})

bot.launch().then(() => {
    let d = new Date()
    console.log("Bot started at " + d.toString())
})

process.once('SIGINT', () => bot.stop('SIGINT'))
