import { Message } from "discord.js";
import { AbstractCommandHandler } from "./abstract-command-handler";

export class HelpHandler extends AbstractCommandHandler {
    constructor() {
        super("help");
    }

    public sendResponse(message: Message): void {
        let response: string = "\n";
        response += "- !notice [Titre] - [Description]\n";
        response += "- !event [Titre] - [Description]\n";
        response += "- !planning\n";
        response += "- !clear [Nb message à supprimer]\n";
        response += "- !rand\n";
        response += "- !portrait [Nom du personnage]\n";
        response += "- !character [Nom du personnage]\n";
        response += "- !card [Nom du personnage]\n";
        response += "- !parse [Nom du personnage]\n";

        message.reply(response);
    }
}
