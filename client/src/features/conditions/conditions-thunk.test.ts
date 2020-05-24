import { RootState } from './../../app/store';
import { fetchConditions } from './conditions-thunk';
import { initialConditionsState } from './conditions-slice';
import fetchMock from 'jest-fetch-mock';

describe('Conditions thunk', () => {
    const state: RootState = { conditionsSlice: initialConditionsState };

    it('should dispatch start action when fetch works', async () => {
        // setup
        const dispatch = jest.fn();

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'conditions/fetchConditionsStart' });
    });

    it('should dispatch success action when fetch returns empty data', async () => {
        // setup
        fetchMock.mockResponseOnce(JSON.stringify({ conditions: [] }));
        const dispatch = jest.fn();

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'conditions/fetchConditionsSuccess', payload: [] });
    });

    it('should dispatch success action when fetch returns one item of data', async () => {
        // setup
        fetchMock.mockResponseOnce(JSON.stringify({ conditions: [{ label: 'hello', snippet: 'This is a snippet' }] }));
        const dispatch = jest.fn();

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'conditions/fetchConditionsSuccess',
            payload: [{ label: 'hello', snippet: 'This is a snippet' }],
        });
    });

    it('should dispatch success action with data sorted when fetch returns some data', async () => {
        // setup
        fetchMock.mockResponseOnce(
            JSON.stringify({
                conditions: [
                    { label: 'hello', snippet: 'This is a snippet' },
                    { label: 'frank', snippet: 'This is another snippet' },
                ],
            }),
        );
        const dispatch = jest.fn();

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'conditions/fetchConditionsSuccess',
            payload: [
                { label: 'frank', snippet: 'This is another snippet' },
                { label: 'hello', snippet: 'This is a snippet' },
            ],
        });
    });

    it('should dispatch success action with data sorted in original order when fetch returns some data', async () => {
        // setup
        fetchMock.mockResponseOnce(
            JSON.stringify({
                conditions: [
                    { label: 'hello', snippet: 'This is a snippet' },
                    { label: 'hello', snippet: 'This is another snippet' },
                ],
            }),
        );
        const dispatch = jest.fn();

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'conditions/fetchConditionsSuccess',
            payload: [
                { label: 'hello', snippet: 'This is a snippet' },
                { label: 'hello', snippet: 'This is another snippet' },
            ],
        });
    });

    it('should dispatch success action with data sorted in order when fetch returns some data', async () => {
        // setup
        fetchMock.mockResponseOnce(
            JSON.stringify({
                conditions: [
                    { label: 'frank', snippet: 'A snippet' },
                    { label: 'hello', snippet: 'This is a snippet' },
                    { label: 'abba', snippet: 'This is another snippet' },
                ],
            }),
        );
        const dispatch = jest.fn();

        // action
        await fetchConditions()(dispatch, () => state, null);

        // verify
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'conditions/fetchConditionsSuccess',
            payload: [
                { label: 'abba', snippet: 'This is another snippet' },
                { label: 'frank', snippet: 'A snippet' },
                { label: 'hello', snippet: 'This is a snippet' },
            ],
        });
    });

    it('should dispatch failure action when fetch returns error', async () => {
        // setup
        fetchMock.mockRejectOnce(new Error('Network'));
        const dispatch = jest.fn();

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
