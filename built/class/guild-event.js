"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildEvent = void 0;
const role_1 = require("./role");
class GuildEvent {
    constructor(message) {
        this.message = message;
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
}
exports.GuildEvent = GuildEvent;
//# sourceMappingURL=guild-event.js.map