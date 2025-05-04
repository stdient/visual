import './App.css'

export default
  function DataSet({ headers, data, renderHeaders, renderDataRow }) {
  if (headers === undefined || headers === null) {
    headers = Object.keys(data[0]);
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {renderHeaders(headers)}
        </tr>
      </thead>

      <tbody>
        {
          data.map((object, row_id) => {
            return (
              renderDataRow(
                object,
                row_id
              )
            )
          })
        }
      </tbody>
    </table>
  )
}