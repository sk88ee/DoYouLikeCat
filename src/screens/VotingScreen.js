import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { stackNavigation } from '@libs/navigation';
import CatVoting from '@components/CatVoting';

const VotingScreen = ({ componentId }) => {
  const showBookmarkList = () => {
    const options = {
      topBar: {
        title: {
          text: 'I like cats',
        },
      },
    };
    stackNavigation(componentId, 'BookmarkScreen', options);
  };

  return (
    <Wrapper>
      <Header>
        <Title>Do you like cat ?</Title>
        <BookMarkButton
          onPress={() => showBookmarkList()}
          icon={<BookMarkIcon source={require('@assets/bookmark_icon.png')} />}
        />
      </Header>
      <CatVoting componentId={componentId} />
    </Wrapper>
  );
};

const Wrapper = styled(SafeAreaView)`
  margin-top: 100px;
  margin-left: 25px;
  margin-right: 25px;
`;

const Header = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  flex: 1;
  font-size: 28px;
`;

const BookMarkButton = styled(Button).attrs({
  containerStyle: {
    bottom: 3,
  },
  buttonStyle: {
    width: 40,
    backgroundColor: '#FFFFFF',
  },
  titleStyle: {
    color: '#231916',
  },
})``;

const BookMarkIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export default VotingScreen;
