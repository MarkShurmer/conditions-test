import { AppThunk } from '../../app/store';
import { fetchConditionsStart, fetchConditionsSuccess, fetchConditionsFailure } from './conditions-slice';
import { Condition } from './condition';

const sortCondition = (lhs: Condition, rhs: Condition) => {
    if (lhs.label < rhs.label) {
        return -1;
    }
    if (rhs.label === lhs.label) {
        return 0;
    }

    return 1;
};

export const fetchConditions = (): AppThunk => async (dispatch) => {
    let resp;

    try {
        dispatch(fetchConditionsStart());
        resp = await (await fetch('http://localhost:5000/conditions')).json();
    } catch (err) {
        // there was a problem, so send failure
        dispatch(fetchConditionsFailure(err.toString()));
        return;
    }

    // all has worked , so send the success
    dispatch(fetchConditionsSuccess((resp.conditions as Condition[]).sort(sortCondition)));
};
