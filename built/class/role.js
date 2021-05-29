"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    constructor(roleName, emoteFallbackValue) {
        this.shouldCountInNbTotalParticipan = true;
        this.roleName = roleName;
        this.emoteServerValue = new Map();
        this.emoteFallbackValue = emoteFallbackValue;
        this.usersRegistered = [];
    }
    addServerSpecificEmote(serverId, emoteValue) {
        this.emoteServerValue.set(serverId, emoteValue);
    }
    getEmoteForCurrentServer(serverId) {
        if (this.emoteServerValue.has(serverId))
            return this.emoteServerValue.get(serverId);
        else
            return this.emoteFallbackValue;
    }
    addUser(userToAdd) {
        this.usersRegistered.push(userToAdd);
    }
    removeUser(userToRemove) {
        const index = this.usersRegistered.indexOf(userToRemove, 0);
        if (index > -1)
            this.usersRegistered.splice(index, 1);
    }
}
exports.Role = Role;
//# sourceMappingURL=role.js.map