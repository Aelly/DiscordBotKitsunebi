import { GuildEvent } from "../../class/ModifiableMessage/guild-event";
import { CommandHandler } from "./i-command-handler";
import { injectable } from "inversify";
import { Message } from "discord.js";
import StringUtils from "../../Utils/stringUtils";
import container from "../../inversify.config";
import { Bot } from "../../bot";
import { TYPES } from "../../types";
import { AbstractCommandHandler } from "./abstract-command-handler";

export class EventHandler extends AbstractCommandHandler {
    constructor() {
        super("event");
    }

    public async sendResponse(message: Message): Promise<void> {
        let bot = container.get<Bot>(TYPES.Bot);

        try {
            // Get the parameters of the command
            const parameters = StringUtils.getCommandArgumentTitleDescription(message.content);
            // Construct the guildEvent and send the corresponding response in the channel
            const guildEvent: GuildEvent = new GuildEvent(parameters[0], parameters[1]);
            guildEvent.message = await message.channel.send(await guildEvent.constructMessageEmbed());
            bot.modifiableMessages.push(guildEvent);
            // Add reaction
            await guildEvent.addReaction();
        } catch (error) {
            console.log(error);
            await this.sendResponseError(message).then();
        }
    }

    private sendResponseError(message: Message) {
        return message.channel.send("Paramètre invalide: !event Titre - Description");
    }
}
