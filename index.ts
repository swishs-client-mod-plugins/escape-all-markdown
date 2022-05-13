/* The source code below is licensed under MIT */

import Commands from '@api/commands';
import Plugin from '@structures/plugin';

import { Messages } from '@webpack/api';

const { sendMessage } = Messages;

const mdchars = ['*', '_', '~', '`', '|'];
export default class EscapeAllMarkdown extends Plugin {
  start() {
    Commands.register({
      command: 'escapemd',
      description: 'Escapes all markdown.',
      execute: ([args], routes) => {
        if (!args) return;
        const content = args.value
          .split('')
          .map(char => ~mdchars.indexOf(char) ? `\\${char}` : char)
          .join('');

        sendMessage(routes.channel.id, { content });
      },
      options: [{
        type: 3,
        required: true,
        name: 'message',
        description: 'The message content.'
      }]
    });
  }

  stop() {
    Commands.unregister('escapemd');
  }
}
