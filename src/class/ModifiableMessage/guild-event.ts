import { Role } from "../role";
import { MessageEmbed, User } from "discord.js";
import container from "../../inversify.config";
import { Bot } from "../../bot";
import { TYPES } from "../../types";
import { ModifiableMessage } from "./modifiable-message";
import DiscordUtils from "../../Utils/DiscordUtils";
export class GuildEvent extends ModifiableMessage {
    private title: string;
    private description: string;

    constructor(title: string, description: string) {
        super();

        this.title = title;
        this.description = description;

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

    public async constructMessageEmbed(): Promise<MessageEmbed> {
        let bot = container.get<Bot>(TYPES.Bot);

        // TODO: Better way ? (typescript LINQ equivalent)
        // Get the total of all participant in the event
        let combinedUsers: User[] = [];
        for (let role of this.roles) {
            combinedUsers = combinedUsers.concat(role.usersRegistered);
        }
        let nbOfParcicipant: number = combinedUsers.filter((n, i) => combinedUsers.indexOf(n) === i).length;

        // Prepare the corresponding embed message
        let messageEmbed: MessageEmbed = new MessageEmbed()
            .setTitle(this.title + "(" + nbOfParcicipant + ")")
            .setDescription(this.description)
            .setColor(bot.embedColor);

        for (let role of this.roles) {
            const usernames: string[] = [];
            for (let user of role.usersRegistered) {
                const userName: string = await DiscordUtils.getUserNicknameWithoutEmoji(user, this.message.guild);
                usernames.push(userName);
            }
            
            const fieldValue = usernames.join("\n") || "\u200b";

            messageEmbed = messageEmbed.addField(role.roleName, fieldValue, true);
        }

        return messageEmbed;
    }

    
}
