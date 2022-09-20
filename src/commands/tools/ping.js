const { SlashCommandBilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBilder()
        .setName("ping")
        .setDescription("Returns ping!"),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        
        const newMessage = `pong!\nAPI Latency: ${message.ws.ping}\nClient Ping: ${message.createdTimeStamp - interaction.createdTimeStamp}`
        await interaction.editReply({
            content: newMessage,
            //ephemeral: true
        });
    }
};
