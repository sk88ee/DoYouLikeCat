import React, { useState } from 'react';
import { FlatList, Modal, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';
import { useStores } from '@stores/index';
import { Button } from 'react-native-elements';

const DEVICE_ONE_THIRD_WIDTH = Dimensions.get('window').width / 3;

const CatList = () => {
  const { catStore } = useStores();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const showFullScreen = (url) => {
    setImageUrl(url);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const removeItem = (item) => {
    Alert.alert('', 'Do you really want to remove this cat from this list?', [
      {
        text: 'OK',
        onPress: () => {
          catStore.removeBookmark(item);
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
    ]);
  };

  return (
    <Wrapper>
      <FlatList
        data={catStore.bookmarkedList}
        keyExtractor={(_, idx) => idx.toString()}
        numColumns="3"
        renderItem={({ item }) => {
          return (
            <GridLayout>
              <ImageContainer onPress={() => showFullScreen(item)}>
                <CatIamge source={{ uri: item }}>
                  <RemoveButton
                    onPress={() => removeItem(item)}
                    icon={<RemoveIcon source={require('@assets/remove_icon.png')} />}
                  />
                </CatIamge>
              </ImageContainer>
            </GridLayout>
          );
        }}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ImageContainer onPress={() => closeModal()}>
          <FullScreenImage source={{ uri: imageUrl }} resizeMode={'contain'} />
        </ImageContainer>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled(SafeAreaView)``;

const GridLayout = styled.View`
  display: flex;
`;

const ImageContainer = styled.TouchableOpacity``;

const CatIamge = styled.ImageBackground`
  width: ${DEVICE_ONE_THIRD_WIDTH};
  height: 150px;
`;

const FullScreenImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const RemoveButton = styled(Button).attrs({
  buttonStyle: {
    alignSelf: 'flex-end',
    width: 40,
    backgroundColor: '#FFFFFF',
  },
  titleStyle: {
    color: '#231916',
  },
})``;

const RemoveIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export default observer(CatList);
