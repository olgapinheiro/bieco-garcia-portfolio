import Image from "next/image";

export default function About() {
  return (
    <main className="flex flex-col place-items-center p-8 sm:p-16 lg:p-20">
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

          <div className="font-medium text-center">
            <p
              className="text-center"
            >
              <a
                href="mailto:garciabieco@gmail.com"
                className="font-bold text-xl hover:underline cursor-pointer text-center"
              >
                garciabieco@gmail.com
              </a>
            </p>

            <p
              className="text-center"
            >
              <a
                href="https://www.instagram.com/bieco.garcia/"
                target="_blank"
                className="font-bold text-xl hover:underline cursor-pointer text-center"
              >
                @bieco.garcia
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
