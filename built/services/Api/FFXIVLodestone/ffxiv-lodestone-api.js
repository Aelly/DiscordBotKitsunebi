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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const types_1 = require("./../../../types");
const inversify_1 = require("inversify");
const url_1 = require("url");
const fetch = require("node-fetch");
let FFXIVLodestoneAPI = class FFXIVLodestoneAPI {
    constructor(lodestoneApiKey) {
        this.apiKey = "";
        this.apiKey = lodestoneApiKey;
    }
    getPortrait(characterName) {
        return __awaiter(this, void 0, void 0, function* () {
            const charactId = yield this.getCharacterId(characterName);
            if (charactId < 0)
                return "Erreur, le personnage n'existe pas";
            const characInfo = yield this.getCharacterInfo(charactId);
            return characInfo.Character.Portrait;
        });
    }
    getCharacterId(characterName, characterServer = "Omega") {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new url_1.URL("https://xivapi.com/character/search?");
            var params = [
                ["private_key", this.apiKey],
                ["name", characterName],
                ["server", characterServer],
            ];
            url.search = new url_1.URLSearchParams(params).toString();
            const response = yield fetch(url);
            if (!response.ok)
                return null;
            const searchData = yield response.json();
            if (searchData.Results.length == 0)
                return -1;
            else if (searchData.Results.length > 1)
                return -2;
            else
                return searchData.Results[0].ID;
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
            return yield response.json();
        });
    }
};
FFXIVLodestoneAPI = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.LodestoneApiKey)),
    __metadata("design:paramtypes", [String])
], FFXIVLodestoneAPI);
exports.FFXIVLodestoneAPI = FFXIVLodestoneAPI;
//# sourceMappingURL=ffxiv-lodestone-api.js.map