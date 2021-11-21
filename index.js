"use strict";
const fs = require("fs")
const qrcode = require("qrcode")
const Baileys = "@adiwajshing/baileys";
const { WAConnection: _WAConnection } = require("@adiwajshing/baileys");
const WAConnection = require('./lib/simple').WAConnection(_WAConnection);
const { Functions } = require('./lib/Functions');
  
  
global.antidelete = false
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.Ft = new Functions();// Menghubungkan dari Function.js
global.mediaType = require(Baileys).MessageType //Biar keren hehe
global.conn = new WAConnection(); //Wa Connect dari baileys
global.botuser = require('./config')//Menghubungkan Ke Conection string
global.Events = {}
global.baileys = Baileys //Hehe
global.prefix = botuser.prefix
global.isPublic = botuser.isPublic
global.Scrap = require("./lib/scrape")
 
 
console.log(Ft.banner.string)
conn.version = [2, 2142, 12]
conn.logger.level = "warn"

if (fs.existsSync('./session.json')) conn.loadAuthInfo('./session.json')
conn.on('qr', qr => {
    console.log('\x1b[1;37m> [' + Ft.color('INF', 'cyan') + ']', Ft.color(`Silahkan scan qr nya`))
})
conn.on('connecting', () => {
    console.log('\x1b[1;37m> [' + Ft.color('INF', 'cyan') + ']', Ft.color('Bot connecting...'))
})

conn.on("open", () => {
    const authInfo = conn.base64EncodedAuthInfo()
    console.log('\x1b[1;37m> [' + Ft.color('INF', 'cyan') + ']', Ft.color('Bot connected!'))
    fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})


require('./src/loader')
async function run() {
    let message = require('./action/chats');
    let action = require('./action/action');
    await conn.connect().then(async(json) => {})
    conn.message = message.msg
    conn.on('chat-update', conn.message);
    /*conn.on('group-participants-update', action.groupUpdate);*/
}

Ft.action()
run()

