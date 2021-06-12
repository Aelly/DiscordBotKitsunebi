import {  Message,  StringResolvable } from "discord.js";
import StringUtils from "../../Utils/stringUtils";
import { CommandHandler } from "./i-command-handler";
import { FFXIVLodestoneAPIUtils } from "../Api/FFXIVLodestone/ffxiv-lodestone-api-utils";

export class CharacInfoHandler implements CommandHandler {
    commandName: string = "character";

    public detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }

    public async sendResponse(message: Message): Promise<void> {
        const characterNameToSearch = StringUtils.getCommandUniqueArgument(message.content);

        if(characterNameToSearch == "")
        {
            await message.channel.send("J'ai besoin du nom du personnage (ex: !character Rhuya Lihzeh");
            return;
        }

        // The API calls can take a few seconds so we send a waiting message
        const waitingMessage : Message = await message.channel.send("Récupération des informations...");

        const response : StringResolvable = await FFXIVLodestoneAPIUtils.getCharacterSheet(characterNameToSearch);

        waitingMessage.delete();
        message.channel.send(response);
    }
}
