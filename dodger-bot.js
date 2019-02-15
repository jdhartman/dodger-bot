require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.get(process.env.GENERAL_ID).fetchMessages().then(messages => {
        var filterMessages = messages.filter(message => {

        	return (message.author['username'] === process.argv[2] &&
        		
        		(message.attachments && message.attachments.size > 0 && 
        			(message.attachments.array()[0].url.startsWith("https://cdn.discordapp.com/attachments") || 
        			message.attachments.array()[0].url.endsWith("jpg") || 
        			message.attachments.array()[0].url.endsWith("JPG") ||
        			message.attachments.array()[0].url.endsWith("png"))) || 
				
        		(message.content.endsWith("jpg") || 
        			message.content.endsWith("JPG") || 
        			message.content.endsWith("png")) 
        		);
        });

        filterMessages.forEach(message => {
        	message.delete();
        })
      })
      .catch(err => {
        console.log('Error while doing Bulk Delete');
        console.log(err);
      });
});

client.on('message', msg => {
  
  msg.channel.fetchMessages().then(messages => {
        var filterMessages = messages.filter(message => {
        	return (message.author['username'] === process.argv[2] &&
        		
        		(message.attachments && message.attachments.size > 0 && 
        			(message.attachments.array()[0].url.startsWith("https://cdn.discordapp.com/attachments") || 
        			message.attachments.array()[0].url.endsWith("jpg") || 
        			message.attachments.array()[0].url.endsWith("JPG") ||
        			message.attachments.array()[0].url.endsWith("png"))) || 
				
        		(message.content.endsWith("jpg") || 
        			message.content.endsWith("JPG") || 
        			message.content.endsWith("png")) 
        		);
        });
        if (filterMessages.size > 0) {
        	if (msg.author['username'] === process.argv[2]) {
			    msg.reply("NO PICTURES FROM YOU").then(reply => {
			    	setTimeout(function(){
			    		reply.delete();
			    	}, 2000);
			    });
			  }
        }
        msg.channel.bulkDelete(filterMessages);
      })
      .catch(err => {
        console.log('Error while doing Bulk Delete');
        console.log(err);
      });
});


if(!process.argv[2]) {
	console.log("Please enter Discord username you would like to delete:)");
	process.exit();
}

client.login(process.env.BOT_TOKEN);