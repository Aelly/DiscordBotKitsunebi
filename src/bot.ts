import { Client, Message, MessageReaction, User } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { MessageResponder } from "./services/message-responder";

import StringUtils from "./Utils/StringUtils";
import { ModifiableMessage } from "./class/ModifiableMessage/modifiable-message";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private messageResponder: MessageResponder;

    public readonly prefix: string;
    public readonly embedColor: string;

    public modifiableMessages: ModifiableMessage[];

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.Prefix) prefix: string,
        @inject(TYPES.EmbedColor) embedColor: string,
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder
    ) {
        this.client = client;
        this.token = token;
        this.prefix = prefix;
        this.embedColor = embedColor;
        this.messageResponder = messageResponder;

        this.modifiableMessages = [];
    }

    public listen(): Promise<string> {
        // Handling of users message
        this.client.on("message", async (message: Message) => {
            // We only look message from user starting with this bot prefix
            if (message.author.bot || !StringUtils.isBotCommand(message.content)) return;
            // Handling by the MessageResponder and the CommandHandler
            this.messageResponder.handle(message);
        });

        // Handling of messageReactionAdd
        this.client.on("messageReactionAdd", async (messageReaction: MessageReaction, user: User) => {
            // We only look for user's reaction on bot's message
            const message: Message = messageReaction.message;
            if (!message.author.bot || user.bot) return;
            // Detect which message the reaction was add to and let the specific type handle it
            for (let ge of this.modifiableMessages) {
                if (ge.message == message) await ge.addUserToRole(user, messageReaction);
            }
        });

        // Handling of messageReactionRemove
        this.client.on("messageReactionRemove", async (messageReaction: MessageReaction, user: User) => {
            const message: Message = messageReaction.message;
            if (!message.author.bot || user.bot) return;

            for (let ge of this.modifiableMessages) {
                if (ge.message == message) await ge.removeUserToRole(user, messageReaction);
            }
        });

        // Handling of message deleted
        this.client.on("messageDelete", async (deletedMessage: Message) => {
            if (deletedMessage.author.bot) {

                for (let modifiableMessage of this.modifiableMessages) {
                    if (modifiableMessage.message == deletedMessage) {
                        const index = this.modifiableMessages.indexOf(modifiableMessage, 0);
                        if (index > -1) {
                            this.modifiableMessages.splice(index, 1);
                        }
                    }
                }
            }
        });

        return this.client.login(this.token);
    }
}
