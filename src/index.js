// const express = require('express');
const { SlashCreator, ExpressServer } = require('slash-create');
const Path = require('path');

const config = require('./config');

// console.log(config);

// const app = new express();
const creator = new SlashCreator({
	applicationID: config.applicationID,
	publicKey: config.publicKey,
	token: config.token,
	// endpointPath: config.endpoint,
	serverPort: 80
});

// console.log(creator.options);

creator.on('sync', () => {
	console.log('commands synced');
});

creator.on('debug', (msg) => console.log(msg));
creator.on('warn', (msg) => console.warn(msg));
creator.on('commandError', (cmd, err) => console.error(err));

creator
	.registerCommandsIn(Path.join(__dirname, '/commands/'))
	.syncCommandsIn('677485372988456970');

console.log(creator.commands);

creator
	.withServer(new ExpressServer())
	.startServer();
