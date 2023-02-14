import { RESET_DATA } from '../constants';

export const restStoreData = () => (dispatch) => {
    dispatch({ type: RESET_DATA });
}