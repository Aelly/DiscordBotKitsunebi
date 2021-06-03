import "reflect-metadata";
import { FFXIVLodestoneAPICalls } from "./services/Api/FFXIVLodestone/ffxiv-lodestone-api-calls";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { Client } from "discord.js";
import { MessageResponder } from "./services/message-responder";

let container = new Container();

container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.Prefix).toConstantValue(process.env.PREFIX);
container.bind<string>(TYPES.EmbedColor).toConstantValue(process.env.EMBED_COLOR);
container.bind<string>(TYPES.LodestoneApiKey).toConstantValue(process.env.LODESTONE_API_KEY);

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());

container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();

container.bind<FFXIVLodestoneAPICalls>(TYPES.LodestoneAPI).to(FFXIVLodestoneAPICalls).inSingletonScope();

export default container;
