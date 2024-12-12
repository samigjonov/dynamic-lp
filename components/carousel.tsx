'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from './fade-in';
import Link from 'next/link';

type CarouselItem = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  cta_text: string;
  cta_link: string;
};

type CarouselProps = {
  items: CarouselItem[];
};

export function Carousel({ items }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <FadeIn>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {items.map((item) => (
              <div key={item.id} className="relative min-w-0 flex-[0_0_100%]">
                <div className="relative h-[600px] w-full bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="mx-auto max-w-3xl space-y-4 px-4 text-center">
                      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                        {item.title}
                      </h1>
                      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        {item.description}
                      </p>
                      <Link href={item.cta_link}>
                        <Button size="lg" className="mt-4">
                          {item.cta_text}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </FadeIn>
  );
}
