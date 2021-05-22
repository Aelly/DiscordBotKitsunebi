import { PlanningHandler } from './CommandHandler/planning-handler';
import { EventHandler } from './CommandHandler/event-handler';
import { CommandHandler } from "./CommandHandler/i-command-handler";
import { HelpHandler } from "./CommandHandler/help-handler";
import { NoticeHandler } from "./CommandHandler/notice-handler";
import { Message } from "discord.js";
import { injectable } from "inversify";

@injectable()
export class MessageResponder {
    async handle(message: Message): Promise<void> {
        // Define the handler to test
        let handler: CommandHandler[] = [];
        handler.push(new HelpHandler());
        handler.push(new NoticeHandler());
        handler.push(new EventHandler());
        handler.push(new PlanningHandler());

        // Test the message on each handler and send the corresponding response if needed
        handler.forEach(function (handler: CommandHandler) {
            if (handler.detectIfType(message))
                handler.sendResponse(message);
        });
    }
}
