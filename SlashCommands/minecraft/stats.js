const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require('../../config.json');
const fetch = require('node-fetch');
module.exports = {
    name: "mc-stats",
    description: "Returns stats for our Minecraft server",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const res = await fetch(`https://mcapi.us/server/status?ip=${config.ipAddress}${config.port ? `&port=${config.port}` : ''}`);
        const body = await res.json();
        const embed = new MessageEmbed()
            .setAuthor(config.ipAddress)
            .addField("Version", body.server.name)
            .addField("Connected", `${body.players.now} players`)
            .addField("Maximum", `${body.players.max} players`)
            .addField("Status", (body.online ? "Online" : "Offline"))
            .setColor("RANDOM");
        interaction.followUp({ embeds: [embed] });
    },
};
