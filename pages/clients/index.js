import Link from 'next/link';
import styles from '@/styles/Home.module.css'

function ClientPage() {
  const clients = [
    {id: 'max', name: 'Max'},
    {id: 'manu', name: 'Manuel'}
  ]
  return (
    <>
      <main className={styles.main}>
        <h1>Hello The Clients Page</h1>
        <ul>
          {clients.map(client => (
            <li>
            <Link href={{
              pathname: '/clients/[id]',
              query: {id: client.id}
            }}> The {`${client.name}`} Page</Link>
          </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default ClientPage;