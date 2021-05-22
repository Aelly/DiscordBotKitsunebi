import { Role } from "./../role";
import { MessageEmbed } from "discord.js";
import { ModifiableMessage } from "./modifiable-message";
import container from "../../inversify.config";
import { TYPES } from "../../types";
import { Bot } from "../../bot";
import DiscordUtils from "../../Utils/DiscordUtils";

export class Planning extends ModifiableMessage {
    constructor() {
        super();

        // Monday
        const mondayRole: Role = new Role("Lundi", "🇱");
        this.roles.push(mondayRole);
        // Tuesday
        const tuesdayRole: Role = new Role("Mardi", "🇲");
        this.roles.push(tuesdayRole);
        // Wednesday
        const wednesdayRole: Role = new Role("Mercredi", "Ⓜ");
        this.roles.push(wednesdayRole);
        // Thursday
        const thursdayRole: Role = new Role("Jeudi", "🇯");
        this.roles.push(thursdayRole);
        // Friday
        const fridayRole: Role = new Role("Vendredi", "🇻");
        this.roles.push(fridayRole);
        // Satuday
        const saturdayRole: Role = new Role("Samedi", "🇸");
        this.roles.push(saturdayRole);
        // Sunday
        const sundayRole: Role = new Role("Dimanche", "🇩");
        this.roles.push(sundayRole);
    }

    public async constructMessageEmbed(): Promise<MessageEmbed> {
        let bot = container.get<Bot>(TYPES.Bot);

        let messageEmbed: MessageEmbed = new MessageEmbed().setColor(bot.embedColor);

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
