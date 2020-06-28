import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { NativeRouter, Link, Route } from 'react-router-native';
import HomeScreen from './HomeScreen';
import WeatherScreen from './WeatherScreen';
import { fetchUserImage } from '../../redux/operations';

const DefaultScreen = () => {
  const [title, setTitle] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isHomeButtonActive, setIsHomeButtonActive] = useState(true);
  const [isWeatherButtonActive, setIsWeatherButtonActive] = useState(false);
  const dispatch = useDispatch();
  const userImg = useSelector(state => state.login.userImg);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const title = await AsyncStorage.getItem('title');
      if (title && !userImg) {
        await dispatch(fetchUserImage(title));
        await setIsLogged(true);
      }
    };
    checkIfLoggedIn();
  }, []);

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('title', title);
      await dispatch(fetchUserImage(title));
      await setIsLogged(true);
      await setIsHomeButtonActive(true);
    } catch (err) {
      console.log('another', err);
    }
  };
  const handleLogOut = async () => {
    console.log('logout.');
    await AsyncStorage.removeItem('title');
    await setIsLogged(false);
  };
  const onLinkWeatherPress = () => {
    setIsHomeButtonActive(false);
    setIsWeatherButtonActive(true);
  };
  const onLinkHomePress = () => {
    setIsHomeButtonActive(true);
    setIsWeatherButtonActive(false);
  };
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View>
          {!isLogged && (
            <>
              <TextInput
                testID="titleInput"
                style={styles.input}
                placeholder={"Please enter title"}
                value={title}
                onChangeText={t => setTitle(t)}
              />
              <TouchableOpacity
                testID="titleInputEnter"
                style={styles.button}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Enter</Text>
              </TouchableOpacity>
            </>
          )}
          {isLogged && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogOut}
              >
                <Text style={styles.buttonText}>Exit</Text>
              </TouchableOpacity>
          )}
        </View>
        {isLogged && (
          <View style={styles.container}>
            <View style={styles.navigation}>
              <Link to="/" onPress={onLinkHomePress}>
                <Text
                  style={isHomeButtonActive ? styles.activeLink : styles.link}>
                  HOME
                </Text>
              </Link>
              <Link testID="WEATHER" to="/weather" onPress={onLinkWeatherPress}>
                <Text
                  style={
                    isWeatherButtonActive ? styles.activeLink : styles.link
                  }>
                  WEATHER
                </Text>
              </Link>
            </View>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/weather" component={WeatherScreen} />
          </View>
        )}
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  navigation: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fb8c00',
    height: 60,
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 10,
    width: 300,
  },
  button: {
    marginTop: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 300,
    height: 50,
    backgroundColor: '#fb8c00'
  },
  buttonText: {
    lineHeight: 50,
    color: 'white',
    textAlign: "center"
  },
  link: {
    color: 'white',
    fontWeight: 'bold',
    height: 60,
    lineHeight: 60,
    textAlign: 'center',
    width: 205,
  },
  activeLink: {
    color: 'black',
    fontWeight: 'bold',
    height: 60,
    lineHeight: 60,
    textAlign: 'center',
    width: 205,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});

export default DefaultScreen;
