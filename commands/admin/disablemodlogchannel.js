const db = require("old-wio.db");

module.exports = {
  config: {
    name: "disablemodlogchannel",
    aliases: ["dmc", "disablem", "disablemodlog"],
    category: "admin",
    description: "Disables Server Modlog Channel",
    usage: "[channel name | channel mention | channel ID]",
    accessableby: "Administrators",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      );
    }

    try {
      const a = db.fetch(`modlog_${message.guild.id}`);

      if (!a) {
        return message.channel.send(
          "**There Is No Modlog Channel Set To Disable!**"
        );
      } else {
        const channel = message.guild.channels.cache.get(a);
        bot.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Welcome Channel Disabled!**");
        db.delete(`modlog_${message.guild.id}`);

        message.channel.send(
          `**Modlog Channel Has Been Successfully Disabled in \`${channel.name}\`**`
        );
      }
      return;
    } catch {
      return message.channel.send(
        "**Error - `Missing Permissions or Channel Doesn't Exist`**"
      );
    }
  },
};
