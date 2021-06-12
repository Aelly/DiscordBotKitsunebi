import { Message } from 'discord.js';
import StringUtils from '../../Utils/stringUtils';
import { FFXIVLodestoneAPIUtils } from '../Api/FFXIVLodestone/ffxiv-lodestone-api-utils';
import { CommandHandler } from './i-command-handler';

export class CardHandler implements CommandHandler{
    commandName: string = "card";

    // TODO Abstract class for this function always defined
    public detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }

    public async sendResponse(message: Message): Promise<void> {
        const characterNameToSearch = StringUtils.getCommandUniqueArgument(message.content);

        if(characterNameToSearch == "")
        {
            await message.channel.send("J'ai besoin du nom du personnage (ex: !card Rhuya Lihzeh");
            return;
        }

        // The API calls can take a few seconds so we send a waiting message
        const waitingMessage : Message = await message.channel.send("Récupération des informations...");

        const response = await FFXIVLodestoneAPIUtils.getCharacterCard(characterNameToSearch);

        waitingMessage.delete();
        message.channel.send(response);
    }

}