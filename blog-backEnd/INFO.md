# Login/Register API

1. `npm init`
2. mappastruktúra létrehozása
    * config
    * controllers
    * log
    * models
    * routes
3. .gitignore file létrehozása
    * F1 >> gitignore >> Node
4. `git init`
5. README.md
6. modulok telepítése
    * `npm i express mongoose passport passport-local morgan body-parser cookie-parser express-session cookie-session cors helmet passport-local-mongoose rotating-file-stream -D`
    * -D a parancs végén fontos


## EXPRESS
* kibővített http szerver
* web framework

## Morgan
* logolásra használjuk

## Mongoose
* mongoDB-s utasításokat ad ki, nekünk csak egyszerűsített függvényeket indítani

## rotating file stream
* logoláshoz használjuk - pl. naponta lement egy különálló log file-t

## bcrypt-nodejs
* titkosításhoz ez jobb, mint a crypto

mongoose-local-stb

one to many connection