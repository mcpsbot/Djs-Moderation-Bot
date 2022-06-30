const db = require("quick.db");

module.exports = {
  config: {
    name: "delcc",
    aliases: ["d-cmd"],
    usage: "delcmd <cmd_name>",
    description: "Delete the custom commannd",
    category: "admin",
  },

  run: async (bot, message, args) => {
    const cmdname = args[0];

    if (!cmdname) {
      return message.channel.send(
        ":x: Gimm me commmand name, `delcmd <cmd_name>`"
      );
    }

    const database = db.fetch(`cmd_${message.guild.id}`);

    if (database) {
      const data = database.find((x) => x.name === cmdname.toLowerCase());

      if (!data) {
        return message.channel.send(":x: Unable to find this command.");
      }

      const value = database.indexOf(data);
      delete database[value];

      const filter = database.filter((x) => {
        return x != null && x != "";
      });

      db.set(`cmd_${message.guild.id}`, filter);
      return message.channel.send(`Deleted the **${cmdname}** Command!`);
    } else {
      return message.channel.send(
        ":x: Sorry but i am unable to find that command!"
      );
    }
  },
};
