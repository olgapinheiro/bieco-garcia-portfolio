import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';

import Image from "next/image";

const LOGO_IMAGES = [
  {
    src: 'brands/westin_logo.svg',
    alt: 'Westin',
    width: 60,
    height: 60,
    link: 'https://westin.marriott.com/',
  },
  {
    src: '/brands/ibis_logo.png',
    alt: 'Ibis',
    width: 60,
    height: 60,
    link: 'https://ibis.accor.com',
  },
  {
    src: '/brands/marriott_logo.png',
    alt: 'Marriott',
    width: 60,
    height: 60,
    link: 'https://www.marriott.com/',
  },
  {
    src: '/brands/accor_logo.png',
    alt: 'Accor',
    width: 60,
    height: 60,
    link: 'https://all.accor.com/',
  },
  {
    src: '/brands/ESH_logo.png',
    alt: 'ESH',
    width: 60,
    height: 60,
    link: 'https://eshhotel.com/',
  },
  {
    src: '/brands/cicchetti_logo.png',
    alt: 'CICCHETTI',
    width: 60,
    height: 60,
    link: 'https://bio.site/cicchetti',
  },
  {
    src: '/brands/hotel-boutique_logo.png',
    alt: 'Pedras do Patacho - Hotel Boutique Experience',
    width: 60,
    height: 60,
    link: 'https://pedrasdopatacho.com.br/',
  },
  {
    src: '/brands/armacao_logo.png',
    alt: 'Armação Resort',
    width: 60,
    height: 60,
    link: 'https://www.armacaoresort.com/',
  },
  {
    src: '/brands/kembali_logo.png',
    alt: 'Kembali',
    width: 60,
    height: 60,
    link: 'https://www.kembalihotel.com/',
  },
  {
    src: '/brands/filho-do-vento_logo.png',
    alt: 'Filho do Vento',
    width: 60,
    height: 60,
    link: 'https://filhodovento.com.br/',
  },
  {
    src: '/brands/golden-pineapple_logo.png',
    alt: 'Golden Pineapple Villas',
    width: 60,
    height: 60,
    link: 'https://www.simplebooking.it/ibe2/hotel/6479',
  },
  {
    src: '/brands/filha-da-lua_logo.png',
    alt: 'Filha da Lua Eco Lodge',
    width: 60,
    height: 60,
    link: 'https://filhadalua.com/',
  },
  {
    src: '/brands/ocapora_logo.png',
    alt: 'Ocaporã',
    width: 60,
    height: 60,
    link: 'https://www.ocapora.com.br/',
  },
  {
    src: '/brands/refugio-rio-bonito_logo.png',
    alt: 'Refúgio do Rio Bonito',
    width: 60,
    height: 60,
    link: 'https://www.refugiodoriobonito.com.br/',
  },
  {
    src: '/brands/tabaobi_logo.png',
    alt: 'Tabaobi',
    width: 60,
    height: 60,
    link: 'https://www.tabaobi.com.br/',
  },
  {
    src: '/brands/BYD_logo.png',
    alt: 'BYD',
    width: 60,
    height: 60,
    link: 'https://www.byd.com/',
  },
  {
    src: '/brands/kuat_logo.png',
    alt: 'Kuat',
    width: 60,
    height: 60,
    link: 'https://www.coca-cola.com/br/pt/brands/kuat',
  },
  {
    src: '/brands/ck_logo.png',
    alt: 'Calvin Klein',
    width: 60,
    height: 60,
    link: 'https://www.calvinklein.com',
  },
  {
    src: '/brands/beefeater_logo.png',
    alt: 'BEEFEATER',
    width: 60,
    height: 60,
    link: 'https://www.beefeatergin.com/',
  },
]

export default function BrandsInfiniteSlider() {
  return (
    <div className="mt-12 max-w-4xl">
        <InfiniteSlider gap={24} speed={60} speedOnHover={40}>
          {LOGO_IMAGES.map((logo) => (
            <a href={logo.link || ''} target="_blank" rel="noopener noreferrer" key={logo.alt}>
              <Image
                width={logo.width}
                height={logo.height}
                src={logo.src}
                alt={logo.alt}
                className='h-[40px] w-auto'
              />
            </a>
          ))}
        </InfiniteSlider>
      </div>
  )
}