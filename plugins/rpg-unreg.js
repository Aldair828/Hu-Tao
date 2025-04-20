let handler = async (m, { conn, text }) => {

let user = global.db.data.users[m.sender]

user.registered = false

return conn.reply(m.chat, `🚩 Usted anuló su registro de ShizukaBot-MD 🌻✨️*\n\n🚩 Puede usar #reg nombre.edad para realizar un nuevo registro`, m, rcanal)

}
handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg', 'unregister']
handler.register = true
export default handler
