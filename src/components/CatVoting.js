import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { useStores } from '@stores/index';
import { Button } from 'react-native-elements';

const DEVICE_HALF_WIDTH = Dimensions.get('window').width / 2.5;

const CatVoting = ({ componentId }) => {
  const { catStore } = useStores();
  const { id, url } = catStore?.cat;

  useEffect(() => {
    async function getRandomCat() {
      await catStore.getRandomCat();
    }
    getRandomCat();
  }, []);

  const LikeButtonCliked = async () => {
    await catStore.addBookmark({ id: id, url: url });
    await catStore.getRandomCat();
  };

  const NotLikeButtonClicked = async () => {
    await catStore.getRandomCat();
  };

  return (
    <Wrapper>
      <CatImage source={{ uri: url }} />
      <ButtonSection>
        <LikeButton title="Like" onPress={() => LikeButtonCliked()} />
        <NotLikeButton title="Not Like" onPress={() => NotLikeButtonClicked()} />
      </ButtonSection>
    </Wrapper>
  );
};

const Wrapper = styled(SafeAreaView)``;

const CatImage = styled.Image`
  height: 300px;
`;

const ButtonSection = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  justify-content: space-between;
`;

const LikeButton = styled(Button).attrs({
  buttonStyle: {
    width: DEVICE_HALF_WIDTH,
    height: 50,
    borderRadius: 4,
    backgroundColor: 'blue',
  },
  titleStyle: {
    color: 'white',
  },
})``;

const NotLikeButton = styled(Button).attrs({
  buttonStyle: {
    width: DEVICE_HALF_WIDTH,
    height: 50,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  titleStyle: {
    color: 'white',
  },
})``;

export default observer(CatVoting);
