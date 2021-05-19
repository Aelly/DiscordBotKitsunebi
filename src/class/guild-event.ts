import { Role } from "./role";
import { Message } from "discord.js";
export class GuildEvent {
    public message: Message;

    public roles: Role[];

    constructor(message: Message) {
        this.message = message;

        this.roles = [];
        // Tank
        const tankRole: Role = new Role("Tank", "🛡");
        tankRole.addServerSpecificEmote("587883211225563160", "587893528076615690");
        this.roles.push(tankRole);
        // Heal
        const healRole: Role = new Role("Heal", "🔋");
        healRole.addServerSpecificEmote("587883211225563160", "587893528084873218");
        this.roles.push(healRole);
        // Dps
        const dpsRole: Role = new Role("Dps", "⚔");
        dpsRole.addServerSpecificEmote("587883211225563160", "587893528072552458");
        this.roles.push(dpsRole);
        // IfNeeded
        const ifNeededRole: Role = new Role("Si besoin", "❤");
        this.roles.push(ifNeededRole);
    }

    public 
}
