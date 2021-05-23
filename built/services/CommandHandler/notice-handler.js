"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeHandler = void 0;
const types_1 = require("./../../types");
const StringUtils_1 = require("../../Utils/StringUtils");
const discord_js_1 = require("discord.js");
const inversify_config_1 = require("../../inversify.config");
class NoticeHandler {
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
            message.channel.send(messageEmbed);
        }
        catch (error) {
            this.sendResponseError(message);
        }
    }
    sendResponseError(message) {
        message.channel.send("Paramètre invalide : !notice Titre - Description");
    }
}
exports.NoticeHandler = NoticeHandler;
//# sourceMappingURL=notice-handler.js.map