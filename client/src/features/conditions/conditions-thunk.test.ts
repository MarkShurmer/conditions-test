import { fetchConditions } from './conditions-thunk';
import { initialConditionsState } from './conditions-slice';
import fetchMock from 'jest-fetch-mock';

describe('Conditions thunk', () => {
    beforeAll(() => {});

    it('should dispatch start action when fetch works', async () => {
        // setup
        const dispatch = jest.fn();
        const state = { conditions: initialConditionsState };

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'conditions/fetchConditionsStart' });
    });

    it('should dispatch success action when fetch returns empty data', async () => {
        // setup
        fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
        const dispatch = jest.fn();
        const state = { conditions: initialConditionsState };

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'conditions/fetchConditionsSuccess', payload: [] });
    });

    it('should dispatch success action when fetch returns some data', async () => {
        // setup
        fetchMock.mockResponseOnce(JSON.stringify({ data: [{ label: 'hello', snippet: 'This is a snippet' }] }));
        const dispatch = jest.fn();
        const state = { conditions: initialConditionsState };

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'conditions/fetchConditionsSuccess',
            payload: [{ label: 'hello', snippet: 'This is a snippet' }],
        });
    });

    it('should dispatch failure action when fetch returns error', async () => {
        // setup
        fetchMock.mockRejectOnce(new Error('Network'));
        const dispatch = jest.fn();
        const state = { conditions: initialConditionsState };

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'conditions/fetchConditionsFailure',
            payload: 'Error: Network',
        });
    });
});
