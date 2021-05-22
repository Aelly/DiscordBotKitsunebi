import { Message } from "discord.js";

export interface CommandHandler{
    commandName : string;
    detectIfType(message : Message) : boolean;
    sendResponse(message : Message) : void;
}