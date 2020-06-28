import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useStore} from 'react-redux';
import {Avatar} from 'react-native-elements';

const Home = ({userImgUrlProp}) => {
  const store = useStore();
  const [userImgUrl, setUserImgUrl] = useState(userImgUrlProp);
  useEffect(() => {
    const setUserImg = async () => {
      setUserImgUrl(store.getState().login.userImg);
    };
    setUserImg();
  }, [store]);
  return (
    <View>
      {userImgUrl && (
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            source={{
              uri: userImgUrl,
            }}
            size="xlarge"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const HomeScreenMock = Home;
