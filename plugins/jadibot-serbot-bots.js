import ws from 'ws';
import fetch from 'node-fetch';

async function handler(m, { conn: stars, usedPrefix }) {
  let uniqueUsers = new Map();

  global.conns.forEach((conn) => {
    if (conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED) {
      uniqueUsers.set(conn.user.jid, conn);
    }
  });

  let users = [...uniqueUsers.values()];
  let subBotsCount = users.length;
  let botPrincipal = stars.user.jid;

  // Calcular tiempo activo del bot principal
  let uptime = process.uptime(); // Tiempo activo en segundos
  let hours = Math.floor(uptime / 3600);
  let minutes = Math.floor((uptime % 3600) / 60);

  // Mensaje de respuesta estilo kawaii
  let responseMessage = `
╭─〔 ❀ Sub-Bots Conectaditos  ❀ 〕─⬣
┃ ✦ Bot Principal: 1
┃ ✦ Bots de apoyo activos: ${subBotsCount || '0'}
┃ ✦ Tiempo activo del principal: ${hours} hora(s) y ${minutes} minuto(s)
╰───────────────❀
`.trim();

  try {
    let img = await (await fetch('https://files.catbox.moe/rt8xqt.jpg')).buffer();
    await stars.sendMessage(m.chat, {
      text: responseMessage,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 9,
        externalAdReply: {
          title: '❑— HokaruBot-MD —❑',
          body: `❀ Sub-Bots conectaditos: ${subBotsCount || '0'}`,
          thumbnail: img,
          sourceUrl: 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04',
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });

    // Reacción tipo Kawaii
    await m.react('❀');
  } catch (e) {
    console.error(e);
  }
}

handler.help = ['bots'];
handler.tags = ['serbot'];
handler.command = ['listjadibot', 'bots'];

export default handler;