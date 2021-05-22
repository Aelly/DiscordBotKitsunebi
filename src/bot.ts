import { GuildEvent } from "./class/ModifiableMessage/guild-event";
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

    // TODO Interface pour permettre de faire une gestion de tous les types de modifiable
    public mofiableMessages: ModifiableMessage[];

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

        this.mofiableMessages = [];
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
        //  TODO : Handler à part ?
        this.client.on("messageReactionAdd", async (messageReaction: MessageReaction, user: User) => {
            // We only look for user's reaction on bot's message
            const message: Message = messageReaction.message;
            if (!message.author.bot || user.bot) return;

            // TODO : Meilleur façon de trouver l'event qui nous interesse
            for (let ge of this.mofiableMessages) {
                if (ge.message == message) await ge.addUserToRole(user, messageReaction);
            }
        });

        this.client.on("messageReactionRemove", async (messageReaction: MessageReaction, user: User) => {
            const message: Message = messageReaction.message;
            if (!message.author.bot || user.bot) return;

            for (let ge of this.mofiableMessages) {
                if (ge.message == message) await ge.removeUserToRole(user, messageReaction);
            }
        });

        return this.client.login(this.token);
    }
}
