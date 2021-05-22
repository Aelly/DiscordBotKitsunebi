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
exports.GuildEvent = void 0;
const role_1 = require("../role");
const discord_js_1 = require("discord.js");
const inversify_config_1 = require("../../inversify.config");
const types_1 = require("../../types");
const modifiable_message_1 = require("./modifiable-message");
const DiscordUtils_1 = require("../../Utils/DiscordUtils");
class GuildEvent extends modifiable_message_1.ModifiableMessage {
    constructor(title, description) {
        super();
        this.title = title;
        this.description = description;
        // Tank
        const tankRole = new role_1.Role("Tank", "🛡");
        tankRole.addServerSpecificEmote("587883211225563160", "587893528076615690");
        this.roles.push(tankRole);
        // Heal
        const healRole = new role_1.Role("Heal", "🔋");
        healRole.addServerSpecificEmote("587883211225563160", "587893528084873218");
        this.roles.push(healRole);
        // Dps
        const dpsRole = new role_1.Role("Dps", "⚔");
        dpsRole.addServerSpecificEmote("587883211225563160", "587893528072552458");
        this.roles.push(dpsRole);
        // IfNeeded
        const ifNeededRole = new role_1.Role("Si besoin", "❤");
        this.roles.push(ifNeededRole);
    }
    constructMessageEmbed() {
        return __awaiter(this, void 0, void 0, function* () {
            let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
            // TODO: Better way ? (typescript LINQ equivalent)
            // Get the total of all participant in the event
            let combinedUsers = [];
            for (let role of this.roles) {
                combinedUsers = combinedUsers.concat(role.usersRegistered);
            }
            let nbOfParcicipant = combinedUsers.filter((n, i) => combinedUsers.indexOf(n) === i).length;
            // Prepare the corresponding embed message
            let messageEmbed = new discord_js_1.MessageEmbed()
                .setTitle(this.title + "(" + nbOfParcicipant + ")")
                .setDescription(this.description)
                .setColor(bot.embedColor);
            for (let role of this.roles) {
                const usernames = [];
                for (let user of role.usersRegistered) {
                    const userName = yield DiscordUtils_1.default.getUserNicknameWithoutEmoji(user, this.message.guild);
                    usernames.push(userName);
                }
                const fieldValue = usernames.join("\n") || "\u200b";
                messageEmbed = messageEmbed.addField(role.roleName, fieldValue, true);
            }
            return messageEmbed;
        });
    }
}
exports.GuildEvent = GuildEvent;
//# sourceMappingURL=guild-event.js.map