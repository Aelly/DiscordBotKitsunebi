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
exports.ClearHandler = void 0;
const StringUtils_1 = require("../../Utils/StringUtils");
class ClearHandler {
    constructor() {
        this.commandName = "clear";
    }
    detectIfType(message) {
        return StringUtils_1.default.getCommandName(message.content) == this.commandName;
    }
    sendResponse(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const arg = StringUtils_1.default.getCommandUniqueArgument(message.content);
            const amount = parseInt(arg);
            if (isNaN(amount)) {
                yield message.reply("Paramètre invalide");
            }
            else if (amount <= 1 || amount >= 100) {
                yield message.reply("Le paramètre doit être en 1 et 99");
            }
            else {
                message.channel.bulkDelete(amount, true).catch(err => {
                    console.error(err);
                    message.channel.send('Erreur lors de la suppression des messages !');
                });
            }
        });
    }
}
exports.ClearHandler = ClearHandler;
//# sourceMappingURL=clear-handler.js.map