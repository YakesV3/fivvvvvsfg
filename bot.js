const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db','croxydb','wio.db');
const http = require('http');
const ms = require("ms");
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

var prefix = ayarlar.prefix



client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'aktif') {
    msg.channel.send('https://cdn.discordapp.com/attachments/1023941832448692344/1029142123016101938/Goat_Rp_Sunucu_Aktif_GIF.gif');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'aktif') {
    msg.channel.send('@here');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'bakım') {
    msg.channel.send('https://cdn.discordapp.com/attachments/1023941832448692344/1029142123427147846/Goat_RP_Sunucu_Bakmda_GIF.gif');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'bakım') {
    msg.channel.send('@here');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'restart') {
    msg.channel.send('https://media.discordapp.net/attachments/1002280973880262726/1025724795041628220/Goat_RP_Logo_Animasyon_GIF.gif');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'restart') {
    msg.channel.send('@here');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'kayıt') {
    msg.channel.send('<@&1002280811086741576>');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'eva') {
    msg.channel.send('(AFK) Aşko erp yapıyorum busssy bussy!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'kqdirh') {
    msg.channel.send('(AFK) Hortumu Getirin Garı yanıyo Hamına');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'thevektors') {
    msg.channel.send('(AFK) ERP Yapanlara Spec Atıyor');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'benita') {
    msg.channel.send('(AFK) Ejderhalarını Besliyor');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'gabriel') {
    msg.channel.send('(AFK) Çingenem Dinleyerek yanlüyürük amünüyüm');
  }
});


//-------------------- Otorol Sistemi --------------------//

client.on('guildMemberAdd', member => {
  // Rol
  let rol = "1002280962710831325"

  // Sunucuya Giren Kişiye Rol Verme
  member.roles.add(rol)

  // Hg Mesajı
  client.channels.cache.get('1024766353887998024').send(`${member} **Kişisine <@&${rol}> Rolünü Verdim, Hoşgeldin.**`)
});

//-------------------- Otorol Sistemi Son --------------------//



//----------------------- Bot Ses Kanalı Aktif Tutma ------------------------\\

client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get("1002281074740699316");
  console.log("**Bot Ses Kanalına bağlandı !**");
  if (botVoiceChannel)
    botVoiceChannel
      .join()
      .catch(err => console.error("**Bot ses kanalına bağlanamadı !**"));
});

//----------------------- Bot Ses Kanalı Aktif Tutma Son ------------------------\\


//AtinaRP Discord
client.on('guildMemberAdd' , member => {
  const giriscıkıs = member.guild.channels.cache.find(channel => channel.id === '1002281389850370118');
  giriscıkıs.send(`**Aramıza Hoş geldin, Kayıt olmak için Kayıt Bekleme Odasına Geçip Bekleyebilirsin (Kayıt Komudu .kayıt)**, ${member}`);
});

client.on('guildMemberRemove' , member => {
  const giriscıkıs = member.guild.channels.cache.find(channel => channel.id === '1024766353887998024');
  giriscıkıs.send(`**Keşke Gitmeseydin Kral**, ${member}`);
});

//AtinaRP Bitiş


//Burdan aşşası acılış

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('ready', () => {

  // Oynuyor Kısmı

      var actvs = [
        `Goat RolePlay ❤️ KqdirH`,
        `Goat RolePlay ❤️ KqdirH`,
        `Goat RolePlay ❤️ KqdirH`
    ];

    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
    }, 1500);


      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');

    });


client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token);
