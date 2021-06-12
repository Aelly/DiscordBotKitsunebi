import { FFXIVLogsAPIUtils } from '../Api/FFXIVLog/ffxiv-log-api-utils';
import {  Message,  StringResolvable } from "discord.js";
import StringUtils from "../../Utils/stringUtils";
import { CommandHandler } from "./i-command-handler";

export class ParseHandler implements CommandHandler {
    commandName: string = "parse";

    public detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }

    public async sendResponse(message: Message): Promise<void> {
        const characterNameToSearch = StringUtils.getCommandUniqueArgument(message.content);

        if(characterNameToSearch == "")
        {
            await message.channel.send("J'ai besoin du nom du personnage (ex: !parse Rhuya Lihzeh");
            return;
        }

        // The API calls can take a few seconds so we send a waiting message
        const waitingMessage : Message = await message.channel.send("Récupération des informations...");

        const response : StringResolvable = await FFXIVLogsAPIUtils.getLogs(characterNameToSearch);

        waitingMessage.delete();
        message.channel.send(response);
    }
}
