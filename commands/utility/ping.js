const Discord = require("discord.js");

module.exports = {
  config: {
    name: "ping",
    description: "Shows ping of the bot",
    category: "utility",
    usage: "ping",
    example: "ping",
    aliases: [""],
  },
  run: async (bot, message, args) => {
    const start = Date.now();

    message.channel
      .send({
        embed: {
          description: "🔍 I think my ping is high...",
          color: "RANDOM",
        },
      })
      .then((m) => {
        const end = Date.now();

        const embed = new Discord.MessageEmbed()
          .setAuthor("Pong!", message.author.avatarURL({ dynamic: true }))
          .addField("API Latency", Math.round(bot.ws.ping) + "ms", true)
          .addField("Message Latency", end - start + "ms")
          .setColor("RANDOM");
        m.edit(embed).catch((e) => message.channel.send(e));
      });
  },
};
