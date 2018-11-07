# redux-re-do
A strongly typed alternative to redux-thunk

## Why does it exist?
Thunk is great. It's incredibly simple and incredibly useful. However, the one _flaw_ I always found was that technically a ThunkAction isn't really an action at all...

Redux defines an Action as an object with a type property, a ThunkAction however is actually just a function. If you're being strict this really means you probably shouldn't be dispatching a Thunk. What's more, the Thunk middleware assumes that any function that is passed into dispatch __must__ be a ThunkAction. While generally true, this still leaves plenty of room for error.

The purpose of this library is to take the same functionality provided by Thunk, but do it in a way that better matches the expected typing of Redux and also provide a safer environment for other middlewares to exist along side of it.

## Usage
To add the MiddleWare to your app you simply need to apply `reDoMiddleware` to your store

```js
import { reDoMiddleware } from 'redux-re-do';

const store = createStore(yourStore, applyMiddleware(reDoMiddleware));
```

If you require Thunk's `extraArgument` you can do this with the `CreateReDoMiddleware` method.

```js
import { CreateReDoMiddleware } from 'redux-re-do';

const store = createStore(yourStore, applyMiddleware(CreateReDoMiddleware('ExtraArgument'));
```

Now within your action creators you can use the `reDo` function to create reDo actions. This method takes a callback function which looks very much like a standard Thunk action.

```js
import { reDo } from 'redux-re-do';

function myActionCreator() {
    return reDo((dispatch, getState, extraArgument) => {
        const currentState = getState();
        dispatch({
            type: 'any-action',
            value: extraArgument
        });
    });
}
```