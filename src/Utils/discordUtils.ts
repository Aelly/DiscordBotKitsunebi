import { Guild, User } from "discord.js";

export default class DiscordUtils {
    public static async getUserNicknameWithoutEmoji(user: User, guild: Guild): Promise<string> {
        if (guild.available) {
            const guildMember = await guild.members.fetch(user.id);
            const nameToUse : string = guildMember.nickname ?? user.username;

            return nameToUse.replace(
                /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                ""
            );
        } else {
            return user.username;
        }
    }
}
