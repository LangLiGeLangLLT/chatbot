import { AmplifyChatbot } from '@aws-amplify/ui-react/legacy';
import { Amplify, Interactions } from 'aws-amplify';
import { useEffect, useState, useRef } from 'react';
import { map } from 'lodash';

import './index.module.css';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:57fc5665-4dd3-41cc-b7f2-4ffbb173c49d',
    region: 'us-east-1',
  },
  bots: {
    financial_bot: {
      name: 'financial_bot',
      alias: '$LATEST',
      region: 'us-east-1',
    },
  },
});

interface Link {
  title: string;
  url: string;
}

interface Message {
  type: 'bot' | 'user';
  text: string;
  links?: Link[];
  time?: number;
}

function CustomChatbot() {
  const dialogRef = useRef(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const onInput = (event) => {
    const msg = event.target.value;
    setMessage(msg);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendUserMsg(message);
    setMessage('');
  };

  const sendUserMsg = async (msg) => {
    messages.push({
      type: 'user',
      text: msg,
      time: Date.now(),
    });
    setMessages([...messages]);
    scrollToBottom(dialogRef.current);

    try {
      const response = await Interactions.send('financial_bot', msg);
      sendBotMsg(response.message);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  const sendBotMsg = (msg: string) => {
    // eslint-disable-next-line no-useless-escape
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    // eslint-disable-next-line no-useless-escape
    const singleMatch = /\[([^\[]+)\]\((.*)\)/;
    const matches = msg.match(regexMdLinks);
    const links: Link[] = [];
    const fulls: string[] = [];
    if (matches?.length) {
      for (let i = 0; i < matches.length; i++) {
        const [full, title, url] = singleMatch.exec(matches[i]) || [];
        fulls.push(full);
        links.push({
          title,
          url,
        });
      }
    }
    fulls.forEach(full => {
      msg = msg.replace(full, '');
    });
    messages.push({
      type: 'bot',
      text: msg,
      links,
      time: Date.now(),
    });
    setMessages([...messages]);
    scrollToBottom(dialogRef.current);
  };

  const scrollToBottom = (element: HTMLElement | null) => {
    if (!element) return;

    setTimeout(() => {
      element.scrollTo({
        left: 0,
        top: element.scrollHeight - element.clientHeight,
        behavior: 'smooth',
      });
    });
  };

  useEffect(() => {
    sendBotMsg('Hello, how can I help you?');
  }, []);

  return (
    <>
      <>
        <div className="flex h-5/6">
          <div className="w-full flex-col">
            <div
              ref={dialogRef}
              className="m-4 h-full border-solid border-2 border-indigo-600 rounded-md overflow-auto"
            >
              {map(messages, (item: Message, index: number) => {
                if (item.type === 'bot') {
                  return (
                    <div className="flex flex-row" key={index}>
                      <div className="max-w-prose rounded-lg py-3 px-6 ml-4 my-8 inline-block bg-gray-200">
                        <span>{item.text}</span>
                        {item?.links?.length ? (
                          <div>
                            {map(item.links, (link: Link, i: number) => (
                              <a
                                className="text-blue-400 block"
                                key={i}
                                title={link.title}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer external"
                              >
                                {link.title}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex flex-row-reverse" key={index}>
                      <div className="max-w-prose rounded-lg py-3 px-6 mr-4 my-8 inline-block bg-blue-100">
                        <span>{item.text}</span>
                        {item?.links?.length ? (
                          <div>
                            {map(item.links, (link: Link, i: number) => (
                              <a
                                className="text-blue-400 block"
                                key={i}
                                title={link.title}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer external"
                              >
                                {link.title}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <form onSubmit={onSubmit}>
              <div className="flex flex-row items-center">
                <div className="ml-4 mr-2 w-11/12">
                  <input
                    type="text"
                    name="message"
                    id="message"
                    autoComplete="message"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={message}
                    onInput={onInput}
                  />
                </div>
                <div className="mx-2">
                  <button
                    type="submit"
                    className="mr-2 inline-flex justify-center rounded-md
                      border border-transparent bg-indigo-600 py-2 px-4 text-sm
                      font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none
                      focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
      <AmplifyChatbot
        botName="financial_bot"
        botTitle="ChatBot"
        welcomeMessage="Hello, how can I help you?"
        style={{ display: 'none' }}
      />
    </>
  );
}

export default CustomChatbot;
