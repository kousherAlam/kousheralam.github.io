import { useState } from "react";
import { CaLists } from "./CaList";
import { PkiContextProvider, usePkiContext } from "./PkiContext";

export function PkiApp() {
  const [isCaDialogOpen, setCaDialogOpen] = useState(false);
  return (
    <PkiContextProvider>
      <>
        <div className="grid grid-cols-12">
          <div className="col-span-10">
            <p>All CA</p>
          </div>
          <div className="col-span-2">
            {!isCaDialogOpen && (
              <button onClick={() => setCaDialogOpen(true)} className="btn">
                Start New CA
              </button>
            )}
          </div>
        </div>
        <div style={{ display: isCaDialogOpen ? "block" : "none" }}>
          <NewCaForm setCaDialogOpen={setCaDialogOpen} />
        </div>
        <div style={{ display: isCaDialogOpen ? "none" : "block" }}>
          <CaLists />
        </div>
      </>
    </PkiContextProvider>
  );
}

function NewCaForm({ setCaDialogOpen }) {
  const { addNewCa } = usePkiContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setCaDialogOpen(false);
      }}
    >
      <div className="grid gap-2 grid-cols-2">
        <div className="grid gap-2 grid-cols-1">
          <input
            type="text"
            className="text-black"
            name="ca-name"
            placeholder="ca name"
          />
        </div>
        <div className="grid gap-2 grid-cols-1"></div>
      </div>
      <div className="flex gap-2 mt-4 justify-end">
        <button onClick={() => setCaDialogOpen(false)} className="btn">
          Cancel
        </button>
        <button
          onClick={() => {
            addNewCa("NewCA");
          }}
          className="btn-primary"
        >
          Create
        </button>
      </div>
    </form>
  );
}
