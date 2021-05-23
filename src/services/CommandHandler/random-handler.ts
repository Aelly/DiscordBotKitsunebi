import { Message } from 'discord.js';
import StringUtils from '../../Utils/StringUtils';
import { CommandHandler } from './i-command-handler';

export class RandomHandler implements CommandHandler{
    commandName: string = "rand";

    detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }
    
    async sendResponse(message: Message): Promise<void> {
        const rdnInt = Math.floor(Math.random() * 100) + 1;
        await message.reply(rdnInt);
    }

}