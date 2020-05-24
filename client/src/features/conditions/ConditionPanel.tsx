import React from 'react';
import { Condition } from './condition';
import { createUseStyles } from 'react-jss';

export interface ConditionProps {
    condition: Condition;
}

const styles = createUseStyles({
    conditionPanel: {
        padding: '1rem',
        margin: '0.5rem',
        border: '1px solid darkblue',
        borderRadius: '0.5rem',
        minHeight: '10rem',
        backgroundColor: '#44444411',
    },
    '@media (max-width: 900px)': {
        conditionPanel: {
            width: '85%',
        },
    },
    header: {
        fontWeight: 500,
        color: 'darkblue',
    },
    item: {
        maxHeight: '6rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginTop: '0.2rem',
    },
    image: {
        display: 'block',
    },
});

const ConditionPanel = (props: ConditionProps) => {
    const classes = styles();
    const { condition } = props;

    return (
        <div className={classes.conditionPanel}>
            <div className={classes.header}>{condition.label} </div>
            <div className={classes.item}>{condition.snippet}</div>
            {condition.keywords ? <div className={classes.item}>Keywords: {condition.keywords}</div> : null}
            {condition.synonyms ? <div className={classes.item}>Synonyms: {condition.synonyms}</div> : null}
            {condition.image ? <img src={condition.image} className={classes.image} alt={condition.label} /> : null}
        </div>
    );
};

export default ConditionPanel;
