const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "poll",
    aliases: [""],
    description: "Start a simple poll in the server",
    category: "utility",
    usage: "poll <question>",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send(
        "**You Do Not Have Sufficient Permissions! - [MANAGE_GUILD]**"
      );
    }

    if (!args[0]) {
      return message.channel.send("**Please Enter A Query!**");
    }

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Poll For ${message.guild.name} Sever`)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setDescription(args.join(" "));
    const msg = await message.channel.send(embed);

    await msg.react("✅");
    await msg.react("❌");

    message.delete({ timeout: 1000 });
  },
};
