import reducer, {fetchConditionsStart, initialConditionsState, fetchConditionsSuccess, fetchConditionsFailure} from './conditions-slice';

describe('Conditions slice', () => {
    it('should set state for start', () => {
        // action
        const result = reducer(initialConditionsState, fetchConditionsStart());

        // verify
        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
        expect(result.conditions).toEqual([])
    })
    
    it('should set state for success with empty', () => {
        // action
        const result = reducer(initialConditionsState, fetchConditionsSuccess([]));

        // verify
        expect(result.isLoading).toBe(false);
        expect(result.error).toBeNull();
        expect(result.conditions).toEqual([])
    })

    it('should set state for success with 1 condition', () => {
        // action
        const result = reducer(initialConditionsState, fetchConditionsSuccess([{ label: 'Virus', snippet: 'A small virus', synonyms: [], 
        keywords: [] }]));

        // verify
        expect(result.isLoading).toBe(false);
        expect(result.error).toBeNull();
        expect(result.conditions).toEqual([{ label: 'Virus', snippet: 'A small virus',synonyms: [], keywords: [] }])
    })

    it('should set state for success with 2 conditions', () => {
        // action
        const result = reducer(initialConditionsState, fetchConditionsSuccess([{ label: 'Virus', snippet: 'A small virus', synonyms: [], keywords: [] }, { label: 'Virus -2', snippet: 'A second virus', synonyms: [], keywords: [] }]));

        // verify
        expect(result.isLoading).toBe(false);
        expect(result.error).toBeNull();
        expect(result.conditions.length).toBe(2)
        expect(result.conditions).toEqual([{ label: 'Virus', snippet: 'A small virus',synonyms: [], keywords: [] }, { label: 'Virus -2', snippet: 'A second virus', synonyms: [], keywords: [] }])
    })

    it('should set state for failure', () => {
        // action
        const result = reducer(initialConditionsState, fetchConditionsFailure('Database unavailable'));

        // verify
        expect(result.isLoading).toBe(false);
        expect(result.error).toBe('Database unavailable');
        expect(result.conditions.length).toBe(0)
    })

    it('should reset state for start from success', () => {
        // setup
        const initial = {isLoading: false, conditions: [{ label: 'Virus', snippet: 'A small virus', synonyms: [], keywords: [] }], error: null}
        // action
        const result = reducer(initial, fetchConditionsStart());

        // verifys
        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
        expect(result.conditions.length).toBe(0)
    })

    it('should reset state for start from error', () => {
        // setup
        const initial = {isLoading: false, conditions: [], error: 'No valid data'}
        // action
        const result = reducer(initial, fetchConditionsStart());

        // verifys
        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
        expect(result.conditions.length).toBe(0)
    })
})
