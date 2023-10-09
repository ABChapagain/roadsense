import Sidebar from './components/Sidebar'
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'Roadsense - Stay Safe, Instant Alert',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} flex h-screen`}>
        <Sidebar />
        <main className='p-5 flex-grow'>{children}</main>
      </body>
    </html>
  )
}
