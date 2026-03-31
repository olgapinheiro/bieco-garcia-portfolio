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
    src: 'brands/westin_logo.svg',
    alt: 'Ibis',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Marriot',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Accor',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'ESH',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'CICCHETTI',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Hotel Boutique Expérience',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Armação Resort',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Kembali',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Filho do Vento',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Golden Pineapple Village',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Filha da Lua Eco Lodge',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Ocaporã',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Refúgio do Rio Bonito',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Tabaobi',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'BYD',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Kuat',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'Calvin Klein',
    width: 60,
    height: 60,
    link: '',
  },
  {
    src: 'brands/westin_logo.svg',
    alt: 'BEEFEATER',
    width: 60,
    height: 60,
    link: '',
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
            <a href={logo.link} target="_blank" rel="noopener noreferrer" key={logo.alt}>
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
