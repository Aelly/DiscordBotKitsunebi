import { Role } from "../role";
import { Message, MessageEmbed, MessageReaction, User } from "discord.js";

export abstract class ModifiableMessage {
    public message: Message;

    public roles: Role[];

    public abstract constructMessageEmbed(): Promise<MessageEmbed>;

    public getCorrespondingRole(roleReaction: MessageReaction): Role {
        for (let role of this.roles) {
            if(role.emoteServerValue.has(roleReaction.emoji.name)
            || role.emoteFallbackValue == roleReaction.emoji.name)
            return role;
        }
    }

    public async addUserToRole(userToAdd: User, roleReaction: MessageReaction) {
        this.getCorrespondingRole(roleReaction).addUser(userToAdd);
        await this.message.edit(await this.constructMessageEmbed());
    }

    public async removeUserToRole(userToRemove: User, roleReaction: MessageReaction) {
        this.getCorrespondingRole(roleReaction).removeUser(userToRemove);
        await this.message.edit(await this.constructMessageEmbed());
    }
}
