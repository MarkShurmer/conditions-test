import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Condition } from './condition';
import ConditionPanel from './ConditionPanel';
import { fetchConditions } from './conditions-thunk';
import { RootState } from '../../app/store';

const styles = createUseStyles({
    conditionList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gridAutoRows: 'minmax(20px, auto)',
        gridGap: '1rem',
        margin: '1rem',
    },
    '@media (max-width: 900px)': {
        conditionList: {
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
        },
    },
    errorPanel: {
        backgroundColor: 'red',
        color: 'white',
        padding: '2rem',
        margin: '1rem 3rem 1rem 3rem',
    },
});

export const ConditionList = () => {
    const classes = styles();
    const conditions = useSelector((state: RootState) => state.conditionsSlice.conditions);
    const isLoading = useSelector((state: RootState) => state.conditionsSlice.isLoading);
    const error = useSelector((state: RootState) => state.conditionsSlice.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchConditions());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className={classes.errorPanel}>Error loading data</div>;
    }

    return (
        <section className={classes.conditionList}>
            {conditions.map((condition: Condition) => (
                <ConditionPanel condition={condition} key={condition.label} />
            ))}
        </section>
    );
};
