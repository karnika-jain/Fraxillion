import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import AlertInbox from './AlertInbox'
import Cases from './Cases'
import EvidenceVault from './EvidenceVault'
import Reports from './Reports'

import { alerts as initialAlerts } from './data/alerts'
import { cases as initialCases } from './data/cases'

function Page({ title, text }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}

function App() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [cases, setCases] = useState(initialCases)

  function handleCreateCase(selectedAlert) {
    const alreadyExists = cases.some(
      (item) => item.alertId === selectedAlert.id
    )

    if (alreadyExists) {
      window.alert('A case already exists for this alert.')
      return false
    }

    const newCase = {
      id: `CASE-${String(cases.length + 1).padStart(3, '0')}`,
      alertId: selectedAlert.id,
      account: selectedAlert.account,
      riskLevel: 'Not assessed',
      assignedTo: 'Unassigned',
      status: 'Open',
      summary: selectedAlert.summary
    }

    setCases((previousCases) => [...previousCases, newCase])

    setAlerts((previousAlerts) =>
      previousAlerts.map((item) =>
        item.id === selectedAlert.id
          ? { ...item, status: 'Case Created' }
          : item
      )
    )

    return true
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Page
                title="Dashboard"
                text="Summary of open cases and deadlines will appear here."
              />
            }
          />

          <Route
            path="/alerts"
            element={
              <AlertInbox
                alerts={alerts}
                onCreateCase={handleCreateCase}
              />
            }
          />

          <Route
            path="/cases"
            element={<Cases cases={cases} />}
          />

          <Route
            path="/evidence"
            element={<EvidenceVault />}
          />

          <Route
            path="/reports"
            element={<Reports cases={cases} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App