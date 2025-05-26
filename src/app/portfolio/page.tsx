import Image from "next/image";
import outsides from "../../../public/outsides/8-tabaobi.webp"
import insides from "../../../public/insides/11-filhadaluapipa.webp"
import foodsAndDrinks from "../../../public/foods-and-drinks/2-refugiodoriobonito.webp"
import lifestyle from "../../../public/lifestyle/4_filhadaluapipa.webp"
import destinations from "../../../public/destinations/1-reveilloncarneiros.webp"
import about from "../../../public/about/biecogarcia.webp"
import Link from "next/link";

const IMAGES = [
  {
    src: outsides,
    label: 'outsides',
    key: 'outsides',
    link: 'portfolio/outsides',
    position: 'center',
  },
  {
    src: insides,
    label: 'insides',
    key: 'insides',
    link: 'portfolio/insides',
    position: 'top',
  },
  {
    src: foodsAndDrinks,
    label: 'foods & drinks',
    key: 'foods-and-drinks',
    link: 'portfolio/foods-and-drinks',
    position: 'center',
  },
  {
    src: lifestyle,
    label: 'lifestyle',
    key: 'lifestyle',
    link: 'portfolio/lifestyle',
    position: 'center',
  },
  {
    src: destinations,
    label: 'destinations',
    key: 'destinations',
    link: 'portfolio/destinations',
    position: 'center',
  },
  {
    src: about,
    label: 'about',
    key: 'about',
    link: 'about',
    position: 'center',
  }
]

export default function Portfolio() {
  return (
    <main className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
      {IMAGES.map((image) => (
        <div className="grid grid-cols-1 justify-items-center" key={`cover-${image.key}`}>
          <Link className="relative w-full" href={image.link}>
            <Image
              width="1138"
              height="1138"
              src={image.src}
              alt=""
              // sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover aspect-square"
              style={{
                objectPosition: `${image.position}`,
              }}
            />
          </Link>
          <div className="py-4">{ image.label }</div>
        </div>
      ))}
    </main>
  );
}
