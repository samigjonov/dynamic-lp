import { FadeIn } from '@/components/fade-in';
import Image from 'next/image';

export function AboutUs() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <FadeIn>
          <Image
            src="https://placehold.co/400x400/png"
            alt="About Us"
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
        </FadeIn>
        <FadeIn>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">About Us</h2>
            <p className="text-muted-foreground">
              We are dedicated to providing high-quality offline learning experiences. Our center
              combines traditional teaching methods with modern learning approaches to ensure the
              best possible educational outcomes for our students.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
