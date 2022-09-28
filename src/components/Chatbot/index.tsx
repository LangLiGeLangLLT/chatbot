import { Amplify } from 'aws-amplify';
import { AmplifyChatbot } from '@aws-amplify/ui-react/legacy';
import './index.module.css';

window.Buffer = require('buffer').Buffer;

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:634d3e22-890f-4082-85a0-f6c03df104ef',
    region: 'us-east-1',
  },
  Interactions: {
    bots: {
      financial_bot: {
        name: 'financial_bot',
        alias: '$LATEST',
        region: 'us-east-1',
      },
    },
  },
});

const Chatbot = () => {
  return <AmplifyChatbot botName="financial_bot" botTitle="ChatBot" welcomeMessage="Hello, how can I help you?" voiceEnabled />;
};

export default Chatbot;
