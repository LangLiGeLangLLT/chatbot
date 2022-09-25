import { Amplify } from 'aws-amplify';
import { AmplifyChatbot } from '@aws-amplify/ui-react/legacy';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:9dadb8b7-9203-4f2b-a16e-bfb747567fdc',
    region: 'us-east-1',
  },
  Interactions: {
    bots: {
      help_desk_bot: {
        name: 'help_desk_bot',
        alias: '$LATEST',
        region: 'us-east-1',
      },
    },
  },
});

const Chatbot = () => {
  return <AmplifyChatbot botName="help_desk_bot" botTitle="My ChatBot" welcomeMessage="Hello, how can I help you?" />;
};

export default Chatbot;
