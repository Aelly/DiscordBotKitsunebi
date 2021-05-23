"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const inversify_1 = require("inversify");
const StringUtils_1 = require("../../Utils/StringUtils");
const inversify_config_1 = require("../../inversify.config");
const types_1 = require("../../types");
let EventHandler = class EventHandler {
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
                this.sendResponseError(message).then();
            }
        });
    }
    sendResponseError(message) {
        return message.channel.send("Paramètre invalide: !event Titre - Description");
    }
};
EventHandler = __decorate([
    inversify_1.injectable()
], EventHandler);
exports.EventHandler = EventHandler;
//# sourceMappingURL=event-handler.js.map