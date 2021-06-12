import { TYPES } from "./../../types";
import { CommandHandler } from "./i-command-handler";
import {  injectable } from "inversify";
import StringUtils from "../../Utils/stringUtils";
import { Message, MessageEmbed } from "discord.js";
import container from "../../inversify.config";
import { Bot } from "../../bot";

export class NoticeHandler implements CommandHandler {
    commandName: string = "notice";

    public detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
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
