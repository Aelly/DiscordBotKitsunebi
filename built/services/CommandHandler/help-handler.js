"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpHandler = void 0;
const StringUtils_1 = require("../../Utils/StringUtils");
class HelpHandler {
    constructor() {
        this.commandName = "help";
    }
    detectIfType(message) {
        return StringUtils_1.default.getCommandName(message.content) == this.commandName;
    }
    sendResponse(message) {
        let response = "\n";
        response += "- !notice [Titre] - [Description]\n";
        response += "- !event [Titre] - [Description]\n";
        response += "- !planning\n";
        response += "- !clear [Nb message à supprimer]\n";
        response += "- !rand";
        message.reply(response);
    }
}
exports.HelpHandler = HelpHandler;
//# sourceMappingURL=help-handler.js.map