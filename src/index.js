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

console.log(creator.options);

creator.on('sync', () => {
	console.log('commands synced');
});

creator.on('debug', (msg) => console.log(msg));

creator
	.registerCommandsIn(Path.join(__dirname, '/commands/'))
	.syncCommands();

// console.log(creator.commands);

creator
	.withServer(new ExpressServer())
	.startServer();
