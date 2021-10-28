import { Navigation } from 'react-native-navigation';
import VotingScreen from './VotingScreen';
import BookmarkScreen from './BookmarkScreen';

export function registerScreens() {
  Navigation.registerComponent('VotingScreen', () => VotingScreen);
  Navigation.registerComponent('BookmarkScreen', () => BookmarkScreen);
}
