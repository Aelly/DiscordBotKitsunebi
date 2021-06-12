import { Message } from "discord.js";
import { injectable } from "inversify";
import { PortraitHandler } from "./CommandHandler/portrait-handler";
import { RandomHandler } from "./CommandHandler/random-handler";
import { ClearHandler } from "./CommandHandler/clear-handler";
import { PlanningHandler } from "./CommandHandler/planning-handler";
import { EventHandler } from "./CommandHandler/event-handler";
import { CommandHandler } from "./CommandHandler/i-command-handler";
import { HelpHandler } from "./CommandHandler/help-handler";
import { NoticeHandler } from "./CommandHandler/notice-handler";
import { CharacInfoHandler } from "./CommandHandler/charac-info-handler";
import { ParseHandler } from "./CommandHandler/parse-handler";

@injectable()
export class MessageResponder {
    private handlers: CommandHandler[] = [];

    constructor() {
        // Define the handler to test
        this.handlers.push(new HelpHandler());
        this.handlers.push(new NoticeHandler());
        this.handlers.push(new EventHandler());
        this.handlers.push(new PlanningHandler());
        this.handlers.push(new ClearHandler());
        this.handlers.push(new RandomHandler());
        this.handlers.push(new PortraitHandler());
        this.handlers.push(new CharacInfoHandler());
        this.handlers.push(new ParseHandler());
    }

    async handle(message: Message): Promise<void> {
        // Test the message on each handler and send the corresponding response if needed
        for (let handler of this.handlers) {
            if (handler.detectIfType(message)) {
                handler.sendResponse(message);
                // Delete the user message with the command
                try {
                    await message.delete();
                } catch (err) {
                } finally {
                    break;
                }
            }
        }
    }
}
