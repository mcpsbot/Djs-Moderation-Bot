const Discord = require("discord.js");
const config = require("../../config.json");
const Amebot = require("amethyste-api");
const AmeAPI = new Amebot(config.AME_API);

module.exports = {
  config: {
    name: "triggered",
    description: "Editing image and send TRIGGERED one!",
    aliases: [""],
    usage: "",
    category: "images",
  },
  run: async (bot, message, args) => {
    const user =
      (await message.mentions.members.first()) ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (r) =>
          r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    const m = await message.channel.send("**Please Wait...**");
    const buffer = await AmeAPI.generate("triggered", {
      url: user.user.displayAvatarURL({ format: "png", size: 2048 }),
    });
    const attachment = new Discord.MessageAttachment(buffer, "triggered.gif");
    m.delete({ timeout: 5000 });
    message.channel.send(attachment);
  },
};
