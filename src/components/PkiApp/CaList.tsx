import { Fragment } from "react";
import { usePkiContext } from "./PkiContext";

export function CaLists() {
  const { state } = usePkiContext();

  if (state.Ca.length === 0) {
    return <></>;
  }

  return (
    <>
      <p>Certificates</p>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Certificates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.Ca.map((ca) => {
            return (
              <Fragment key={ca.id}>
                <tr className="border-b-0">
                  <td>{ca.id}</td>
                  <td>{ca.name}</td>
                  <td>5 Certificates</td>
                  <td className="flex gap-2 flex-wrap" rowSpan={0}>
                    <button className="btn">Delete</button>
                    <button className="btn-primary">Export</button>
                    <button className="btn-primary">Export</button>
                    <button className="btn-primary">Export</button>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
