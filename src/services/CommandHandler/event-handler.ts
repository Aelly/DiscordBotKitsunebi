import { GuildEvent } from "./../../class/guild-event";
import { ICommandHandler } from "./ICommandHandler";
import { injectable } from "inversify";
import { Message, MessageEmbed } from "discord.js";
import StringUtils from "../../Utils/StringUtils";
import container from "../../inversify.config";
import { Bot } from "../../bot";
import { TYPES } from "../../types";
import { Role } from "../../class/role";

@injectable()
export class EventHandler implements ICommandHandler {
    commandName: string = "event";

    public detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }

    public async sendResponse(message: Message): Promise<void> {
        let bot = container.get<Bot>(TYPES.Bot);

        try {
            // Get the parameters of the command
            const parameters = StringUtils.getCommandArgumentTitleDescription(message.content);
            // Prepare the corresponding embed message
            const messageEmbed: MessageEmbed = new MessageEmbed()
                .setTitle(parameters[0])
                .setDescription(parameters[1])
                .addField("Dps", "\u200b", true)
                .addField("Heal", "\u200b", true)
                .addField("Tank", "\u200b", true)
                .addField("Si besoin", "\u200b", true)
                .setColor(bot.embedColor);
            // Delete the user message with the command
            message.delete();
            // Send the prepared message and wait
            const botMessage: Message = await message.channel.send(messageEmbed);
            // Constrct the object that will allow us to track the message
            const guildEvent: GuildEvent = new GuildEvent(botMessage);
            bot.guildEvents.push(guildEvent);

            const serverId = botMessage.guild.id;

            // React to the message
            guildEvent.roles.forEach(async function (role: Role) {
                await botMessage
                    .react(role.getEmoteForCurrentServer(serverId))
                    .catch((err) => console.log(err));
            });
        } catch (error) {
            console.log(error);
            this.sendResponseError(message).then();
        }
    }

    private sendResponseError(message: Message) {
        return message.channel.send("Paramètre invalide: !event Titre - Description");
    }
}
