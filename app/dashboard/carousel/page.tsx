import { createClient } from '@/utils/supabase/server';
import CarouselDataTable from './data-table';

export default async function CarouselManagement() {
  const supabase = await createClient();
  const { data: carouselItems } = await supabase.from('carousel_items').select('*');
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">Carousel management</h3>
      <CarouselDataTable items={carouselItems} />
    </div>
  );
}
