import "reflect-metadata";
import { FFXIVCardCalls } from './services/Api/ffxiv-card-calls';
import { FFXIVLodestoneAPICalls } from "./services/Api/FFXIVLodestone/Calls/ffxiv-lodestone-api-calls";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { Client } from "discord.js";
import { MessageResponder } from "./services/message-responder";
import FFXIVLogsAPIGraphql from "./services/Api/FFXIVLog/Calls/ffxiv-log-api-graphql";
import FFXIVLogApiRest from "./services/Api/FFXIVLog/Calls/ffxiv-log-api-rest";

let container = new Container();

container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.Prefix).toConstantValue(process.env.PREFIX);
container.bind<string>(TYPES.EmbedColor).toConstantValue(process.env.EMBED_COLOR);
container.bind<string>(TYPES.LodestoneApiKey).toConstantValue(process.env.LODESTONE_API_KEY);
container.bind<string>(TYPES.FFLogsClientID).toConstantValue(process.env.FFLOGS_CLIEND_ID);
container.bind<string>(TYPES.FFLogsClientSecret).toConstantValue(process.env.FFLOGS_CLIENT_SECRET);

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());

container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();

container.bind<FFXIVLodestoneAPICalls>(TYPES.LodestoneAPI).to(FFXIVLodestoneAPICalls).inSingletonScope();
container.bind<FFXIVLogsAPIGraphql>(TYPES.FFLogApi).to(FFXIVLogsAPIGraphql).inSingletonScope();
container.bind<FFXIVLogApiRest>(TYPES.FFLogsHttpAuth).to(FFXIVLogApiRest).inSingletonScope();
container.bind<FFXIVCardCalls>(TYPES.FFCardsAPI).to(FFXIVCardCalls).inSingletonScope();

export default container;
