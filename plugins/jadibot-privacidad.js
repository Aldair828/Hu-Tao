let handler = async (m, { conn, usedPrefix, text }) => {
  const isSubBot = global.conns?.some(bot => bot.user.jid === m.sender);
  const isMainBot = m.sender === global.conn.user.jid; 
  if (!isSubBot && !isMainBot) return m.reply(await tr('❀ Lo siento, este comando solo lo puede usar el ✧ Bot Principal ✧ o un ✿ Sub-Bot ✿'));

  const bot = isSubBot ? global.conns.find(bot => bot.user.jid === m.sender) : global.conn;
  if (!bot) return m.reply(await tr('❀ No se pudo identificar tu botcito... intenta de nuevo porfis.'));

  const botConfig = global.db.data.users[bot.user.jid] || {};
  const [option, value] = text.split(' ');

  if (!option || !value) {
    return m.reply(await tr(`✧ Uso Correcto✧: *${usedPrefix}setconfig <opción> <valor>*

Opciones disponibles:
⟡ *privacy*: 1 (activar) / 0 (desactivar)
⟡ *prestar*: 1 (activar) / 0 (desactivar)`));
  }

  if (option === 'privacy') {
    if (value === '1') {
      botConfig.privacy = true;
      await conn.sendMessage(m.chat, { text: await tr('❀ *Privacidad activada* ✧\nTu numerito estará oculto en la lista de botcitos.') }, { quoted: m });
    } else if (value === '0') {
      botConfig.privacy = false;
      await conn.sendMessage(m.chat, { text: await tr('❀ *Privacidad desactivada* ✧\nTu numerito será visible en la lista de botcitos.') }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: await tr('✧ Opción no válida ❀ Usa: *1* (activar) o *0* (desactivar)') }, { quoted: m });
    }
  } else if (option === 'prestar') {
    if (value === '1') {
      botConfig.prestar = true;
      await conn.sendMessage(m.chat, { text: await tr('❀ *Modo prestar activado* ✿\nTu botcito ahora puede ser invitado a grupitos kawaii.') }, { quoted: m });
    } else if (value === '0') {
      botConfig.prestar = false;
      await conn.sendMessage(m.chat, { text: await tr('❀ *Modo prestar desactivado* ✿\nNadie podrá invitar a tu botcito por ahora.') }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: await tr('✧ Opción no válida ❀ Usa: *1* (activar) o *0* (desactivar)') }, { quoted: m });
    }
  } else {
    return m.reply(await tr('✧ Esa opción no existe, nyan ❀'));
  }

  global.db.data.users[bot.user.jid] = botConfig;
};

handler.command = handler.help = ['setconfig'];
handler.tags = ['jadibot'];
handler.register = true;

export default handler;