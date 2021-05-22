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
const role_1 = require("./role");
const discord_js_1 = require("discord.js");
const inversify_config_1 = require("../inversify.config");
const types_1 = require("../types");
class GuildEvent {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.message = null;
        this.roles = [];
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
        let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
        // Prepare the corresponding embed message
        let messageEmbed = new discord_js_1.MessageEmbed()
            .setTitle(this.title)
            .setDescription(this.description)
            .setColor(bot.embedColor);
        for (let role of this.roles) {
            const usernames = role.usersRegistered.map((u) => u.username);
            const filedValue = usernames.join("\n") || "\u200b";
            messageEmbed = messageEmbed.addField(role.roleName, filedValue, true);
        }
        return messageEmbed;
    }
    addReaction() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the current server (to check which emote to use for a specific role)
            const serverId = this.message.guild.id;
            // Add reaction of each role
            for (let role of this.roles) {
                yield this.message.react(role.getEmoteForCurrentServer(serverId));
            }
        });
    }
}
exports.GuildEvent = GuildEvent;
//# sourceMappingURL=guild-event.js.map