const { TOKEN, CLIENT_ID, GUILD_ID } = process.env
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/commands")
        for (const folder of commandFolders) {
            commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith(".js"))
            
            const { commands, commandArray } = client
            for (const file of commandFiles) {
                const command = require(`./src/commands/${folder}/${file}`)
                commands.set(command.data.name, command)
                commandArray.push(command.data.toJSON())
            }
        }
        
        const rest = new REST({ version: "9" }).setToken(TOKEN)
        try {
            console.info("Started refreshing application (/) commands.")
            
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
                body: client.commandArray
            });
            
            console.info("Successfully reloaded application (/) commands.")
        } catch (e) {
            console.error(e)
            
        }
    }
};