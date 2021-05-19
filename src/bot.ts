import { GuildEvent } from "./class/guild-event";
import { Client, Message, MessageReaction, User } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { MessageResponder } from "./services/message-responder";

import StringUtils from "./Utils/StringUtils";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private messageResponder: MessageResponder;

    public readonly prefix: string;
    public readonly embedColor: string;

    public guildEvents: GuildEvent[];

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

        this.guildEvents = [];
    }

    public listen(): Promise<string> {
        // Handling of users message
        this.client.on("message", (message: Message) => {
            // We only look message from user starting with this bot prefix
            if (message.author.bot || !StringUtils.isBotCommand(message.content)) return;
            // Handling by the MessageResponder and the CommandHandler
            this.messageResponder.handle(message);
        });

        // Handling of messageReactionAdd
        this.client.on("messageReactionAdd", (messageReaction: MessageReaction, user: User) => {
            // We only look for user's reaction on bot's message 
            const message: Message = messageReaction.message;
            if (!message.author.bot || user.bot) return;

            this.guildEvents.forEach(function (ge: GuildEvent) {
                if (ge.message == message) {
                    console.log("Message founded");
                }
            });
        });

        return this.client.login(this.token);
    }
}
