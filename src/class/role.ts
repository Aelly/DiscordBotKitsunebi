import { User } from 'discord.js';
export class Role{
    public roleName : string;
    // Unicode / ID to use by default (server specific)
    public emoteServerValue: Map<string, string>;
    // Unicode / ID to use when the default don't work (should be one of Discord's emote)
    public emoteFallbackValue: string;

    public usersRegistered : User[];

    public shouldCountInNbTotalParticipan : boolean = true;

    constructor(roleName : string, emoteFallbackValue : string)
    {
        this.roleName = roleName;
        
        this.emoteServerValue = new Map();

        this.emoteFallbackValue = emoteFallbackValue;

        this.usersRegistered = [];
    }

    public addServerSpecificEmote(serverId : string, emoteValue : string){
        this.emoteServerValue.set(serverId, emoteValue);
    }

    public getEmoteForCurrentServer(serverId : string)
    {
        if(this.emoteServerValue.has(serverId))
            return this.emoteServerValue.get(serverId);
        else
            return this.emoteFallbackValue;
    }

    public addUser(userToAdd : User){
        this.usersRegistered.push(userToAdd);
    }

    public removeUser(userToRemove : User){
        const index = this.usersRegistered.indexOf(userToRemove, 0);
        if(index > -1)
            this.usersRegistered.splice(index, 1);
    }
}