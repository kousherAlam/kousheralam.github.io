import { useReducer } from 'react';

const PkiActions = {
    CreateCa: 'CreateCa'
} as const;

interface PkiActionsType {
    type: keyof typeof PkiActions;
    data?: any;
}

interface CertsState {
    name: string;
    keySize: number;
    algorithm: 'RSA' | 'ECC';
    privateKey: string;
    publicKey: string;
}

interface PkiCA {
    id: string;
    name: string;
}

interface PkiState {
    Ca: PkiCA[];
    Certs: Record<string, CertsState[]>;
}

function handlePkiData(state: PkiState, action: PkiActionsType) {
    console.log(state, action);
    switch (action.type) {
        case PkiActions.CreateCa:
            state.Ca.push(action.data as PkiCA);
            return state;
    }
    return state;
}



export function usePkiData() {
    const [state, dispatch] = useReducer(handlePkiData, { Ca: [], Certs: {} });


    function addNewCa(name: string) {
        dispatch({
            type: PkiActions.CreateCa,
            data: {
                name,
                id: crypto.randomUUID()
            }
        })
    }
    return [state, {
        addNewCa,
    }] as const;
}