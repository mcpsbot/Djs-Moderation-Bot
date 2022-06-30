const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "uptime",
    description: "Shows Uptime of bot",
    aliases: ["up"],
    category: "utility",
    usage: " ",
  },
  run: async (bot, message, args) => {
    const days = Math.floor(bot.uptime / 86400000);
    const hours = Math.floor(bot.uptime / 3600000) % 24;
    const minutes = Math.floor(bot.uptime / 60000) % 60;
    const seconds = Math.floor(bot.uptime / 1000) % 60;

    const embed = new MessageEmbed()
      .setTitle("Uptime")
      .setColor("RANDOM")
      .setDescription(
        `I am Online from **${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`
      )
      .setThumbnail(bot.user.displayAvatarURL())
      .setFooter(message.guild.name, message.guild.iconURL())
      .setAuthor(bot.user.username, bot.user.displayAvatarURL());
    message.channel.send(embed);
  },
};
