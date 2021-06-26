import { Message, TextChannel } from "discord.js";
import StringUtils from "../../Utils/stringUtils";
import { AbstractCommandHandler } from "./abstract-command-handler";

export class ClearHandler extends AbstractCommandHandler {
    constructor() {
        super("clear");
    }

    async sendResponse(message: Message): Promise<void> {
        const arg: string = StringUtils.getCommandUniqueArgument(message.content);
        const amount = parseInt(arg);

        if (isNaN(amount)) {
            await message.reply("Paramètre invalide");
        } else if (amount <= 1 || amount >= 100) {
            await message.reply("Le paramètre doit être en 1 et 99");
        } else {
            (message.channel as TextChannel).bulkDelete(amount, true).catch((err) => {
                console.error(err);
                message.channel.send("Erreur lors de la suppression des messages !");
            });
        }
    }
}
