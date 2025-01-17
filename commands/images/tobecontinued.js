const Discord = require("discord.js");
const { AME_API } = require("../../config.json");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(AME_API);

module.exports = {
  config: {
    name: "tobecontinued",
    aliases: ["tbc"],
    category: "images",
    description: "Shows A ToBeContinued Image",
    usage: "[username | nickname | mention | ID] (optional)",
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
    const buffer = await AmeAPI.generate("tobecontinued", {
      url: user.user.displayAvatarURL({ format: "png", size: 512 }),
    });
    const attachment = new Discord.MessageAttachment(
      buffer,
      "tobecontinued.png"
    );
    m.delete({ timeout: 5000 });
    message.channel.send(attachment);
  },
};
