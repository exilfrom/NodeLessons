/**
 * Created by ievgen.garlinskyi on 12/23/2016.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { rootReducer } from '../reducers';
import { redirect } from '../middlewares/redirect'

export default function configureStore(){
    const store = compose(
        applyMiddleware(thunkMiddleware),
        applyMiddleware(createLogger()),
        applyMiddleware(redirect)
    )(createStore)(rootReducer)

    if(module.hot){
        module.hot.accept('../reducers', () => {
            const  nextRootReducer = require('../reducers').rootReducer
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}