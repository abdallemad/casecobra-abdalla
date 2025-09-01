import { Icons } from "@/components/globals/Icons";
import MaxWidthWrapper from "@/components/globals/max-width-wrapper";
import Phone from "@/components/globals/phone";
import Reviews from "@/components/landing/reviews";
import { Button } from "@/components/ui/button";
import { FEATURES, LANDING_REVIEWS, USERS_IMG_SRC } from "@/constants";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="hero-container">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="cta-cont">
              <figure className="img-cont">
                <Image
                  src={"/assets/snake-1.png"}
                  alt="Snake Image"
                  width={400}
                  height={200}
                  className="w-24"
                />
              </figure>
              <h1 className="main-heading">
                your image on a <span>custom</span> phone case
              </h1>
              <p className="sub-heading">
                capture your favorite moments with your own,{" "}
                <span>one of one</span> phone-case. ChaseCobra allows to protect
                your memories not not just your phone case.
              </p>
              <ul className="features">
                <div className="space-y-2">
                  {FEATURES.map((f) => (
                    <li key={f}>
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                      {f}
                    </li>
                  ))}
                </div>
              </ul>
              <div className="users-img-cont">
                <ul className="flex -space-x-4">
                  {USERS_IMG_SRC.map((img) => (
                    <Image
                      width={40}
                      height={40}
                      key={img}
                      src={img}
                      alt="User Image"
                      className=""
                    />
                  ))}
                </ul>
                <div className="flex flex-col justify-between items-center sm:items-start mt-4">
                  <FiveStars />
                  <p className="text-muted-foreground">
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="phone-wrapper">
            <div className="relative md:max-w-xl">
              <Image
                src={"/assets/your-image.png"}
                alt="Phone Image"
                width={500}
                height={800}
                className="your-image"
              />
              <Image
                src={"/assets/line.png"}
                alt="Phone Image"
                width={500}
                height={800}
                className="line-image"
              />
              <Phone className="w-64" imgSrc={"/assets/testimonials/1.jpg"} />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-balance text-center !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our{" "}
              <span className="relative px-2">
                customer{" "}
                <Icons.underline className="hidden sm:block pointer-events-none absolute -bottom-6 text-green-600 inset-x-0 " />
              </span>{" "}
              say
            </h2>
            <Image
              width={100}
              height={100}
              src={"/assets/snake-2.png"}
              alt="sank2"
              className="w-24 lg:order-2"
            />
          </div>
          <ul className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            {LANDING_REVIEWS.map((review) => {
              const { name, comment, image, purchase } = review;
              return (
                <li
                  key={name}
                  className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20"
                >
                  <FiveStars className="mb-2" />
                  <div className="text-lg leading-8">
                    <p>
                      {`"`}
                      {comment}
                      {`"`}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Image
                      src={image}
                      alt="user1"
                      width={12 * 16}
                      height={12 * 16}
                      className="rounded-full h-12 w-12 object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">{name}</p>
                      <div className="flex gap-1 5 items-center text-zinc-600">
                        <Check className="h-4 w-4 stroke-[3xp] text-green-600" />{" "}
                        <p className="text-sm">{purchase} </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </MaxWidthWrapper>
        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      
      <section className="py-24">
        <MaxWidthWrapper>
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl ms:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-balance text-center !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Upload your photo and get{" "}
                <span className="relative px-2 bg-green-600 text-white rounded">
                  your own case{" "}
                </span>{" "}
                now
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8 ">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40 ">
              <Image
                width={100}
                height={200}
                src={"/assets/arrow.png"}
                alt="arrow"
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
              />
              <div className="relative h-80 md:h-full w-[70%] md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl ">
                <Image
                  width={400}
                  height={800}
                  src={"/assets/horse.jpg"}
                  alt="horse"
                  className="object-cover rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                />
              </div>
              <Phone imgSrc={"/assets/horse.jpg"} className="w-[250px]" />
            </div>
          </div>

          <div className="max-w-prose mt-12 mx-auto sm:text-lg space-y-2 w-fit text-muted-foreground">
            <ul className="space-y-2 mt-8 font-medium flex flex-col items-center sm:items-start">
              {FEATURES.map((ftr, i) => {
                return (
                  <li
                    className="flex gap-1.5 items-center text-left w-fit"
                    key={i}
                  >
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    {ftr}
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-center">
              <Button asChild size={"lg"} className="mx-auto mt-8">
                <Link href={"/configure/upload"}>
                  Create your case now <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}

function FiveStars({ className }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <Star className="h-4 w-4 text-green-600 fill-green-600" key={i} />
        );
      })}
    </div>
  );
}
