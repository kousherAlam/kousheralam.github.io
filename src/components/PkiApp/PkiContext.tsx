import { createContext, useContext, useReducer } from "react";

interface CertsState {
  name: string;
  keySize: number;
  algorithm: "RSA" | "ECC";
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
const PkiActions = {
  CreateCa: "CreateCa",
} as const;

interface PkiActionsType {
  type: keyof typeof PkiActions;
  data?: any;
}

interface PkiCtxState {
  state: PkiState;
  addNewCa: (name: string) => void;
}

const pkiContext = createContext<PkiCtxState>({
  state: { Ca: [], Certs: {} },
  addNewCa: () => {},
});

function handlePkiData(state: PkiState, action: PkiActionsType) {
  console.log(state, action);
  switch (action.type) {
    case PkiActions.CreateCa:
      state.Ca.push(action.data as PkiCA);
      return state;
  }
  return state;
}

export function usePkiContext() {
  return useContext(pkiContext);
}

export function PkiContextProvider({ children }) {
  const [state, dispatch] = useReducer(handlePkiData, {
    Ca: [],
    Certs: {},
  });

  function addNewCa(name: string) {
    console.log("add new ca called with name: ", name);
    dispatch({
      type: PkiActions.CreateCa,
      data: {
        name,
        id: crypto.randomUUID(),
      },
    });
  }
  return (
    <pkiContext.Provider value={{ state, addNewCa }}>
      {children}
    </pkiContext.Provider>
  );
}
