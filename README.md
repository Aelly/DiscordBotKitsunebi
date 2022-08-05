# DiscordBotKitsunebi

A discord bot for the Kitsunebi FF XIV Free Company. The goal is to help organizing the guild's events. Made in typescript with Node and DiscordJS.

## Installation

If you want to use the bot in your own server :

1. Clone this repo
2. Create a bot within your Discord developer portal
3. Paste your bot's token in _.env_ file : "TOKEN=[Your toker here]"
4. Run the node application and you should be good to go !

The bot can use server specific reaction if you want to. For exemple in our server, the "event" command display the role icon from Final Fantasy XIV. To do that you can use the "addServerSpecificEmote" function

```lang-js
// Add a server specific reation to a role (serverID - reactionID)
tankRole.addServerSpecificEmote("587883211225563160", "587893528076615690");
```

You can also personify the bot's prefix in the .env file if you need to.

For now the bot messages are written only in French but I have plan to add multilanguage in the future.

## Usage

The bot's main command are :

### Event

Display an embed message with a title, a description and field representing the different role of Final Fantasy XIV. Discord's members can then say that they want to participate in the event simply by adding a reaction with their role. A number next to the title indicate how many user have register to the event since you can add multiple role.

```lang-txt
!event [Title] - [Description]
```

![Demo of the event command](https://raw.githubusercontent.com/Aelly/DiscordBotKitsunebi/master/docs/Event.PNG?token=AFKPYZHXGQTQM3VN3VCYCC3AV23B6)

### Planning

Display an embed message with reaction allowing your Discord member to indicate their best day to organize guild events.

```lang-txt
!planning
```

![Demo of the event command](https://raw.githubusercontent.com/Aelly/DiscordBotKitsunebi/master/docs/planning.PNG?token=AFKPYZB7MA3T4WBES2GCNA3AV23E2)

### Notice

Create simple but beautiful embed message easily.

```lang-txt
!notice [Title] - [Description]
```

![Demo of the event command](https://raw.githubusercontent.com/Aelly/DiscordBotKitsunebi/master/docs/notice.PNG?token=AFKPYZF6HFVPKQ5GQRWC24TAV23FU)

### Misc

The bot also have bonus command like :

```lang-txt
// Delete the x last message in the channel
!clear [Number of message to delete] 
// Reply with a number between 1 and 100
!rand
```

## Contributing

If you end up using the bot and want to contribute to the project feel free to open an issue !

## Future plan

- [ ] Add Unit testing
- [ ] Allow customization without needed to change the class code
- [x] Add a link to the FF XIV Lodestone / FF Logs API

## Licence

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
