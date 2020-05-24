import React from 'react';
import { Condition } from './condition';
import { createUseStyles } from 'react-jss';

export interface ConditionProps {
    condition: Condition;
}

const styles = createUseStyles({
    conditionPanel: {
        display: 'flexbox',
        padding: '1rem',
        border: '1 solid darkblue',
        borderRadius: '5px',
        minHeight: '10rem',
    },
});

const ConditionPanel = (props: ConditionProps) => {
    const classes = styles();
    const { condition } = props;

    return (
        <div className={classes.conditionPanel}>
            <div>{condition.label}</div>
        </div>
    );
};

export default ConditionPanel;
