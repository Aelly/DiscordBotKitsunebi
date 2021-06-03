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
exports.PortraitHandler = void 0;
const StringUtils_1 = require("../../Utils/StringUtils");
const ffxiv_lodestone_api_utils_1 = require("../Api/FFXIVLodestone/ffxiv-lodestone-api-utils");
class PortraitHandler {
    constructor() {
        this.commandName = "portrait";
    }
    detectIfType(message) {
        return StringUtils_1.default.getCommandName(message.content) == this.commandName;
    }
    sendResponse(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const characterNameToSearch = StringUtils_1.default.getCommandUniqueArgument(message.content);
            if (characterNameToSearch == "") {
                yield message.channel.send("J'ai besoin du nom du personnage (ex: !portrait Rhuya Lihzeh");
                return;
            }
            // The API calls can take a few seconds so we send a waiting message
            const waitingMessage = yield message.channel.send("Récupération des informations...");
            const response = yield ffxiv_lodestone_api_utils_1.FFXIVLodestoneAPIUtils.getPortrait(characterNameToSearch);
            waitingMessage.delete();
            message.channel.send(response);
        });
    }
}
exports.PortraitHandler = PortraitHandler;
//# sourceMappingURL=portrait-handler.js.map