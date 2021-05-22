"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const message_responder_1 = require("./services/message-responder");
const StringUtils_1 = require("./Utils/StringUtils");
let Bot = class Bot {
    constructor(client, token, prefix, embedColor, messageResponder) {
        this.client = client;
        this.token = token;
        this.prefix = prefix;
        this.embedColor = embedColor;
        this.messageResponder = messageResponder;
        this.guildEvents = [];
    }
    listen() {
        // Handling of users message
        this.client.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
            // We only look message from user starting with this bot prefix
            if (message.author.bot || !StringUtils_1.default.isBotCommand(message.content))
                return;
            // Handling by the MessageResponder and the CommandHandler
            this.messageResponder.handle(message);
        }));
        // Handling of messageReactionAdd
        //  TODO : Handler à part ?
        this.client.on("messageReactionAdd", (messageReaction, user) => __awaiter(this, void 0, void 0, function* () {
            // We only look for user's reaction on bot's message
            const message = messageReaction.message;
            if (!message.author.bot || user.bot)
                return;
            // TODO : Meilleur façon de trouver l'event qui nous interesse
            for (let ge of this.guildEvents) {
                if (ge.message == message)
                    yield ge.addUserToRole(user, messageReaction);
            }
        }));
        this.client.on("messageReactionRemove", (messageReaction, user) => __awaiter(this, void 0, void 0, function* () {
            const message = messageReaction.message;
            if (!message.author.bot || user.bot)
                return;
            for (let ge of this.guildEvents) {
                if (ge.message == message)
                    yield ge.removeUserToRole(user, messageReaction);
            }
        }));
        return this.client.login(this.token);
    }
};
Bot = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Client)),
    __param(1, inversify_1.inject(types_1.TYPES.Token)),
    __param(2, inversify_1.inject(types_1.TYPES.Prefix)),
    __param(3, inversify_1.inject(types_1.TYPES.EmbedColor)),
    __param(4, inversify_1.inject(types_1.TYPES.MessageResponder)),
    __metadata("design:paramtypes", [discord_js_1.Client, String, String, String, message_responder_1.MessageResponder])
], Bot);
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map