"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpHandler = void 0;
const inversify_1 = require("inversify");
const StringUtils_1 = require("../Utils/StringUtils");
let HelpHandler = class HelpHandler {
    constructor() {
        this.commandName = "help";
    }
    detectIfType(message) {
        return StringUtils_1.default.getCommandName(message.content) == this.commandName;
    }
    sendResponse(message) {
        let response = "\n";
        response += "- !notice Titre - Description\n";
        response += "- !event Titre - Description\n";
        response += "- !planning\n";
        return message.reply(response);
    }
};
HelpHandler = __decorate([
    inversify_1.injectable()
], HelpHandler);
exports.HelpHandler = HelpHandler;
