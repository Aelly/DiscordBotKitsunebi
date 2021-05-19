import { Message } from "discord.js";

export interface ICommandHandler{
    commandName : string;
    detectIfType(message : Message) : boolean;
    sendResponse(message : Message) : void;
}