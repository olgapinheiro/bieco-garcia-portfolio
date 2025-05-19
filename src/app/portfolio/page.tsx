import Image from "next/image";
import outsides from "../../../public/outsides/8-tabaobi.webp"
import insides from "../../../public/insides/11-filhadaluapipa.webp"
import foodsAndDrinks from "../../../public/foods-and-drinks/2-refugiodoriobonito.webp"
import lifestyle from "../../../public/lifestyle/4_filhadaluapipa.webp"
import destinations from "../../../public/destinations/1-reveilloncarneiros.webp"
import Link from "next/link";

const IMAGES = [
  {
    src: outsides,
    label: 'outsides',
    key: 'outsides',
    position: 'center',
  },
  {
    src: insides,
    label: 'insides',
    key: 'insides',
    position: 'top',
  },
  {
    src: foodsAndDrinks,
    label: 'foods & drinks',
    key: 'foods-and-drinks',
    position: 'center',
  },
  {
    src: lifestyle,
    label: 'lifestyle',
    key: 'lifestyle',
    position: 'center',
  },
  {
    src: destinations,
    label: 'destinations',
    key: 'destinations',
    position: 'center',
  }
]

export default function Portfolio() {
  return (
    <main className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
      {IMAGES.map((image) => (
        <div className="grid grid-cols-1 justify-items-center" key={`cover-${image.key}`}>
          <Link className="relative w-full" href={`portfolio/${image.key}`}>
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

      <div className="grid grid-cols-1 aspect-square">
        <Link
          className="w-full text-center z-0 cursor-pointer border text-black font-lg hover:underline underline-offset-4 flex justify-center items-center"
          href="/about"
        >
          contact
        </Link>
      </div>
    </main>
  );
}
