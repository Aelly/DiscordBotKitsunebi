import { CommandHandler } from "./i-command-handler";
import { Message } from "discord.js";
import { injectable } from "inversify";
import StringUtils from "../../Utils/StringUtils";

@injectable()
export class HelpHandler implements CommandHandler {
    commandName: string = "help";

    detectIfType(message: Message): boolean {
        return StringUtils.getCommandName(message.content) == this.commandName;
    }

    public sendResponse(message: Message): void {
        let response: string = "\n";
        response += "- !notice Titre - Description\n";
        response += "- !event Titre - Description\n";
        response += "- !planning\n";

        message.reply(response);
    }
}
