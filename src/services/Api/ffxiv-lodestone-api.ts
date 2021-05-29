import { injectable } from "inversify";

@injectable()
export class FFXIVLodestoneAPI{
    public async getPortrait() : Promise<string>{
        return "https://img2.finalfantasyxiv.com/f/3e284290e7545cb58792a178cd5c88bd_39e25ac3d737c46452305eefe324372cfl0_640x873.jpg?1621786184%22";
    }
}