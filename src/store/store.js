import { createStore,applyMiddleware,compose} from "redux";
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './rootReducer';

const middleWare = [thunk];
if (__DEV__) {
    const { createLogger } = require('redux-logger');
    middleWare.push(createLogger());
}

const persistConfig = {
    key: 'rootPersist',
    storage: AsyncStorage,
    timeout: null, 
    whitelist: ["globalReducer","videoTimesReducer"],
};


const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, compose(applyMiddleware(...middleWare)));
export const persistor = persistStore(store);

