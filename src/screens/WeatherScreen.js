import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import GetLocation from 'react-native-get-location';
import {LineChart} from 'react-native-chart-kit';
import {useDispatch, useStore} from 'react-redux';
import {fetchWeather} from '../../redux/operations';

const Weather = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const [showWeather, setShowWeather] = useState(false);
  const dates = store.getState().coords.dates;
  const temps = store.getState().coords.temps;
  const labels = dates.slice(0, 5).map(date => date.slice(11, 16));
  const data = temps.slice(0, 5);

  useEffect(() => {
    setShowWeather(false);
  }, []);

  const getLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      await dispatch(fetchWeather(location.longitude, location.latitude));
      await setShowWeather(true);
    } catch (err) {
      const {code, message} = err;
      console.warn(code, message);
      setShowWeather(false);
    }
  };

  return (
    <View>
      {!showWeather && (
        <View style={styles.buttonContainer}>
          <Button testID="show" title="show weather" onPress={getLocation} />
        </View>
      )}

      {showWeather && (
        <View>
          <View style={styles.chartContainer}>
            {dates.length > 0 && temps.length > 0 && (
              <View>
                <Text style={styles.chartTitle}>
                  Your weather for the next 12 hours
                </Text>
                <LineChart

                  data={{
                    labels,
                    datasets: [
                      {
                        data,
                      },
                    ],
                  }}
                  width={400}
                  height={220}
                  yAxisInterval={1}
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    alignItems: 'center',
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    width: 150,
    marginBottom: 20,
    alignSelf: 'center',
    paddingVertical: 30,
  },
});

export default Weather;
