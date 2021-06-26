import { Message, StringResolvable } from "discord.js";
import StringUtils from "../../Utils/stringUtils";
import { FFXIVLodestoneAPIUtils } from "../Api/FFXIVLodestone/ffxiv-lodestone-api-utils";
import { AbstractCommandHandler } from "./abstract-command-handler";

export class CharacInfoHandler extends AbstractCommandHandler {
    constructor() {
        super("character");
    }

    public async sendResponse(message: Message): Promise<void> {
        const characterNameToSearch = StringUtils.getCommandUniqueArgument(message.content);

        if (characterNameToSearch == "") {
            await message.channel.send("J'ai besoin du nom du personnage (ex: !character Rhuya Lihzeh");
            return;
        }

        // The API calls can take a few seconds so we send a waiting message
        const waitingMessage: Message = await message.channel.send("Récupération des informations...");

        const response: StringResolvable = await FFXIVLodestoneAPIUtils.getCharacterSheet(characterNameToSearch);

        waitingMessage.delete();
        message.channel.send(response);
    }
}
