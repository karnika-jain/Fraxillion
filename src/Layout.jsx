import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Inbox, FolderOpen, ShieldCheck, FileText, Search } from 'lucide-react'

const links = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Alert Inbox', path: '/alerts', icon: Inbox },
  { name: 'Cases', path: '/cases', icon: FolderOpen },
  { name: 'Evidence Vault', path: '/evidence', icon: ShieldCheck },
  { name: 'Reports', path: '/reports', icon: FileText },
]

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: 220, background: '#0f1b33', color: 'white', padding: 20 }}>
        <h2 style={{ marginBottom: 30 }}>CaseTrail</h2>
        {links.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              marginBottom: 4,
              borderRadius: 6,
              color: 'white',
              textDecoration: 'none',
              background: isActive ? '#1f3a6b' : 'transparent',
            })}
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </aside>

      <div style={{ flex: 1, background: '#f5f7fa' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', background: 'white', borderBottom: '1px solid #e2e6ee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search size={18} />
            <input placeholder="Search cases, accounts..." style={{ border: 'none', outline: 'none' }} />
          </div>
          <span>Investigator: A. Sharma</span>
        </header>

        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  )
}

export default Layout