require('dotenv').config()
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

var channel = process.env.GENERAL_ID

if(process.argv[3] === "test") {
	channel = process.env.TEST_ID;
}

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);
    if(process.argv[2]) {
        
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
    }
});

client.on('message', msg => {
    if(process.argv[2]) {
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
    }

    if(msg.content === "!Louis" || msg.content === "!louis") {
        fs.readdir("./Louis", (err, files) => {
            var random_int = Math.floor(Math.random() * (files.length - 1)) + 1;
            var louispath = "./Louis/Louis_" + random_int + ".JPG";
            msg.channel.send("L O U I S :)", {
                files: [
                    louispath
                ]
            });
        });
    }
});


client.login(process.env.BOT_TOKEN);