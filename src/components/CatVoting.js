import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { useStores } from '@stores/index';
import { Button } from 'react-native-elements';
import { set } from 'mobx';

const CatVoting = ({ componentId }) => {
  const { catStore } = useStores();
  const { id, url } = catStore.cat;
  const [loadSuccess, setImageLoaded] = useState(false);

  const [deviceHalfWidth, setDeviceHalfWidth] = useState(Dimensions.get('window').width / 2.5);

  useEffect(() => {
    catStore.getRandomCat();
  }, []);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHalfWidth(Dimensions.get('window').width / 2.5);
    };
    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => {
      subscription.remove();
    };
  });

  const onImageLoadSuccess = () => {
    setImageLoaded(true);
  };

  const LikeButtonCliked = () => {
    if (loadSuccess) {
      catStore.addBookmark({ id: id, url: url });
      catStore.getRandomCat();
      setImageLoaded(false);
    }
  };

  const NotLikeButtonClicked = () => {
    if (loadSuccess) {
      catStore.getRandomCat();
      setImageLoaded(false);
    }
  };

  return (
    <Wrapper>
      <CatImage source={{ uri: url }} onLoad={() => onImageLoadSuccess()} />
      <ButtonSection>
        <LikeButton title="Like" deviceWidth={deviceHalfWidth} onPress={() => LikeButtonCliked()} />
        <NotLikeButton
          title="Not Like"
          deviceWidth={deviceHalfWidth}
          onPress={() => NotLikeButtonClicked()}
        />
      </ButtonSection>
    </Wrapper>
  );
};

const Wrapper = styled.View``;

const CatImage = styled.Image`
  height: 300px;
`;

const ButtonSection = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  justify-content: space-between;
`;

const LikeButton = styled(Button).attrs((props) => ({
  buttonStyle: {
    width: props.deviceWidth,
    height: 50,
    borderRadius: 4,
    backgroundColor: 'blue',
  },
  titleStyle: {
    color: 'white',
  },
}))``;

const NotLikeButton = styled(Button).attrs((props) => ({
  buttonStyle: {
    width: props.deviceWidth,
    height: 50,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  titleStyle: {
    color: 'white',
  },
}))``;

export default observer(CatVoting);
