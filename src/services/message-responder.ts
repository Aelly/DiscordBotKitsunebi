import { EventHandler } from './CommandHandler/event-handler';
import { ICommandHandler } from "./CommandHandler/ICommandHandler";
import { HelpHandler } from "./CommandHandler/help-handler";
import { NoticeHandler } from "./CommandHandler/notice-handler";
import { Message } from "discord.js";
import { injectable } from "inversify";
import { TYPES } from "../types";
import container from "./../inversify.config";

@injectable()
export class MessageResponder {
    async handle(message: Message): Promise<void> {
        // Define the handler to test
        let handler: ICommandHandler[] = [];
        handler.push(container.get<HelpHandler>(TYPES.HelpHandler));
        handler.push(container.get<NoticeHandler>(TYPES.NoticeHandler));
        handler.push(container.get<EventHandler>(TYPES.EventHandler));

        // Test the message on each handler and send the corresponding response if needed
        handler.forEach(function (handler: ICommandHandler) {
            if (handler.detectIfType(message))
                handler.sendResponse(message);
        });
    }
}
