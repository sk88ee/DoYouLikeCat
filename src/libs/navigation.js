import { Navigation } from 'react-native-navigation';

const defaultOption = {
  topBar: {
    visible: true,
  },
};

export const stackNavigation = (componentId, name, options = defaultOption, passProps) => {
  Navigation.push(componentId, {
    component: {
      name,
      options,
      passProps,
    },
  });
};
