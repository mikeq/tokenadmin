const tableOutput = require('table');
const chalk = require('chalk');

const table = data => {
  const headers = [
    [
      chalk.blue.bold('client'),
      chalk.blue.bold('client_id'),
      chalk.blue.bold('client_secret'),
    ],
  ];

  const rows = data.map(row => [
    chalk.blue(row.client_tag),
    chalk.green(row.client_id),
    chalk.green(row.client_secret),
  ]);

  return tableOutput.table([...headers, ...rows], {
    border: tableOutput.getBorderCharacters('honeywell'),
  });
};

module.exports = table;
