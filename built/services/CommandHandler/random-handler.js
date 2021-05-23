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
exports.RandomHandler = void 0;
const StringUtils_1 = require("../../Utils/StringUtils");
class RandomHandler {
    constructor() {
        this.commandName = "rand";
    }
    detectIfType(message) {
        return StringUtils_1.default.getCommandName(message.content) == this.commandName;
    }
    sendResponse(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const rdnInt = Math.floor(Math.random() * 100) + 1;
            yield message.reply(rdnInt);
        });
    }
}
exports.RandomHandler = RandomHandler;
//# sourceMappingURL=random-handler.js.map