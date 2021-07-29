import { Bot } from "../bot";
import { TYPES } from "../types";
import container from "../inversify.config";

export default class StringUtils {
    public static readonly TITLE_DESCRIPTION_SEPARATOR = " - ";

    public static isBotCommand(message: string): boolean {
        let bot = container.get<Bot>(TYPES.Bot);
        return message.startsWith(bot.prefix);
    }
    public static getCommandName(message: string): string {
        let bot = container.get<Bot>(TYPES.Bot);
        return message.slice(bot.prefix.length).split(/ +/).shift().toLowerCase();
    }
    public static getCommandArgumentTitleDescription(message: string): [title: string, description: string] {
        let bot = container.get<Bot>(TYPES.Bot);
        // Remove the part we already know (prefix + command)
        //  and split to get the two part of the parameter
        const commandName = this.getCommandName(message);
        const part = message
            .slice(bot.prefix.length + commandName.length + 1)
            .split(StringUtils.TITLE_DESCRIPTION_SEPARATOR);

        if (part.length != 2) throw new Error("Paramètre invalide");

        // Récupère les deux parties de l'event
        const title = part[0];
        const description = part[1];

        return [title, description];
    }

    public static getCommandUniqueArgument(message: string): string {
        let bot = container.get<Bot>(TYPES.Bot);
        // Remove the part we already know (prefix + command)
        const commandName = this.getCommandName(message);
        const arg = message.slice(bot.prefix.length + commandName.length + 1);

        return arg;
    }

    public static SanitizeIphoneInput(input : string) : string{
        return input.replace('’', "'");
    }
}
