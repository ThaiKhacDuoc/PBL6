import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import Banner from '../../components/Banner/Banner'
import Subscribe from '../../components/Subscribe/Subscribe'
import Banner2 from '../../components/Banner/Banner2'
import Footer from '../../components/Footer/Footer'

export const metadata: Metadata = {
  title: 'E-learning',
  description: 'App supports learning japan online'
}

export default function Index() {
  const t = useTranslations('index')
  return (
    <main className='overflow-x-hidden'>
      <Hero />
      <Services />
      <Banner />
      <Subscribe />
      <Banner2 />
      <Footer />
    </main>
  )
}
