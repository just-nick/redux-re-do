import { Dispatch, AnyAction, Middleware } from 'redux';

export type ReDoActionType = '@@ReduxReDo/ActionType';
export const ReDoActionType: ReDoActionType = '@@ReduxReDo/ActionType';

export type ReDoFunction<A extends AnyAction, S, E = undefined> =
    (dispatch: Dispatch<A>, getState: () => S, extraArgument?: E) => void;

export type ReDoAction<A extends AnyAction, S, E = undefined> = {
    type: ReDoActionType,
    reDo: ReDoFunction<A, S, E>
}

export const CreateReDoMiddleware = <S, E = undefined>
    (extraArgument?: E): Middleware<{}, S> => store => next => action => {

        if (isReDoAction(action)) {
            return action.reDo(store.dispatch, store.getState, extraArgument);
        }

        return next(action);
    };

export const reDoMiddleware = CreateReDoMiddleware();

export const reDo = <A extends AnyAction, S>(reDo: ReDoFunction<A, S>): ReDoAction<A, S> => {
    return {
        type: ReDoActionType,
        reDo
    }
}

function isReDoAction<A extends AnyAction, S, E>(action: AnyAction): action is ReDoAction<A, S, E> {
    return (action.type === ReDoActionType);
}