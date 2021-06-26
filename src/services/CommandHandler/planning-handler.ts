import { Planning } from './../../class/ModifiableMessage/planning';
import { Message } from 'discord.js';
import { TYPES } from '../../types';
import container from '../../inversify.config';
import { Bot } from '../../bot';
import { AbstractCommandHandler } from './abstract-command-handler';

export class PlanningHandler extends AbstractCommandHandler{
    constructor(){
        super("planning");
    }
    
    public async sendResponse(message: Message): Promise<void> {
        let bot = container.get<Bot>(TYPES.Bot);

        const planning : Planning = new Planning();
        planning.message = await message.channel.send(await planning.constructMessageEmbed());
        bot.modifiableMessages.push(planning);
        await planning.addReaction();
    }

}