const {Client,Intents,Collection} = require('discord.js');
const client = new Client({intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS]})
const {token} = require('./config.json');
const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Collection();
var data = []
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command);
    data.push({name:command.name,description:command.description,option:command.options});
}

client.once('ready', async () =>{
    console.log("ready!")
    await client.guilds.cache.get('795474072372641802')?.commands.set(data)
});

client.on('interactionCreate',async interaction=>{
    if(!Interaction.isCommand()) return;
    if(!client.commands.has(Interaction.commandName)) return
    const command = client.commands.get(Interaction.commandName)
    try{
        await command.execute(interaction)
    }catch(error){
        console.log("error")

    }
})

client.login(token)