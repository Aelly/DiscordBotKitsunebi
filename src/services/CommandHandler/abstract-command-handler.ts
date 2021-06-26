import { Message } from "discord.js";
import StringUtils from "../../Utils/stringUtils";
import { CommandHandler } from "./i-command-handler";

export abstract class AbstractCommandHandler implements CommandHandler{
    commandName: string;

    constructor(commandName : string){
        this.commandName = commandName;
    }

    detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }

    abstract sendResponse(message: Message): void

}