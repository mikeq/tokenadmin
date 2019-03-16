# JWT Token Admin

NodeJS JWT command line admin tool for managing JWT clients of the JWT Server

## Installing

Clone this repository, then run `yarn` in the project directory (or `npm install`)

```bash
λ git clone git@github.com:mikeq/tokenadmin.git
λ cd tokenadmin
λ yarn
λ
```

## Configuration

There are various environment variables that can be set to customise the configuration

| environment variable | description                                       | default                     |
| -------------------- | ------------------------------------------------- | --------------------------- |
| `MONGO_URL`          | MongoDB connection URL                            | `mongodb://localhost:27017` |
| `TOKEN_DB`           | Mongo database name                               | `token`                     |
| `CLIENT_COLLECTION`  | Mongo collection name                             | `clients`                   |
| `TOKEN_EMAIL_FROM`   | From address for any emails sent from the service | `tokens@example.com`        |
| `TOKEN_MAIL_HOST`    | Host of mail server to use                        | `localhost`                 |
| `TOKEN_MAIL_PORT`    | Port of mail server to use                        | `25`                        |

## Running

This is a NodeJS application and requires a MongoDB instance is available to store client details.

### Use -h|--help for discover commands that are available

```bash
λ node index.js -h
  _____     _                   _       _           _
 |_   _|__ | | _____ _ __      / \   __| |_ __ ___ (_)_ __
   | |/ _ \| |/ / _ \ '_ \    / _ \ / _` | '_ ` _ \| | '_ \
   | | (_) |   <  __/ | | |  / ___ \ (_| | | | | | | | | | |
   |_|\___/|_|\_\___|_| |_| /_/   \_\__,_|_| |_| |_|_|_| |_|

Usage: node index.js <command> [options]

Commands:
  index.js init                         Initialise the token server database
  index.js add [options] <client>       Add a client to the token server
  index.js generate [options] <client>  Regenerate the public/private keys for a
                                        client
  index.js revoke [options] <client>    Remove a client from the token server
  index.js list [client]                List the details held for all clients,
                                        or a specific client
  index.js email [options] <client>     Email the details held for a client to
                                        email recipient
  index.js output [options] <client>    Display details for a client to the
                                        screen
  index.js secret [options] <client>    Update a client secret

Options:
  --version      Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
  --verbose, -v                                       [boolean] [default: false]

Copyright © 2019 Mike Quinn
λ
```

| Command  | Purpose                                                    | description                                               |
| -------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| init     | Initialise the token server database                       | Initialises the clients collection and schema             |
| add      | Add client to the token server database                    | Adds client_id, client_secret and key pair                |
| generate | Regenerate the client key pair                             | If you wish to remove and add a new key pair for a client |
| revoke   | Remove a client from the database                          |                                                           |
| list     | Outputs basic details of all clients (or specified client) |                                                           |
| email    | Email the client details to specified recipient            | Emails client_id, client_secret and key pair              |
| output   | Outputs all details of a client                            |                                                           |
| secret   | Regenerate client_secret                                   |                                                           |

### Initialise the mongo database

If not already done so then you should first initialise the mongo database.

This will create the database, collection and set a schema for documents added to the collection.

```bash
λ node index.js init
  _____     _                   _       _           _
 |_   _|__ | | _____ _ __      / \   __| |_ __ ___ (_)_ __
   | |/ _ \| |/ / _ \ '_ \    / _ \ / _` | '_ ` _ \| | '_ \
   | | (_) |   <  __/ | | |  / ___ \ (_| | | | | | | | | | |
   |_|\___/|_|\_\___|_| |_| /_/   \_\__,_|_| |_| |_|_|_| |_|

token.clients initialised
λ
```

Once initialised you can then use the other commands to manage clients for your JWT token server

For example, add a client called `test`

```bash
λ node index.js add test
  _____     _                   _       _           _
 |_   _|__ | | _____ _ __      / \   __| |_ __ ___ (_)_ __
   | |/ _ \| |/ / _ \ '_ \    / _ \ / _` | '_ ` _ \| | '_ \
   | | (_) |   <  __/ | | |  / ___ \ (_| | | | | | | | | | |
   |_|\___/|_|\_\___|_| |_| /_/   \_\__,_|_| |_| |_|_|_| |_|

╔════════╤══════════════════════════════════════╤══════════════════════════════════════════════════════════════════╗
║ client │ client_id                            │ client_secret                                                    ║
╟────────┼──────────────────────────────────────┼──────────────────────────────────────────────────────────────────╢
║ test   │ 9c7335b0-47f0-11e9-a5e5-35a69c513d8b │ 082300ad531256bc857688c4d5f16d6c756813ba28e333d9b4cf45e1fd087ce8 ║
╚════════╧══════════════════════════════════════╧══════════════════════════════════════════════════════════════════╝
λ
```

Then view details of the client

```bash
λ node index.js output test
  _____     _                   _       _           _
 |_   _|__ | | _____ _ __      / \   __| |_ __ ___ (_)_ __
   | |/ _ \| |/ / _ \ '_ \    / _ \ / _` | '_ ` _ \| | '_ \
   | | (_) |   <  __/ | | |  / ___ \ (_| | | | | | | | | | |
   |_|\___/|_|\_\___|_| |_| /_/   \_\__,_|_| |_| |_|_|_| |_|

client:  test
client_id:  9c7335b0-47f0-11e9-a5e5-35a69c513d8b
client_secret:  082300ad531256bc857688c4d5f16d6c756813ba28e333d9
public key:
-----BEGIN PUBLIC KEY-----
MIIBIjA...AQAB
-----END PUBLIC KEY-----
private key:
-----BEGIN RSA PRIVATE KEY-----
MIIEog...7rRls6E=
-----END RSA PRIVATE KEY-----

λ
```

## Using a MongoDB docker image

Create a volume to persist the client data in and bring up a mongo container

```bash
λ docker volume create mongo-token
mongo-token
λ docker run --rm --name mymongo --mount source=mongo-token,target=/data/db -p 27017:27017 -d mongo:latest
41a95b810b58f2bf290435f99c83b10104b8a4a05116b92e42b563580e00e1a2
λ
```

This mongo instance will be available on `mongodb://localhost:27017` (the default setting in the app)

## Using MailDev docker image for testing email sending

```bash
λ docker run --rm --name mailer -p 1080:80 -p 25:25 -d djfarrelly/maildev:latest
```

A test mail server is now available on `localhost` port `25` (the default settings in the app)

A frontend for examining the sent email is available on [http://localhost:1080](http://localhost:1080)

```bash
λ node index.js email -e test@test.com test
  _____     _                   _       _           _
 |_   _|__ | | _____ _ __      / \   __| |_ __ ___ (_)_ __
   | |/ _ \| |/ / _ \ '_ \    / _ \ / _` | '_ ` _ \| | '_ \
   | | (_) |   <  __/ | | |  / ___ \ (_| | | | | | | | | | |
   |_|\___/|_|\_\___|_| |_| /_/   \_\__,_|_| |_| |_|_|_| |_|

{ accepted: [ 'test@test.com' ],
  rejected: [],
  envelopeTime: 16,
  messageTime: 12,
  messageSize: 2653,
  response: '250 Mail queued for delivery.',
  envelope: { from: 'tokens@example.com', to: [ 'test@test.com' ] },
  messageId: '<1978d6f4-3a8e-1f1a-27a0-0fd4b281908d@example.com>' }
λ
```
