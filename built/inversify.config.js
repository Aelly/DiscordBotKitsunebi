"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const bot_1 = require("./bot");
const discord_js_1 = require("discord.js");
const message_responder_1 = require("./services/message-responder");
const notice_handler_1 = require("./services/CommandHandler/notice-handler");
const help_handler_1 = require("./services/CommandHandler/help-handler");
const event_handler_1 = require("./services/CommandHandler/event-handler");
let container = new inversify_1.Container();
container.bind(types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client());
container.bind(types_1.TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind(types_1.TYPES.Prefix).toConstantValue(process.env.PREFIX);
container
    .bind(types_1.TYPES.EmbedColor)
    .toConstantValue(process.env.EMBED_COLOR);
container
    .bind(types_1.TYPES.MessageResponder)
    .to(message_responder_1.MessageResponder)
    .inSingletonScope();
container
    .bind(types_1.TYPES.NoticeHandler)
    .to(notice_handler_1.NoticeHandler)
    .inSingletonScope();
container
    .bind(types_1.TYPES.HelpHandler)
    .to(help_handler_1.HelpHandler)
    .inSingletonScope();
container
    .bind(types_1.TYPES.EventHandler)
    .to(event_handler_1.EventHandler)
    .inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map