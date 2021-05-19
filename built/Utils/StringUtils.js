"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./../types");
const inversify_config_1 = require("./../inversify.config");
class StringUtils {
    static isBotCommand(message) {
        let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
        return message.startsWith(bot.prefix);
    }
    static getCommandName(message) {
        let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
        return message
            .slice(bot.prefix.length)
            .split(/ +/)
            .shift()
            .toLowerCase();
    }
    static getCommandArgumentTitleDescription(message) {
        let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
        // Remove the part we already know (prefix + command)
        //  and split to get the two part of the parameter
        const commandName = this.getCommandName(message);
        const part = message
            .slice(bot.prefix.length + commandName.length + 1)
            .split(StringUtils.TITLE_DESCRIPTION_SEPARATOR);
        if (part.length != 2)
            throw new Error('Paramètre invalide');
        // Récupère les deux parties de l'event
        const title = part[0];
        const description = part[1];
        return [title, description];
    }
}
exports.default = StringUtils;
StringUtils.TITLE_DESCRIPTION_SEPARATOR = " - ";
//# sourceMappingURL=StringUtils.js.map