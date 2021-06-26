import { TYPES } from "./../../types";
import StringUtils from "../../Utils/stringUtils";
import { Message, MessageEmbed } from "discord.js";
import container from "../../inversify.config";
import { Bot } from "../../bot";
import { AbstractCommandHandler } from "./abstract-command-handler";

export class NoticeHandler extends AbstractCommandHandler {
    constructor(){
        super("notice");
    }

    public sendResponse(message: Message): void {
        let bot = container.get<Bot>(TYPES.Bot);
        
        try{
            const parameters = StringUtils.getCommandArgumentTitleDescription(
                message.content
            );
    
            const messageEmbed: MessageEmbed = new MessageEmbed()
                .setTitle(parameters[0])
                .setDescription(parameters[1])
                .setColor(bot.embedColor);
    
            message.channel.send(messageEmbed);
        }
        catch(error)
        {
            this.sendResponseError(message);
        }
    }

    private sendResponseError(message : Message) : void{
        message.channel.send("Paramètre invalide : !notice Titre - Description");
    }
}
