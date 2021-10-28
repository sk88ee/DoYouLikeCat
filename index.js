import { Navigation } from 'react-native-navigation';
import { registerScreens } from '@screens/index';

registerScreens();
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'VotingScreen',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
});
