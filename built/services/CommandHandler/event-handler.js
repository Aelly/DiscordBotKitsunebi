"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const guild_event_1 = require("../../class/ModifiableMessage/guild-event");
const StringUtils_1 = require("../../Utils/StringUtils");
const inversify_config_1 = require("../../inversify.config");
const types_1 = require("../../types");
class EventHandler {
    constructor() {
        this.commandName = "event";
    }
    detectIfType(message) {
        return StringUtils_1.default.getCommandName(message.content) == this.commandName;
    }
    sendResponse(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
            try {
                // Get the parameters of the command
                const parameters = StringUtils_1.default.getCommandArgumentTitleDescription(message.content);
                // Construct the guildEvent and send the corresponding response in the channel
                const guildEvent = new guild_event_1.GuildEvent(parameters[0], parameters[1]);
                guildEvent.message = yield message.channel.send(yield guildEvent.constructMessageEmbed());
                bot.modifiableMessages.push(guildEvent);
                // Add reaction
                yield guildEvent.addReaction();
            }
            catch (error) {
                console.log(error);
                yield this.sendResponseError(message).then();
            }
        });
    }
    sendResponseError(message) {
        return message.channel.send("Paramètre invalide: !event Titre - Description");
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=event-handler.js.map