import { Role } from "../role";
import { Message, MessageEmbed, MessageReaction, User } from "discord.js";

export abstract class ModifiableMessage {
    public message: Message;

    public roles: Role[];

    constructor() {
        this.message = null;
        this.roles = [];
    }

    public abstract constructMessageEmbed(): Promise<MessageEmbed>;

    public getCorrespondingRole(roleReaction: MessageReaction): Role {
        for (let role of this.roles) {
            // Check if the value is the default
            if (role.emoteFallbackValue == roleReaction.emoji.name) {
                return role;
            }
            // Check if we have the value in our server specific emoji
            else if (
                role.emoteServerValue.has(roleReaction.message.guild.id) &&
                role.emoteServerValue.get(roleReaction.message.guild.id) == roleReaction.emoji.id
            ) {
                return role;
            }
        }
    }

    public async addReaction(): Promise<void> {
        // Get the current server (to check which emote to use for a specific role)
        const serverId = this.message.guild.id;
        // Add reaction of each role
        for (let role of this.roles) {
            await this.message.react(role.getEmoteForCurrentServer(serverId));
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
