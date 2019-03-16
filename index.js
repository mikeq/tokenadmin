#!/usr/bin/env node
const yargs = require("yargs");
const figlet = require("figlet");
const clear = require("clear");
const chalk = require("chalk");

const init = require("./lib/init");
const add = require("./lib/add");
const revoke = require("./lib/revoke");
const output = require("./lib/output");
const list = require("./lib/list");
const generate = require("./lib/generate");
const secret = require("./lib/secret");
const email = require("./lib/email");

clear();
console.log(chalk.blue(figlet.textSync("Token Admin")));

yargs
  .usage("Usage: node $0 <command> [options]")
  .command(
    "init",
    "Initialise the token server database",
    yargs => {},
    argv => {
      init();
    }
  )
  .command(
    "add [options] <client>",
    "Add a client to the token server",
    yargs => {
      yargs
        .positional("client", {
          describe: "client identifier to add (no spaces)"
        })
        .option("e", {
          alias: "email",
          describe: "Email address to send client details to"
        })
        .example("node $0 add test_client")
        .example("node $0 add -e joe@blogs.com test_client");
    },
    argv => {
      if (argv.verbose) console.info(`Adding ${argv.client} to tokens`);
      add(argv.client);
    }
  )
  .command(
    "generate [options] <client>",
    "Regenerate the public/private keys for a client",
    yargs => {
      yargs
        .positional("client", {
          describe: "client identifier to regenerate keys for (no spaces)"
        })
        .example("node $0 generate test_client");
    },
    argv => {
      if (argv.verbose) console.info(`Generating new keys for ${argv.client}`);
      generate(argv.client);
    }
  )
  .command(
    "revoke [options] <client>",
    "Remove a client from the token server",
    yargs => {
      yargs
        .positional("client", {
          describe: "client identifier to delete (no spaces)"
        })
        .example("node $0 revoke test_client");
    },
    argv => {
      if (argv.verbose) console.info(`Removing ${argv.client} from tokens`);
      revoke(argv.client);
    }
  )
  .command(
    "list [client]",
    "List the details held for all clients, or a specific client",
    yargs => {
      yargs
        .positional("client", {
          describe: "client identifier to display (no spaces)"
        })
        .example("node $0 list")
        .example("node $0 list test_client");
    },
    argv => {
      list(argv.client);
    }
  )
  .command(
    "email [options] <client>",
    "Email the details held for a client to email recipient",
    yargs => {
      yargs
        .option("e", {
          alias: "email",
          describe: "Email address to send client details to"
        })
        .demandOption(["e"])
        .example("node $0 email -e joe@bloggs.com test_client");
    },
    argv => {
      email(argv.client, argv.email);
    }
  )
  .command(
    "output [options] <client>",
    "Display details for a client to the screen",
    yargs => {
      yargs
        .positional("client", {
          describe: "client identifier to display (no spaces)"
        })
        .example("node $0 output test_client");
    },
    argv => {
      if (argv.verbose) console.info(`Displaying details for ${argv.client}`);
      output(argv.client);
    }
  )
  .command(
    "secret [options] <client>",
    "Update a client secret",
    yargs => {
      yargs
        .positional("client", {
          describe: "client identifier to update (no spaces)"
        })
        .example("node $0 secret test_client");
    },
    argv => {
      if (argv.verbose) console.info(`Updating secret for ${argv.client}`);
      secret(argv.client);
    }
  )
  .help("h")
  .alias("h", "help")
  .option("verbose", {
    alias: "v",
    default: false
  })
  .boolean("v")
  .epilog("Copyright © 2019 Mike Quinn").argv;
