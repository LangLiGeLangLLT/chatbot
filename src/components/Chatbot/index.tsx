import { AmplifyChatbot } from '@aws-amplify/ui-react/legacy';
import { Amplify } from 'aws-amplify';
import './index.module.css';


Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:57fc5665-4dd3-41cc-b7f2-4ffbb173c49d',
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
  return <AmplifyChatbot botName="financial_bot" botTitle="ChatBot" welcomeMessage="Hello, how can I help you?" />;
};

export default Chatbot;
