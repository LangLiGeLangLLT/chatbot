import { runApp, IAppConfig } from 'ice';

import '@fontsource/inter/variable.css';
import '@aws-amplify/ui-react/styles.css';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
};

runApp(appConfig);
