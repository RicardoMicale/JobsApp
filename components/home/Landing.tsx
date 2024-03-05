import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../common/Navbar';

export default function Landing() {
  return (
    <div className="h-screen">
      <Navbar />
      <section className="h-full relative flex flex-col items-center justify-center">
        <Image
          width={500}
          height={500}
          src="/assets/landing.png"
          alt="landing-image"
          className="w-full h-full absolute z-10"
        />
        <main className="z-10 flex flex-col items-center justify-center gap-12">
          <h1 className="flex flex-col md:flex-row items-center gap-4 md:gap-16 justify-center text-white font-bold text-2xl md:text-3xl lg:text-4xl">
            <p>
              <span className="text-primary">E</span>xplora.
            </p>
            <p>
              <span className="text-primary">Apl</span>ica.
            </p>
            <p>
              <span className="text-primary">Trabaja</span>.
            </p>
          </h1>
          <p className="text-white text-opacity-45 text-center w-5/6 md:w-11/12 lg:w-full">
            Consigue las ofertas de trabajo que más buscas y aplica con
            facilidad.
          </p>
          <Button asChild className="mt-8 gap-2">
            <Link href="/auth/register">
              Comienza a buscar <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </main>
      </section>
    </div>
  );
}
