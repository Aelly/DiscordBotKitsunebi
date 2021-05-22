import { Planning } from './../../class/ModifiableMessage/planning';
import { CommandHandler } from './i-command-handler';
import { injectable } from "inversify";
import { Message } from 'discord.js';
import StringUtils from '../../Utils/StringUtils';
import { TYPES } from '../../types';
import container from '../../inversify.config';
import { Bot } from '../../bot';

@injectable()
export class PlanningHandler implements CommandHandler{
    commandName: string = "planning";

    public detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }
    public async sendResponse(message: Message): Promise<void> {
        let bot = container.get<Bot>(TYPES.Bot);

        const planning : Planning = new Planning();
        planning.message = await message.channel.send(await planning.constructMessageEmbed());
        bot.mofiableMessages.push(planning);
        await planning.addReaction();
    }

}