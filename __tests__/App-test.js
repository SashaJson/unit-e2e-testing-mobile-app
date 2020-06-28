/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Text, Button, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {loginReducer, locationReducer} from '../redux/reducers';
import Thunk from 'redux-thunk';
import {act, Simulate} from 'react-dom/test-utils';
import {Avatar} from 'react-native-elements';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.useFakeTimers();

describe('Unit Testing App', () => {
  describe('Unit testing Component "Default Screen"', () => {
    describe('Testing with isLoggedProp equals true', () => {
      let DefaultScreen = null;
      let rootReducer = null;
      let store = null;
      beforeEach(() => {
        jest.mock('../src/screens/DefaultScreen');
        DefaultScreen = require('../src/screens/DefaultScreen')
          .DefaultScreenMock;

        rootReducer = combineReducers({
          login: loginReducer,
          coords: locationReducer,
        });
        store = createStore(
          rootReducer,
          composeWithDevTools(applyMiddleware(Thunk)),
        );
      });

      afterEach(() => {
        DefaultScreen = null;
        rootReducer = null;
        store = null;
      });
      it('0. Renders correctly', () => {
        renderer
          .create(
            <Provider store={store}>
              <DefaultScreen isLoggedProp={true} />
            </Provider>,
          )
          .unmount();
      }); // it (0. Renders correctly)
      it('1. Check that HTML has text content which "HOME"', () => {
        const testRenderer = renderer.create(
          <Provider store={store}>
            <DefaultScreen isLoggedProp={true} />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByProps({children: 'HOME'});
        expect(element.props.children).toEqual('HOME');
      }); // it (1. Check that HTML has text content which "HOME")
      it('2. Check that HTML has text content which "WEATHER"', () => {
        const testRenderer = renderer.create(
          <Provider store={store}>
            <DefaultScreen isLoggedProp={true} />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByProps({children: 'WEATHER'});
        expect(element.props.children).toEqual('WEATHER');
      }); // it (2. Check that HTML has text content which "WEATHER")
      it('3. Check that HTML has text content which "Exit"', () => {
        const testRenderer = renderer.create(
          <Provider store={store}>
            <DefaultScreen isLoggedProp={true} />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByProps({children: 'Exit'});
        expect(element.props.children).toEqual('Exit');
      }); // it (3. Check that HTML has text content which "Exit")
      it('4. Check that button "Exit" Call', () => {
        const navigate = jest.fn(() => Promise.resolve(true));
        const testRenderer = renderer.create(
          <Provider store={store}>
            <DefaultScreen isLoggedProp={navigate} />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByType(TouchableOpacity);

        act(() => {
          Simulate.click(element);
        });

        expect(navigate).toHaveBeenCalledTimes(1);
      }); // it (4. Check that button "Exit" Call)
      it('5. Check that button "HOME" Call', () => {
        const navigate = jest.fn(() => Promise.resolve(true));
        const testRenderer = renderer.create(
          <Provider store={store}>
            <DefaultScreen isLoggedProp={navigate} />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByProps({children: 'HOME'});
        act(() => {
          Simulate.click(element);
        });

        expect(navigate).toHaveBeenCalledTimes(1);
      }); // it (5. Check that button "HOME" Call)
      it('6. Check that button "WEATHER" Call', () => {
        const navigate = jest.fn(() => Promise.resolve(true));
        const testRenderer = renderer.create(
          <Provider store={store}>
            <DefaultScreen isLoggedProp={navigate} />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByProps({children: 'WEATHER'});
        act(() => {
          Simulate.click(element);
        });

        expect(navigate).toHaveBeenCalledTimes(1);
      }); // it (6. Check that button "WEATHER" Call)
    }); // describe (Testing with isLoggedProp equals true)
    describe('Testing with isLoggedProp equals false', () => {
      let DefaultScreen = null;
      let rootReducer = null;
      let store = null;
      beforeEach(() => {
        jest.mock('../src/screens/DefaultScreen');
        DefaultScreen = require('../src/screens/DefaultScreen')
          .DefaultScreenMock;

        rootReducer = combineReducers({
          login: loginReducer,
          coords: locationReducer,
        });
        store = createStore(
          rootReducer,
          composeWithDevTools(applyMiddleware(Thunk)),
        );
      });

      afterEach(() => {
        DefaultScreen = null;
        rootReducer = null;
        store = null;
      });
      it('0. Renders correctly', () => {
        renderer
          .create(
            <Provider store={store}>
              <DefaultScreen isLoggedProp={false} />
            </Provider>,
          )
          .unmount();
      }); // it (0. Renders correctly)
      it('1. Check that HTML has text content which "Enter"', () => {
        const testRenderer = renderer.create(
          <Provider store={store}>
            <DefaultScreen isLoggedProp={false} />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByProps({children: 'Enter'});
        expect(element.props.children).toEqual('Enter');
      }); // it (1. Check that HTML has text content which "Enter")
      it('2. Check that button "Enter" Call', () => {
        const navigate = jest.fn(false);
        const testRenderer = renderer.create(
          <Provider store={store}>
            <DefaultScreen isLoggedProp={navigate} />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByProps({children: 'Enter'});
        act(() => {
          Simulate.click(element);
        });

        expect(navigate).toHaveBeenCalledTimes(1);
      }); // it (2. Check that button "Enter" Call)
    }); // describe (Testing with isLoggedProp equals false)
  }); // describe (Unit testing Component "Default Screen")
  describe('Unit testing Component "Home Screen"', () => {
    describe('Testing with equals true', () => {
      let HomeScreen = null;
      let rootReducer = null;
      let store = null;
      beforeEach(() => {
        jest.mock('../src/screens/HomeScreen');
        HomeScreen = require('../src/screens/HomeScreen').HomeScreenMock;

        rootReducer = combineReducers({
          login: loginReducer,
          coords: locationReducer,
        });
        store = createStore(
          rootReducer,
          composeWithDevTools(applyMiddleware(Thunk)),
        );
      });

      afterEach(() => {
        HomeScreen = null;
        rootReducer = null;
        store = null;
      });
      it('0. Renders correctly', () => {
        renderer
          .create(
            <Provider store={store}>
              <HomeScreen userImgUrlProp={true} />
            </Provider>,
          )
          .unmount();
      }); // it (0. Renders correctly)
      it('1. Check that component "Avatar" has prop source with field "uri"', () => {
        const testRenderer = renderer.create(
          <Provider store={store}>
            <HomeScreen userImgUrlProp="test" />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByType(Avatar);
        expect(element.props.source.uri).toBe('test');
      }); // it (1. Check that component "Avatar" has prop source with field "uri")
    }); // describe (Testing with equals true)
  }); // describe (Unit testing Component "Home Screen")
  describe('Unit testing Component "Weather Screen"', () => {
    describe('Testing with equals true', () => {
      let WeatherScreen = null;
      let rootReducer = null;
      let store = null;
      beforeEach(() => {
        jest.mock('../src/screens/WeatherScreen');
        WeatherScreen = require('../src/screens/WeatherScreen')
          .WeatherScreenMock;

        rootReducer = combineReducers({
          login: loginReducer,
          coords: locationReducer,
        });
        store = createStore(
          rootReducer,
          composeWithDevTools(applyMiddleware(Thunk)),
        );
      });

      afterEach(() => {
        WeatherScreen = null;
        rootReducer = null;
        store = null;
      });
      it('0. Renders correctly', () => {
        renderer
          .create(
            <Provider store={store}>
              <WeatherScreen
                showWeatherProp={true}
                dates={['0', '1', '2']}
                temps={['0', '1', '2']}
              />
            </Provider>,
          )
          .unmount();
      }); // it (0. Renders correctly)
      it('1. Check that HTML has text content which "Your weather for the next 12 hours"', () => {
        const testRenderer = renderer.create(
          <Provider store={store}>
            <WeatherScreen
              showWeatherProp={true}
              dates={['0', '1', '2']}
              temps={['0', '1', '2']}
            />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByType(Text);
        expect(element.props.children).toEqual(
          'Your weather for the next 12 hours',
        );
      }); // it (1. Check that HTML has text content which "Your weather for the next 12 hours")
    }); // describe (Testing with equals true)
    describe('Testing with equals false', () => {
      let WeatherScreen = null;
      let rootReducer = null;
      let store = null;
      beforeEach(() => {
        jest.mock('../src/screens/WeatherScreen');
        WeatherScreen = require('../src/screens/WeatherScreen')
          .WeatherScreenMock;

        rootReducer = combineReducers({
          login: loginReducer,
          coords: locationReducer,
        });
        store = createStore(
          rootReducer,
          composeWithDevTools(applyMiddleware(Thunk)),
        );
      });

      afterEach(() => {
        WeatherScreen = null;
        rootReducer = null;
        store = null;
      });
      it('0. Renders correctly', () => {
        renderer
          .create(
            <Provider store={store}>
              <WeatherScreen
                showWeatherProp={false}
                dates={['0', '1', '2']}
                temps={['0', '1', '2']}
              />
            </Provider>,
          )
          .unmount();
      }); // it (0. Renders correctly)
      it('1. Check that button "show weather" call', () => {
        const navigate = jest.fn(false);
        const testRenderer = renderer.create(
          <Provider store={store}>
            <WeatherScreen
              showWeatherProp={navigate}
              dates={['0', '1', '2']}
              temps={['0', '1', '2']}
            />
          </Provider>,
        );
        const testInstance = testRenderer.root;
        const element = testInstance.findByType(Button);
        act(() => {
          Simulate.click(element);
        });

        expect(navigate).toHaveBeenCalledTimes(1);
      }); // it (1. Check that button "show weather" call)
    }); // describe (Testing with equals false)
  }); // describe (Unit testing Component "Weather Screen")
}); // describe (Unit Testing App)
