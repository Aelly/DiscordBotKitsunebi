import { FFXIVLodestoneAPI } from "./../Api/FFXIVLodestone/ffxiv-lodestone-api";
import { Message } from "discord.js";
import StringUtils from "../../Utils/StringUtils";
import { CommandHandler } from "./i-command-handler";
import { TYPES } from "../../types";
import container from "../../inversify.config";

export class PortraitHandler implements CommandHandler {
    commandName: string = "portrait";

    lodestoneAPI : FFXIVLodestoneAPI;

    constructor() {
        this.lodestoneAPI = container.get<FFXIVLodestoneAPI>(TYPES.LodestoneAPI);
    }

    public detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }

    public async sendResponse(message: Message): Promise<void> {
        const characterNameToSearch = StringUtils.getCommandUniqueArgument(message.content);

        if(characterNameToSearch == "")
        {
            console.log("Send usage");
            return;
        }

        const portraitURL : string = await this.lodestoneAPI.getPortrait(characterNameToSearch);
        message.channel.send(portraitURL);
    }
}
