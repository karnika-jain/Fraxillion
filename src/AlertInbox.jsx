import { useNavigate } from 'react-router-dom'

const cell = {
  padding: '10px 12px',
  textAlign: 'left',
  borderBottom: '1px solid #e2e6ee'
}

function AlertInbox({ alerts, onCreateCase }) {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Alert Inbox</h1>
      <p>Alerts from different sources, brought into one place.</p>

      <table style={{
        width: '100%',
        background: 'white',
        borderCollapse: 'collapse',
        marginTop: 16
      }}>
        <thead>
          <tr>
            <th style={cell}>Alert ID</th>
            <th style={cell}>Source</th>
            <th style={cell}>Account</th>
            <th style={cell}>Time</th>
            <th style={cell}>Summary</th>
            <th style={cell}>Status</th>
            <th style={cell}>Action</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((a) => (
            <tr key={a.id}>
              <td style={cell}>{a.id}</td>
              <td style={cell}>{a.source}</td>
              <td style={cell}>{a.account}</td>
              <td style={cell}>{a.time}</td>
              <td style={cell}>{a.summary}</td>
              <td style={cell}>{a.status}</td>
              <td style={cell}>
                <button
                  onClick={() => {
                    const created = onCreateCase(a)
                    if (created) navigate('/cases')
                  }}
                  disabled={a.status === 'Case Created'}
                >
                  {a.status === 'Case Created'
                    ? 'Case Created'
                    : 'Create Case'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AlertInbox