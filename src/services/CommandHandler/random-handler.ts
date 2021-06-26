import { Message } from 'discord.js';
import { AbstractCommandHandler } from './abstract-command-handler';

export class RandomHandler extends AbstractCommandHandler{
    constructor(){
        super("rand");
    }
    
    async sendResponse(message: Message): Promise<void> {
        const rdnInt = Math.floor(Math.random() * 100) + 1;
        await message.reply(rdnInt);
    }

}