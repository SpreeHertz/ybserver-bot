const client = require("../index");
const config = require("../config.json");
const { MessageEmbed } = require('discord.js');

client.on("ready", async () => {
    console.log(`${client.user.tag} is up and ready to go!`);
    const res = await fetch(`https://mcapi.us/server/status?ip=${config.ipAddress}${config.port ? `&port=${config.port}` : ''}`);
    const body = await res.json();
    client.user.setActivity(`${body.players.now}/${body.players.max} players`, { type: 'WATCHING' });
    
});

client.on('messageCreate', async (message) => {

    if (message.content === `${config.prefix}stats`) {

        // Fetch statistics from mcapi.us
        const res = await fetch(`https://mcapi.us/server/status?ip=${config.ipAddress}${config.port ? `&port=${config.port}` : ''}`);
        if (!res) return message.channel.send(`Looks like your server is not reachable... Please verify it's online and it isn't blocking access!`);
        // Parse the mcapi.us response
        const body = await res.json();

        const embed = new MessageEmbed()
            .setAuthor(config.ipAddress)
            .addField("Version", body.server.name)
            .addField("Connected", `${body.players.now} players`)
            .addField("Maximum", `${body.players.max} players`)
            .addField("Status", (body.online ? "Online" : "Offline"))
            .setColor("RANDOM");

        message.channel.send({ content: `:chart_with_upwards_trend: Here are the stats for **${config.ipAddress}**:`, embeds: [embed] });
    }

});