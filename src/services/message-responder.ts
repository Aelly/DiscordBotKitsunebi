import { RandomHandler } from "./CommandHandler/random-handler";
import { ClearHandler } from "./CommandHandler/clear-handler";
import { PlanningHandler } from "./CommandHandler/planning-handler";
import { EventHandler } from "./CommandHandler/event-handler";
import { CommandHandler } from "./CommandHandler/i-command-handler";
import { HelpHandler } from "./CommandHandler/help-handler";
import { NoticeHandler } from "./CommandHandler/notice-handler";
import { Message } from "discord.js";
import { injectable } from "inversify";

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
