import { InfiniteSlider } from '../../../components/motion-primitives/infinite-slider';

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

export default function About() {
  return (
    <main className="flex flex-col place-items-center p-8 sm:p-16 lg:p-20 overflow-hidden">
      <div className="text-center font-medium text-lg max-w-2xl mb-8">
        Elevating Hospitality Brands with Compelling Visual Narratives.
      </div>

      <div className="flex justify-center space-y-4 sm:space-x-4 max-w-4xl flex-wrap sm:flex-nowrap">
        <div className="flex justify-start items-start">
          <Image
            width="1138"
            height="1138"
            src="/about/biecogarcia.webp"
            alt=""
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: 'contain',
            }}
            loading="eager"
          />
        </div>
        <div className="leading-6">
          <div className="text-justify leading-6">
            <p className="mb-2">
              A photographer with a keen artistic eye and solid technical mastery.
            </p>

            <p className="mb-2">
              Post-graduated in Photography from the prestigious Academy of Fine Arts of Lisbon, he brings over 8 years of professional expertise to the Hospitality industry, establishing himself as a key figure in Pernambuco, Brazil.
            </p>

            <p className="mb-2">
              His extensive portfolio features collaborations with more than 30 properties, including renowned international brands like Marriott and Accor, alongside a diverse range of hotels, resorts, guesthouses, and Airbnbs.
            </p>

            <p className="mb-2">
              His evocative imagery goes beyond aesthetics, translating core concepts into visuals that highlight architectural nuances and, crucially, convey the unique ambiance and experience of each location, captivating potential clientele. His versatility extends to gastronomy, fashion, product, and event photography, consistently delivering impactful visuals.
            </p>

            <p className="mb-8">
              By strategically combining technical proficiency with an astute understanding of light, he partners with brands and professionals seeking to enhance their market perception and achieve greater visibility.
            </p>
          </div>
        </div>
      </div>

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
    </main>
  );
}
