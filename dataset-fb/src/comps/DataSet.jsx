export default
  function DataSet({ data, headers, renderData, renderHeaders }) {
  if (headers === null || headers == undefined) {
    headers = Object.keys(data[0]);
  }
  const basic_table = {
    backgroundColor: 'black',
    borderCollapse: 'collapse',
  }
  return (
    <table style={basic_table} >
      {renderHeaders(headers)}
      {renderData(data)}
    </table>
  )
}