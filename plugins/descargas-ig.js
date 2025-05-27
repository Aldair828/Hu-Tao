const handler = async (m, { conn, args, command, usedPrefix }) => {
  const datas = global;
  if (!args[0]) throw `👻 ¡Oops! Tienes que poner un link de Instagram para que Hu Tao lo atrape 👒\n\n🔗 Ejemplo: *${usedPrefix + command}* https://www.instagram.com/p/C60xXk3J-sb/`;
  if (userRequests[m.sender]) return await conn.reply(m.chat, `Hey @${m.sender.split('@')[0]}, ya estás haciendo una descarga 👻\n🕒 Espera un poquito antes de pedir otro, ¿sí?`, m)

  userRequests[m.sender] = true;
  await m.react('🕒');

  try {
    let igImagen = `🖼️ Aquí está tu imagen atrapada por Hu Tao 👻`;
    let igVideo = `🎥 Aquí tienes el video directo desde el otro mundo... digo, ¡Instagram! 👻`;

    const downloadAttempts = [
      async () => {
        const res = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${args[0]}`);
        const data = await res.json();
        const fileType = data.data[0].url.includes('.webp') ? 'image' : 'video';
        return { url: data.data[0].url, type: fileType, caption: fileType === 'image' ? igImagen : igVideo };
      },
      async () => {
        const res = await fetch(`${APIs.fgmods.url}/downloader/igdl?url=${args[0]}&apikey=${APIs.fgmods.key}`);
        const data = await res.json();
        const result = data.result[0];
        const fileType = result.url.endsWith('.jpg') || result.url.endsWith('.png') ? 'image' : 'video';
        return { url: result.url, type: fileType, caption: fileType === 'image' ? igImagen : igVideo };
      },
      async () => {
        const apiUrl = `${apis}/download/instagram?url=${encodeURIComponent(args[0])}`;
        const apiResponse = await fetch(apiUrl);
        const delius = await apiResponse.json();
        return { url: delius.data[0].url, type: delius.data[0].type, caption: delius.data[0].type === 'image' ? igImagen : igVideo };
      },
      async () => {
        const resultssss = await instagramdl(args[0]);
        const shortUrl3 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
        const txt4 = `🔗 ${shortUrl3}`;
        return { url: resultssss[0].url, type: resultssss[0].url.endsWith('.mp4') ? 'video' : 'image', caption: txt4 };
      },
    ];

    let fileData = null;
    for (const attempt of downloadAttempts) {
      try {
        fileData = await attempt();
        if (fileData) break;
      } catch (err) {
        console.error(`Error en intento: ${err.message}`);
        continue;
      }
    }

    if (!fileData) throw new Error(await tr('Hu Tao no pudo encontrar nada... el enlace puede estar roto 👻'));
    const fileName = fileData.type === 'image' ? 'ig.jpg' : 'ig.mp4';
    await conn.sendFile(m.chat, fileData.url, fileName, fileData.caption, m, null, fake);
    await m.react('✅');
  } catch (e) {
    await m.react('❌');
    console.log(e);
    handler.limit = 0;
  } finally {
    delete userRequests[m.sender];
  }
};
