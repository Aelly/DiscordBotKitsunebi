"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ffxiv_lodestone_api_1 = require("./services/Api/ffxiv-lodestone-api");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const bot_1 = require("./bot");
const discord_js_1 = require("discord.js");
const message_responder_1 = require("./services/message-responder");
let container = new inversify_1.Container();
container.bind(types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client());
container.bind(types_1.TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind(types_1.TYPES.Prefix).toConstantValue(process.env.PREFIX);
container.bind(types_1.TYPES.EmbedColor).toConstantValue(process.env.EMBED_COLOR);
container.bind(types_1.TYPES.MessageResponder).to(message_responder_1.MessageResponder).inSingletonScope();
container.bind(types_1.TYPES.LodestoneAPI).to(ffxiv_lodestone_api_1.FFXIVLodestoneAPI).inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map