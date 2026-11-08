import { useState } from 'react'
import { reports } from './data/reports'

const cell = {
  padding: '10px 12px',
  textAlign: 'left',
  borderBottom: '1px solid #e2e6ee'
}

const labelStyle = {
  fontSize: 13,
  fontWeight: 'bold',
  marginBottom: 4
}

const inputBase = {
  padding: 8,
  width: '100%',
  boxSizing: 'border-box'
}

// Adds working days to a date. Saturdays and Sundays are skipped. Public holidays are not.
function addWorkingDays(startDate, days) {
  const result = new Date(startDate)
  let added = 0

  while (added < days) {
    result.setDate(result.getDate() + 1)
    const day = result.getDay()
    if (day !== 0 && day !== 6) {
      added++
    }
  }

  return result
}

function ReadOnlyField({ label, value }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={labelStyle}>{label}</div>
      <div style={{ padding: 8, background: '#eef1f6' }}>{value}</div>
    </div>
  )
}

function EditableField({ label, value, onChange, type }) {
  const isMissing = !value.trim()

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={labelStyle}>{label}</div>
      <input
        type={type || 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...inputBase,
          border: isMissing ? '2px solid #b00020' : '1px solid #c9d0dc'
        }}
      />
      {isMissing && (
        <div style={{ color: '#b00020', fontSize: 13, marginTop: 4 }}>
          Required field missing
        </div>
      )}
    </div>
  )
}

function Reports({ cases }) {
  const [selectedId, setSelectedId] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [amount, setAmount] = useState('')
  const [suspicionDate, setSuspicionDate] = useState('')

  const selectedCase = cases.find((c) => c.id === selectedId)

  function handleSelect(event) {
    setSelectedId(event.target.value)
    setCustomerName('')
    setAmount('')
    setSuspicionDate('')
  }

  let deadline = null
  let daysLeft = null

  if (suspicionDate) {
    deadline = addWorkingDays(new Date(suspicionDate + 'T00:00:00'), 7)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    daysLeft = Math.round((deadline - today) / 86400000)
  }

  const missing = []
  if (!customerName.trim()) missing.push('Customer name')
  if (!amount.trim()) missing.push('Transaction amount')
  if (!suspicionDate) missing.push('Date the investigator became satisfied')

  return (
    <div>
      <h1>Reports</h1>
      <p>View and track investigation reports.</p>

      <table style={{
        width: '100%',
        background: 'white',
        borderCollapse: 'collapse',
        marginTop: 16
      }}>
        <thead>
          <tr>
            <th style={cell}>Report ID</th>
            <th style={cell}>Case ID</th>
            <th style={cell}>Report Type</th>
            <th style={cell}>Created By</th>
            <th style={cell}>Date</th>
            <th style={cell}>Status</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td style={cell}>{report.id}</td>
              <td style={cell}>{report.caseId}</td>
              <td style={cell}>{report.type}</td>
              <td style={cell}>{report.createdBy}</td>
              <td style={cell}>{report.date}</td>
              <td style={cell}>{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40 }}>Draft STR Assistant</h2>
      <p>
        Pick a case. Known details fill in automatically, and anything still
        missing is shown in red. The fields here are illustrative and must be
        checked against the official FIU-IND format.
      </p>

      <select
        value={selectedId}
        onChange={handleSelect}
        style={{ padding: 8, marginBottom: 20 }}
      >
        <option value="">Select a case</option>
        {cases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.id} - {c.summary}
          </option>
        ))}
      </select>

      {selectedCase && (
        <div style={{ background: 'white', padding: 20, maxWidth: 600 }}>
          <ReadOnlyField label="Case ID" value={selectedCase.id} />
          <ReadOnlyField label="Source alert" value={selectedCase.alertId} />
          <ReadOnlyField label="Account" value={selectedCase.account} />
          <ReadOnlyField label="Risk level" value={selectedCase.riskLevel} />
          <ReadOnlyField label="Reason for suspicion" value={selectedCase.summary} />

          <EditableField
            label="Customer name"
            value={customerName}
            onChange={setCustomerName}
          />
          <EditableField
            label="Transaction amount (Rs)"
            value={amount}
            onChange={setAmount}
          />
          <EditableField
            label="Date the investigator became satisfied the transaction is suspicious"
            value={suspicionDate}
            onChange={setSuspicionDate}
            type="date"
          />

          <div style={{ marginTop: 20, padding: 12, background: '#eef1f6' }}>
            <div style={labelStyle}>Deadline for the STR</div>
            {deadline ? (
              <div>
                <div>Due by {deadline.toDateString()}</div>
                <div style={{
                  fontWeight: 'bold',
                  color: daysLeft <= 2 ? '#b00020' : '#1b7a3a'
                }}>
                  {daysLeft >= 0
                    ? daysLeft + ' calendar days left'
                    : 'Overdue by ' + Math.abs(daysLeft) + ' days'}
                </div>
              </div>
            ) : (
              <div>Enter the date above to start the countdown.</div>
            )}
          </div>

          <div style={{ marginTop: 16, fontWeight: 'bold' }}>
            {missing.length === 0
              ? 'All required fields are filled.'
              : 'Missing fields: ' + missing.join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports