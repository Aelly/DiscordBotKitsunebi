"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.PlanningHandler = void 0;
const planning_1 = require("./../../class/ModifiableMessage/planning");
const inversify_1 = require("inversify");
const StringUtils_1 = require("../../Utils/StringUtils");
const types_1 = require("../../types");
const inversify_config_1 = require("../../inversify.config");
let PlanningHandler = class PlanningHandler {
    constructor() {
        this.commandName = "planning";
    }
    detectIfType(message) {
        return StringUtils_1.default.getCommandName(message.content) == this.commandName;
    }
    sendResponse(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
            const planning = new planning_1.Planning();
            planning.message = yield message.channel.send(yield planning.constructMessageEmbed());
            bot.modifiableMessages.push(planning);
            yield planning.addReaction();
        });
    }
};
PlanningHandler = __decorate([
    inversify_1.injectable()
], PlanningHandler);
exports.PlanningHandler = PlanningHandler;
//# sourceMappingURL=planning-handler.js.map