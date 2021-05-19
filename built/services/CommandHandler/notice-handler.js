"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeHandler = void 0;
const types_1 = require("./../../types");
const inversify_1 = require("inversify");
const StringUtils_1 = require("../../Utils/StringUtils");
const discord_js_1 = require("discord.js");
const inversify_config_1 = require("../../inversify.config");
let NoticeHandler = class NoticeHandler {
    constructor() {
        this.commandName = "notice";
    }
    detectIfType(message) {
        return StringUtils_1.default.getCommandName(message.content) == this.commandName;
    }
    sendResponse(message) {
        let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
        try {
            const parameters = StringUtils_1.default.getCommandArgumentTitleDescription(message.content);
            const messageEmbed = new discord_js_1.MessageEmbed()
                .setTitle(parameters[0])
                .setDescription(parameters[1])
                .setColor(bot.embedColor);
            message.delete();
            message.channel.send(messageEmbed);
        }
        catch (error) {
            this.sendResponseError(message);
        }
    }
    sendResponseError(message) {
        message.channel.send("Paramètre invalide : !notice Titre - Description");
    }
};
NoticeHandler = __decorate([
    inversify_1.injectable()
], NoticeHandler);
exports.NoticeHandler = NoticeHandler;
//# sourceMappingURL=notice-handler.js.map