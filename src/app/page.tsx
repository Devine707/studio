import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-skincare');
  return (
    <div className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Unlock Your Best Skin with Devine
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Your personal AI skin advisor. Get instant analysis and
                  personalized treatment recommendations by just taking a photo.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="group">
                  <Link href="/scan">
                    Start Your Free Scan
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                width={600}
                height={600}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
