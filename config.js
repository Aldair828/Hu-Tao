import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' ; 
import { tr, translateText } from './lib/_checkLang.js';

//---------[ Añada los numeros a ser Propietario/a ]---------

global.owner = [
["51935480552", 'Aldair', true],
["51935480552"], 
["51935480552"],
["51935480552"],
["51935480552"],
["51935480552"],
["51935480552"],
["51935480552"],
["51935480552"],
["51935480552"],
["51935480552"]]
global.mods = []
global.prems = []

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
global.botNumberCode = "" //Ejemplo: +59309090909
global.confirmCode = "" 
global.gataJadibts = true //cambia a false Desactivar en "auto-reconexion" de sub-bots

//Cambiar a tu idioma "es = español" - "en = inglés"
global.lang = "es"
global.tr = tr

//---------[ APIS GLOBAL ]---------

global.baileys = '@whiskeysockets/baileys'
global.apis = 'https://delirius-apiofc.vercel.app'

global.APIs = { lolhuman: { url: 'https://api.lolhuman.xyz/api/', key: 'GataDiosV3' },
skizo: { url: 'https://skizo.tech/api/', key: 'GataDios' },
alyachan: { url: 'https://api.alyachan.dev/api/', key: null }, 
neoxr: { url: 'https://api.neoxr.eu/api', key: 'GataDios' },
fgmods: { url: 'https://api.fgmods.xyz/api', key: 'elrebelde21' },
popcat: { url: 'https://api.popcat.xyz', key: null }}

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	

//------------------------[ Stickers ]-----------------------------

global.packname = `❁ 𝙃𝙪_𝙏𝙖𝙤  𝘽𝙊𝙏 ❁` 
global.author = `Aldair` 
//------------[ Versión | Nombre | cuentas ]------------

global.wm = '❁ 𝙃𝙪_𝙏𝙖𝙤  𝘽𝙊𝙏 ❁' 
global.vs = '2.3.0'
global.yt = 'https://www.instagram.com/aldair_ddd/'
global.tiktok = 'https://www.instagram.com/aldair_ddd/'
global.md = 'https://www.instagram.com/aldair_ddd/'
global.fb = 'https://www.instagram.com/aldair_ddd/'
global.face = 'https://www.instagram.com/aldair_ddd/'

global.nna = 'https://whatsapp.com/channel/0029Vb6dZoR3bbVCsueDiK0w' //Update
global.nna2 = 'https://whatsapp.com/channel/0029Vb6dZoR3bbVCsueDiK0w' //Koharu update
global.nnaa = 'https://whatsapp.com/channel/0029Vb6dZoR3bbVCsueDiK0w' //Koharu - Test
global.nn = 'https://whatsapp.com/channel/0029Vb6dZoR3bbVCsueDiK0w' //Grupo 1
global.nnn = 'https://whatsapp.com/channel/0029Vb6dZoR3bbVCsueDiK0w' //Grupo 2
global.nnnt = 'https://whatsapp.com/channel/0029Vb6dZoR3bbVCsueDiK0w' //Grupo del Colaboracion
global.nnntt = 'https://whatsapp.com/channel/0029Vb6dZoR3bbVCsueDiK0w' //enlace 
global.nnnttt = 'https://whatsapp.com/channel/0029Vb6dZoR3bbVCsueDiK0w' //A.T.T.M
global.nnntttt = 'https://whatsapp.com/cha51935480552nnel/0029Vb6dZoR3bbVCsueDiK0w' //Grupo ayuda sobre el bot
global.bot = 'wa.me/51935480552'
global.redes = [nna, nna2, yt, nn, nnn, nnnt, nnntt, nnnttt, nnntttt, md, tiktok, fb, face]

//------------------------[ Info | Datos ]---------------------------

global.wait = 'ESPEREN UN MOMENTO PORFAVOR\n\n> *NO SPAM... GRACIAS*'
global.waitt = '* Cargando...*'
global.waittt = '* Cargando...*'
global.waitttt = '* Cargando...*'
global.waittttt = '* Cargando...*'
global.rg = 'R E S U L T A D O S\n\n'
global.ag = 'P R E C A U C I Ó N \n\n'
global.iig = 'D A T O S \n\n'
global.fg = 'A L G O  F A L L Ó \n\n'
global.mg = 'L O  U S A S T E  M A L \n\n'
global.eeg = 'R E P O R T E  E N V I A D O \n\n'
global.eg = 'T O D O  S A L I Ó  B I E N \n\n'
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/img/catagolo.jpg')
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//-------------------------[ IMAGEN ]------------------------------
//global.img = "https://qu.ax/Zgqq.jpg"
global.img1 = 'https://qu.ax/OwAmk.jpg'
global.img2 = 'https://qu.ax/OwAmk.jpg'

global.imagen = fs.readFileSync('./Menu2.jpg')
global.imagen1 = fs.readFileSync('./media/Menu1.jpg')
global.imagen2 = fs.readFileSync('./media/Menu2.jpg')
global.imagen3 = fs.readFileSync('./media/Menu3.jpg')
global.imagen4 = fs.readFileSync('./media/Menu4.jpg')
global.imagen5 = 'https://qu.ax/jXGYP.jpg'
global.imagen6 = 'https://qu.ax/YEzqK.jpg'
global.menu18 = 'https://qu.ax/VcXtV.jpg'
global.vid1 = 'https://qu.ax/XZaYe.mp4'
global.img = [imagen, imagen1, imagen2, imagen3, imagen4]
global.imageUrl = ["https://qu.ax/OwAmk.jpg", "https://qu.ax/OwAmk.jpg", "https://qu.ax/OwAmk.jpg"]

//----------------------------[ NIVELES | RPG ]---------------------------------

global.multiplier = 850 // Cuanto más alto, más difícil subir de nivel
global.maxwarn = '4' // máxima advertencias

//---------------[ IDs de canales ]----------------

global.ch = {
ch1: '', 
ch2: '', 
ch3: '',
ch4: '',
ch5: '', 
ch6: '',
ch7: '',  
ch8: '',
ch9: '',
}

//----------------------------------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
