//Bot criado por:Leonel Miguins
//Nao esqueça de por o bot como administrador no grupo
//envie /start apara iniciar o bot

//requerindo o telegram bot api
const { from } = require('form-data');
const telegramBot = require('node-telegram-bot-api')

//coloque o token do seu bot que voce pegou no botfather
const token = '5125492606:AAEii97ydGkPkdvlL9PaYLRbUiZNH82K5C0';

//criando o bot
const bot = new telegramBot(token , { polling : true} )

//deixando o bot na espera de menssagens
bot.on('text',(msg) => {
    
    //criando variaveis
    var chatId = msg.chat.id;

    //capturando quando o usuario digitar /start
    if(msg.text == "/start"){
     
        //enviando a menssagem com as opçoes de comandos
        bot.sendMessage(chatId, comandos)
           
    }
    
    if(msg.text == "/imagem"){
     
            bot.sendMessage(chatId, "Aguarde um pouco... ⏳")
            //enviando foto com legenda
            bot.sendPhoto(chatId, 'pexels-jess-loiterton.jpg', {caption: 'A natureza não faz nada em vão. A natureza fez o homem feliz e bom, mas a sociedade deprava-o e torna-o miserável. Cada dia a natureza produz o suficiente para nossa carência. Se cada um tomasse o que lhe fosse necessário, não havia pobreza no mundo e ninguém morreria de fome.'})
    }
    
    if(msg.text == "/audio"){

            bot.sendMessage(chatId, "Aguarde um pouco... ⏳")
            //enviando audio com legenda
            bot.sendAudio(chatId, 'Put Your Head On My Shoulder.mp3', {caption: ' Put Your Head on My Shoulder é uma canção escrita pelo cantor e compositor canadense-americano Paul Anka . A versão de Anka foi gravada em agosto de 1958, três semanas antes de ele gravar seu no. 1 hit " Lonely Boy ", e foi lançado como single em 17 de agosto de 1959'});
    
    }

    if(msg.text == "/sobre"){

            bot.sendMessage(chatId, sobre)
        
}

    
    if(msg.text.includes("http")){

    //função para kickar do grupo usuarios que enviarem links
    //kickando menbro que enviou link
    bot.kickChatMember(chatId, msg.from.id);
    //mostrando uma menssagem de quem foi removido
    bot.sendMessage(chatId, "O usuario "+msg.from.first_name+" foi removido pois infligiu as regras enviando links!")    

    }

    
    if(msg.text == "/menu")

    //criando menu com botoes
    bot.sendMessage(msg.chat.id, "Menu do bot:" ,{"reply_markup":{
    "keyboard": [["/imagem", "/audio", "/local","/sobre"],["/menu","/ban","/scan"],["/mudarImagemGrupo"]]    
    }});

    if (msg.text == "/local") {

        //enviando localizaçao com a latitude e longitude
        bot.sendLocation(msg.chat.id, 38.898218, -77.036388);
        //enviando uma menssagem com as informaçoes do endereço
        bot.sendMessage(msg.chat.id, "Esta e a Endereço exato da Casa Branca!\nCordenadas: 38.898218, -77.036388\nEdereço:Pennsylvania Avenue NW, Washington, DC 20502, EUA");

    }

    if(msg.text == "/mudarImagemGrupo"){

        //funçao para trocar a foto do grupo de form aleatoria
        //criando array com o endereço de todas as imagens dentro da pasta img
        var foto = ["f-01.jpg","f-02.jpg","f-03.jpg","f-04.jpg","f-05.jpg"];
        //chamando a funçao para gerar numeros aleatorios
        var numero = getRandomInt(0, 5);
        //menssagem para o usuario aguardar..
        bot.sendMessage(chatId, "Aguarde um pouco... ⏳")
        //alterando a imagem do grupo
        bot.setChatPhoto(chatId, foto[numero])

    }

    if(msg.text == "/scan"){
       //funçao para scanear os dados de uma messagem/usuario
       //pegando id da menssagem
       var msgId = msg.reply_to_message.message_id;
       //pegando o nome do usuario
       var name = msg.reply_to_message.from.first_name;
       //pegando o id do usuario
       var id = msg.reply_to_message.from.id;
       //verificando se e um bot
       var Userbot = msg.reply_to_message.from.is_bot;
       //envaindo dados capiturados por uma menssagem
       bot.sendMessage(chatId, "Id da menssagem: "+msgId+"\nUsuario: "+name+"\nId do usuario: "+id+"\nBot: "+Userbot)

    }

    if(msg.text == "/ban"){

    //função para kickar do grupo usuarios que enviarem links
    //kickando menbro que enviou link
    bot.kickChatMember(chatId, msg.reply_to_message.from.id);
    //mostrando uma menssagem de quem foi removido
    bot.sendMessage(chatId, "O usuario "+msg.reply_to_message.from.first_name+" foi removido!")    
    
    }

    if(msg.text == "/rest"){
    
    //restringindo membro de mandar menssagens
    bot.restrictChatMember(chatId, msg.reply_to_message.from.id,{can_send_messages: false},)
    //enviando messagem
    bot.sendMessage(chatId, msg.reply_to_message.from.first_name+" foi restringindo do chat e nao pode mandar menssagens!\npara reverter use /unrest")
     
    }

    if(msg.text == "/unrest"){
    //permitindo que o membro restrito volte a mandar menssagens
    bot.restrictChatMember(chatId, msg.reply_to_message.from.id, {can_send_messages: true })
    //enviando messagem
    bot.sendMessage(chatId, msg.reply_to_message.from.first_name+" foi permitido enviar menssagens no chat!")
         
    }

 
    console.log(msg);
    
} 

);

var sobre =
"\n"+
"# Posso kickar membros que enviam links\n"+
"# Posso enviar midias \n"+
"# Criar menus com botoes \n"+
"# Envio localizaçao via Google Maps \n"+
"# Mudar a imagem do grupo de forma aleatoria \n"+
"# Pegar dados do usuario por menssagem \n"+
"# Banir membros"+
"# Restringir membros de mandar menssagem";

var comandos =
"Ola esses sao meus comandos: \n"+
"📷 /imagem - Envio uma imagem. \n"+
"🎵 /audio - Envio um audio. \n"+
"🤖 /sobre - Veja tudo o que eu posso fazer.\n"+
"🌍 /local - localizaçao via Google Maps \n"+
"📷 /mudarImagemGrupo - mudar a imagem do grupo para uma aleatoria. \n"+
"👤 /scan - Pegar dados dos usuarios \n"+
"⛔️ /ban - banir membro";

//funçao para gerar valores aleatorios entre 2 numeros inteiros:
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }