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
exports.ModifiableMessage = void 0;
class ModifiableMessage {
    constructor() {
        this.message = null;
        this.roles = [];
    }
    getCorrespondingRole(roleReaction) {
        for (let role of this.roles) {
            if (role.emoteServerValue.has(roleReaction.emoji.name)
                || role.emoteFallbackValue == roleReaction.emoji.name)
                return role;
        }
    }
    addReaction() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the current server (to check which emote to use for a specific role)
            const serverId = this.message.guild.id;
            // Add reaction of each role
            for (let role of this.roles) {
                yield this.message.react(role.getEmoteForCurrentServer(serverId));
            }
        });
    }
    addUserToRole(userToAdd, roleReaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getCorrespondingRole(roleReaction).addUser(userToAdd);
            yield this.message.edit(yield this.constructMessageEmbed());
        });
    }
    removeUserToRole(userToRemove, roleReaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getCorrespondingRole(roleReaction).removeUser(userToRemove);
            yield this.message.edit(yield this.constructMessageEmbed());
        });
    }
}
exports.ModifiableMessage = ModifiableMessage;
//# sourceMappingURL=modifiable-message.js.map