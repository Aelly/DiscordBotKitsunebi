import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { Client } from "discord.js";
import { MessageResponder } from "./services/message-responder";
import { NoticeHandler } from "./services/CommandHandler/notice-handler";
import { HelpHandler } from "./services/CommandHandler/help-handler";
import { EventHandler } from "./services/CommandHandler/event-handler";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.Prefix).toConstantValue(process.env.PREFIX);
container
    .bind<string>(TYPES.EmbedColor)
    .toConstantValue(process.env.EMBED_COLOR);

container
    .bind<MessageResponder>(TYPES.MessageResponder)
    .to(MessageResponder)
    .inSingletonScope();
container
    .bind<NoticeHandler>(TYPES.NoticeHandler)
    .to(NoticeHandler)
    .inSingletonScope();
container
    .bind<HelpHandler>(TYPES.HelpHandler)
    .to(HelpHandler)
    .inSingletonScope();
container
    .bind<EventHandler>(TYPES.EventHandler)
    .to(EventHandler)
    .inSingletonScope();

export default container;
