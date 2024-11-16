import { usePkiData } from "./usePkiData";

export function CaLists() {
  const [pkiState] = usePkiData();
  console.log(pkiState);

  if (pkiState.Ca.length === 0) {
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
          </tr>
        </thead>
        <tbody>
          {pkiState.Ca.map((ca) => {
            return (
              <tr key={ca.id}>
                <td>{ca.id}</td>
                <td>{ca.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
