const Discord = require("discord.js");
const { AME_API } = require("../../config.json");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(AME_API);

module.exports = {
  config: {
    name: "wasted",
    noalias: [""],
    category: "images",
    description: "Shows Wastage of A User",
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
    const buffer = await AmeAPI.generate("wasted", {
      url: user.user.displayAvatarURL({ format: "png", size: 512 }),
    });
    const attachment = new Discord.MessageAttachment(buffer, "wasted.png");
    m.delete({ timeout: 5000 });
    message.channel.send(attachment);
  },
};
