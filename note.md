# Kitsunebi Discord Bot Note

## TODO

### Debug

- [ ] UnhandlelPromiseRejection : "!notice a", "!clear 99"

### Command

- [x] Clear
- [x] Notice
- [x] Planning
- [x] Event (nombre d'inscrit dans le titre)
- [x] Remove emoji from name when subscribing to event
- [ ] Easter eggs
- [x] random roll (0 - 100)
- [x] Delete message when sending response
- [x] Delete instance in memory when message is deleted on the discord server

### Archi

- [x] Meilleur gestion de la création du 1er embed (les fields sont mise en dure dans l'envoi alors que les reaction sont faire en dynamique par rapport au role)
- [ ] Manager quelconque pour ne pas recréer les roles d'un même type d'embed à chaque fois dans le constructeur (ne change jamais lors de l'éxécution)
  
### Publication

- [ ] ReadMe How to use / How to dev
- [x] Nouveau repo git en publique (enlever le token de .env, push, ajouter .env dans le gitignore)

### To look up

- InversifyJS
- Mocha, Chai, ts-mockito
- Comment lancer directement la compilation puis l'éxécution en test (npm run watch / npm start)
- ORM Prisma

- [Test unitaire et test d'intégration](https://www.toptal.com/typescript/dependency-injection-discord-bot-tutorial)
  
## Just for fun

### [FF XIV API](https://xivapi.com/docs)

> https://xivapi.com/character/search?name=Rhuya Lihzeh&private_key=APIKEY&server=Omega

Paladin 1
War 3
Dark Knight 32
Gun breaker 37

Monk 2
Dragoon 4
Ninja 29
Samurai 34

White mage 6
Scholar 26
Astro 33

Bard 5
Machinist 31
Dancer 38

Black mage 7
Summoner 26
Red mage 35
Blue mage 36

Carpenter 8
BlackSmith 9
Armorer 10
GoldSmith 11
Leatherworker 12
Weaver 13
Alchemist 14
Culinarian 15

Miner 16
Botanist 17
Fisher 18