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
const types_1 = require("../../types");
const inversify_config_1 = require("../../inversify.config");
class PortraitHandler {
    constructor() {
        this.commandName = "portrait";
        this.lodestoneAPI = inversify_config_1.default.get(types_1.TYPES.LodestoneAPI);
    }
    detectIfType(message) {
        return StringUtils_1.default.getCommandName(message.content) == this.commandName;
    }
    sendResponse(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const portraitURL = yield this.lodestoneAPI.getPortrait();
            message.channel.send(portraitURL);
        });
    }
}
exports.PortraitHandler = PortraitHandler;
//# sourceMappingURL=portrait-handler.js.map