


const cell = {
  padding: '10px 12px',
  textAlign: 'left',
  borderBottom: '1px solid #e2e6ee'
}

function Cases({ cases }) {
  return (
    <div>
      <h1>Cases</h1>
      <p>Track and manage suspicious activity investigations.</p>

      <table style={{
        width: '100%',
        background: 'white',
        borderCollapse: 'collapse',
        marginTop: 16
      }}>
        <thead>
          <tr>
            <th style={cell}>Case ID</th>
            <th style={cell}>Alert ID</th>
            <th style={cell}>Account</th>
            <th style={cell}>Risk Level</th>
            <th style={cell}>Assigned To</th>
            <th style={cell}>Status</th>
            <th style={cell}>Summary</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((c) => (
            <tr key={c.id}>
              <td style={cell}>{c.id}</td>
              <td style={cell}>{c.alertId}</td>
              <td style={cell}>{c.account}</td>
              <td style={cell}>{c.riskLevel}</td>
              <td style={cell}>{c.assignedTo}</td>
              <td style={cell}>{c.status}</td>
              <td style={cell}>{c.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Cases
