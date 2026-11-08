import { useEffect, useState } from 'react'
import { evidence } from './data/evidence'

const cell = {
  padding: '10px 12px',
  textAlign: 'left',
  borderBottom: '1px solid #e2e6ee'
}

const button = {
  padding: '8px 14px',
  marginRight: 10,
  cursor: 'pointer'
}

// Turns any text into a fixed-length fingerprint (SHA-256 hash).
async function sha256(text) {
  const bytes = new TextEncoder().encode(text)
  const buffer = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// Joins the important fields of one entry into one piece of text.
function contentOf(item) {
  return [
    item.id,
    item.caseId,
    item.type,
    item.description,
    item.uploadedBy,
    item.date,
    item.status
  ].join('|')
}

// Gives every entry a fingerprint that also includes the previous entry's fingerprint.
async function buildChain(items) {
  const chain = []
  let previousHash = 'GENESIS'

  for (const item of items) {
    const hash = await sha256(previousHash + '|' + contentOf(item))
    chain.push({ ...item, previousHash, hash })
    previousHash = hash
  }

  return chain
}

// Recalculates each fingerprint. Returns the position of the first mismatch, or -1 if all match.
async function checkChain(chain) {
  let previousHash = 'GENESIS'

  for (let i = 0; i < chain.length; i++) {
    const expected = await sha256(previousHash + '|' + contentOf(chain[i]))
    if (expected !== chain[i].hash) {
      return i
    }
    previousHash = chain[i].hash
  }

  return -1
}

function EvidenceVault() {
  const [chain, setChain] = useState([])
  const [brokenIndex, setBrokenIndex] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    buildChain(evidence).then(setChain)
  }, [])

  async function handleVerify() {
    const index = await checkChain(chain)

    if (index === -1) {
      setBrokenIndex(null)
      setMessage('Chain intact: every entry matches its fingerprint.')
    } else {
      setBrokenIndex(index)
      setMessage(
        `Chain broken at ${chain[index].id}: its content no longer matches its fingerprint.`
      )
    }
  }

  function handleTamper() {
    setChain((current) =>
      current.map((item, i) =>
        i === 1
          ? { ...item, description: 'Edited after upload (tampered)' }
          : item
      )
    )
    setMessage('EVD-002 was edited. Click Verify chain to check.')
  }

  async function handleReset() {
    const fresh = await buildChain(evidence)
    setChain(fresh)
    setBrokenIndex(null)
    setMessage('Chain reset to the original entries.')
  }

  function rowColour(index) {
    if (brokenIndex === null) return 'white'
    if (index === brokenIndex) return '#fde2e2'
    if (index > brokenIndex) return '#fff4d6'
    return 'white'
  }

  return (
    <div>
      <h1>Evidence Vault</h1>
      <p>Evidence linked to investigations, protected by a fingerprint chain.</p>

      <div style={{ margin: '16px 0' }}>
        <button style={button} onClick={handleVerify}>Verify chain</button>
        <button style={button} onClick={handleTamper}>Simulate tampering</button>
        <button style={button} onClick={handleReset}>Reset</button>
      </div>

      {message && (
        <p style={{ fontWeight: 'bold', color: brokenIndex !== null ? '#b00020' : '#1b7a3a' }}>
          {message}
        </p>
      )}

      <table style={{
        width: '100%',
        background: 'white',
        borderCollapse: 'collapse',
        marginTop: 16
      }}>
        <thead>
          <tr>
            <th style={cell}>Evidence ID</th>
            <th style={cell}>Case ID</th>
            <th style={cell}>Type</th>
            <th style={cell}>Description</th>
            <th style={cell}>Uploaded By</th>
            <th style={cell}>Date</th>
            <th style={cell}>Status</th>
            <th style={cell}>Previous fingerprint</th>
            <th style={cell}>Fingerprint</th>
          </tr>
        </thead>

        <tbody>
          {chain.map((item, index) => (
            <tr key={item.id} style={{ background: rowColour(index) }}>
              <td style={cell}>{item.id}</td>
              <td style={cell}>{item.caseId}</td>
              <td style={cell}>{item.type}</td>
              <td style={cell}>{item.description}</td>
              <td style={cell}>{item.uploadedBy}</td>
              <td style={cell}>{item.date}</td>
              <td style={cell}>{item.status}</td>
              <td style={cell}>{item.previousHash.slice(0, 10)}...</td>
              <td style={cell}>{item.hash.slice(0, 10)}...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EvidenceVault