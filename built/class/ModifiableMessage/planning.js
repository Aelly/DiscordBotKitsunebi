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
exports.Planning = void 0;
const role_1 = require("./../role");
const discord_js_1 = require("discord.js");
const modifiable_message_1 = require("./modifiable-message");
const inversify_config_1 = require("../../inversify.config");
const types_1 = require("../../types");
const DiscordUtils_1 = require("../../Utils/DiscordUtils");
class Planning extends modifiable_message_1.ModifiableMessage {
    constructor() {
        super();
        // Monday
        const mondayRole = new role_1.Role("Lundi", "🇱");
        this.roles.push(mondayRole);
        // Tuesday
        const tuesdayRole = new role_1.Role("Mardi", "🇲");
        this.roles.push(tuesdayRole);
        // Wednesday
        const wednesdayRole = new role_1.Role("Mercredi", "Ⓜ");
        this.roles.push(wednesdayRole);
        // Thursday
        const thursdayRole = new role_1.Role("Jeudi", "🇯");
        this.roles.push(thursdayRole);
        // Friday
        const fridayRole = new role_1.Role("Vendredi", "🇻");
        this.roles.push(fridayRole);
        // Satuday
        const saturdayRole = new role_1.Role("Samedi", "🇸");
        this.roles.push(saturdayRole);
        // Sunday
        const sundayRole = new role_1.Role("Dimanche", "🇩");
        this.roles.push(sundayRole);
    }
    constructMessageEmbed() {
        return __awaiter(this, void 0, void 0, function* () {
            let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
            let messageEmbed = new discord_js_1.MessageEmbed().setColor(bot.embedColor);
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
exports.Planning = Planning;
//# sourceMappingURL=planning.js.map