"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.MessageResponder = void 0;
const inversify_1 = require("inversify");
const portrait_handler_1 = require("./CommandHandler/portrait-handler");
const random_handler_1 = require("./CommandHandler/random-handler");
const clear_handler_1 = require("./CommandHandler/clear-handler");
const planning_handler_1 = require("./CommandHandler/planning-handler");
const event_handler_1 = require("./CommandHandler/event-handler");
const help_handler_1 = require("./CommandHandler/help-handler");
const notice_handler_1 = require("./CommandHandler/notice-handler");
const charac_info_handler_1 = require("./CommandHandler/charac-info-handler");
let MessageResponder = class MessageResponder {
    constructor() {
        this.handlers = [];
        // Define the handler to test
        this.handlers.push(new help_handler_1.HelpHandler());
        this.handlers.push(new notice_handler_1.NoticeHandler());
        this.handlers.push(new event_handler_1.EventHandler());
        this.handlers.push(new planning_handler_1.PlanningHandler());
        this.handlers.push(new clear_handler_1.ClearHandler());
        this.handlers.push(new random_handler_1.RandomHandler());
        this.handlers.push(new portrait_handler_1.PortraitHandler());
        this.handlers.push(new charac_info_handler_1.CharacInfoHandler());
    }
    handle(message) {
        return __awaiter(this, void 0, void 0, function* () {
            // Test the message on each handler and send the corresponding response if needed
            for (let handler of this.handlers) {
                if (handler.detectIfType(message)) {
                    handler.sendResponse(message);
                    // Delete the user message with the command
                    try {
                        yield message.delete();
                    }
                    catch (err) {
                    }
                    finally {
                        break;
                    }
                }
            }
        });
    }
};
MessageResponder = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], MessageResponder);
exports.MessageResponder = MessageResponder;
//# sourceMappingURL=message-responder.js.map