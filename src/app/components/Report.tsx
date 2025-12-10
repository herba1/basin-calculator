export default function Report(data: any) {
  return (
    <div>
      {data ? (
        <div>
          <h1>Create a report first</h1>
        </div>
      ) : (
        <div>
          <h1>3 million dollars</h1>
        </div>
      )}
    </div>
  );
}
