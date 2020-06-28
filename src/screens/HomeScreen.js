import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useStore} from 'react-redux';
import {Avatar} from 'react-native-elements';

const Home = () => {
  const store = useStore();
  const [userImgUrl, setUserImgUrl] = useState(null);
  useEffect(() => {
    const setUserImg = async () => {
      setUserImgUrl(store.getState().login.userImg);
    };
    setUserImg();
  }, []);
  return (
    <View>
      {userImgUrl && (
        <View style={styles.avatarContainer}>
          <Avatar
            testID="avatar"
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

export default Home;
