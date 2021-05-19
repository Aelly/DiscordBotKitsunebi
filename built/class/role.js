"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    constructor(roleName, emoteFallbackValue) {
        this.roleName = roleName;
        this.emoteServerValue = new Map();
        this.emoteFallbackValue = emoteFallbackValue;
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
}
exports.Role = Role;
//# sourceMappingURL=role.js.map