import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { useStores } from '@stores/index';
import CatList from '@components/CatList';
import Storage from '@libs/storage';

const BookmarkScreen = ({ componentId }) => {
  const { catStore } = useStores();

  useEffect(() => {
    async function getStoredData() {
      catStore.bookmarkedList = await Storage.getData('SaveList');
    }
    getStoredData();
  }, []);

  return (
    <Wrapper>{catStore.bookmarkedList.length > 0 ? <CatList /> : <Title>No Data</Title>}</Wrapper>
  );
};

const Wrapper = styled(SafeAreaView)``;

const Title = styled.Text`
  font-size: 18px;
  margin-top: 150px;
  align-self: center;
`;

export default observer(BookmarkScreen);
