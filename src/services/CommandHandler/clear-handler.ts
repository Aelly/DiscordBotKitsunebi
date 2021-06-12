import { Message, TextChannel } from 'discord.js';
import StringUtils from '../../Utils/stringUtils';
import { CommandHandler } from './i-command-handler';

export class ClearHandler implements CommandHandler{
    commandName: string = "clear";

    detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }

    async sendResponse(message: Message): Promise<void> {
        const arg : string = StringUtils.getCommandUniqueArgument(message.content);
        const amount = parseInt(arg);

        if(isNaN(amount))
        {
            await message.reply("Paramètre invalide");
        }
        else if (amount <= 1 || amount >= 100) {
            await message.reply("Le paramètre doit être en 1 et 99")
        }
        else{
            (message.channel as TextChannel).bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('Erreur lors de la suppression des messages !');
              });
        }
    }

}