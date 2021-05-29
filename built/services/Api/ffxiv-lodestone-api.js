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
exports.FFXIVLodestoneAPI = void 0;
const inversify_1 = require("inversify");
const fetch = require("node-fetch");
const url_1 = require("url");
let FFXIVLodestoneAPI = class FFXIVLodestoneAPI {
    constructor() {
        this.apiKey = "574192ff995d449d8b04402262fec5a6052da30e3abe4644b938438ba4c4f935";
    }
    getPortrait() {
        return __awaiter(this, void 0, void 0, function* () {
            const characInfo = yield this.getCharacterInfo("11892371");
            return characInfo.Character.Portrait;
        });
    }
    getCharacterInfo(characId) {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new url_1.URL("https://xivapi.com/character/" + characId);
            var params = [["private_key", this.apiKey]];
            url.search = new url_1.URLSearchParams(params).toString();
            const response = yield fetch(url);
            if (!response.ok)
                return null;
            const data = yield response.json();
            return data;
        });
    }
};
FFXIVLodestoneAPI = __decorate([
    inversify_1.injectable()
], FFXIVLodestoneAPI);
exports.FFXIVLodestoneAPI = FFXIVLodestoneAPI;
//# sourceMappingURL=ffxiv-lodestone-api.js.map