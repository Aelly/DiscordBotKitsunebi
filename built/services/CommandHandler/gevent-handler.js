"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeventHandler = void 0;
const inversify_1 = require("inversify");
const discord_js_1 = require("discord.js");
const StringUtils_1 = require("../../Utils/StringUtils");
const inversify_config_1 = require("../../inversify.config");
const types_1 = require("../../types");
let GeventHandler = class GeventHandler {
    constructor() {
        this.commandName = "event";
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
            return message.channel.send(messageEmbed);
        }
        catch (error) {
            return this.sendResponseError(message);
        }
    }
    sendResponseError(message) {
        return message.channel.send("Paramètre invalide: !event Titre - Description");
    }
};
GeventHandler = __decorate([
    inversify_1.injectable()
], GeventHandler);
exports.GeventHandler = GeventHandler;
//# sourceMappingURL=gevent-handler.js.map