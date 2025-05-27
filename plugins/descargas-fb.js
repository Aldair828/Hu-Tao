import fg from 'api-dylux';
import fetch from 'node-fetch';
import axios from 'axios';
const userMessages = new Map();
const userRequests = {};

const handler = async (m, { conn, args, command, usedPrefix }) => {
if (!args[0]) throw `👻 ¡Hu Tao dice que necesitas poner un enlace de Facebook para invocar el video!\n🎯 *Ejemplo:* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`;
if (!args[0].match(/www.facebook.com|fb.watch/g)) throw `👻 ¡Ese no parece un enlace válido de Facebook!\n🎯 *Ejemplo:* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`;
if (userRequests[m.sender]) return await conn.reply(m.chat, `⏳ ¡Ey tú! @${m.sender.split('@')[0]} ya estás bajando un video, ¡no seas glotón de descargas! 🍂\nEspera que el espíritu del video anterior se libere...`, m);
userRequests[m.sender] = true;
m.react(`🔥`);

try {
const downloadAttempts = [async () => {
const api = await fetch(`https://api.agatz.xyz/api/facebook?url=${args[0]}`);
const data = await api.json();
const videoUrl = data.data.hd || data.data.sd;
const imageUrl = data.data.thumbnail;
if (videoUrl && videoUrl.endsWith('.mp4')) {
return { type: 'video', url: videoUrl, caption: `🎬 ¡Aquí está tu video espectral directo de Facebook! 🥀 -Hu Tao` };
} else if (imageUrl && (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.png'))) {
return { type: 'image', url: imageUrl, caption: `🖼️ ¡Una imagen encantada desde Facebook solo para ti! 🍁 -Hu Tao` };
}},
async () => {
const api = await fetch(`${APIs.fgmods.url}/downloader/fbdl?url=${args[0]}&apikey=${APIs.fgmods.key}`);
const data = await api.json();
const downloadUrl = data.result[0].hd || data.result[0].sd;
return { type: 'video', url: downloadUrl, caption: `🎬 ¡Un video desde el más allá... digo, desde Facebook! 😏 -Hu Tao` };
},
async () => {
const apiUrl = `${apis}/download/facebook?url=${args[0]}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
const downloadUrl = delius.urls[0].hd || delius.urls[0].sd;
return { type: 'video', url: downloadUrl, caption: `🎥 ¡Video cazado con ayuda de los espíritus! 🌸 -Hu Tao`};
},
async () => {
const apiUrl = `https://api.dorratz.com/fbvideo?url=${encodeURIComponent(args[0])}`;
const response = await fetch(apiUrl);
const data = await response.json();
const hdUrl = data.result.hd;
const sdUrl = data.result.sd;
const downloadUrl = hdUrl || sdUrl;
return { type: 'video', url: downloadUrl, caption: `🎥 ¡Otro video atrapado entre este mundo y el más allá! 👻 -Hu Tao` };
},
async () => {
const ress = await fg.fbdl(args[0]);
const urll = ress.data[0].url;
return { type: 'video', url: urll, caption: `🎬 ¡Invocación exitosa! Aquí tienes tu video. ✨ -Hu Tao` };
}];

let mediaData = null;
for (const attempt of downloadAttempts) {
try {
mediaData = await attempt();
if (mediaData) break; 
} catch (err) {
console.error(`Error in attempt: ${err.message}`);
continue; 
}}

if (!mediaData) throw new Error(`😵‍💫 ¡Ningún espíritu pudo traer tu video! Intenta con otro enlace... -Hu Tao`);
const fileName = mediaData.type === 'video' ? 'video.mp4' : 'thumbnail.jpg';
await conn.sendFile(m.chat, mediaData.url, fileName, mediaData.caption, m, null, fake);
m.react('✅');
} catch (e) {
m.react('❌');
console.log(e);
} finally {
delete userRequests[m.sender];
}};
handler.help = ['fb', 'facebook', 'fbdl'];
handler.tags = ['downloader'];
handler.command = /^(facebook|fb|facebookdl|fbdl|facebook2|fb2|facebookdl2|fbdl2|facebook3|fb3|facebookdl3|fbdl3|facebook4|fb4|facebookdl4|fbdl4|facebook5|fb5|facebookdl5|fbdl5)$/i;
handler.limit = 3;
handler.register = true;

export default handler;
