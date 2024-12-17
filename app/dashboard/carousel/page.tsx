import { createClient } from '@/utils/supabase/server';
import CarouselDataTable from './data-table';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function CarouselManagement() {
  const supabase = await createClient();
  const { data: carouselItems } = await supabase
    .from('carousel_items')
    .select('*')
    .order('created_at', { ascending: true });
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Carousel management</h3>
        <Link href="/dashboard/carousel/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add carousel item
          </Button>
        </Link>
      </div>
      <CarouselDataTable items={carouselItems} />
    </div>
  );
}
