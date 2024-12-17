import { createClient } from '@/utils/supabase/server';
import EditForm from './edit-form';

type CarouselEditProps = {
  params: Promise<{ id: string }>;
};

export default async function CarouselEdit({ params }: CarouselEditProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: carouselItem } = await supabase
    .from('carousel_items')
    .select('*')
    .eq('id', id)
    .single();
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">Edit carousel item</h3>
      <EditForm defaultValues={carouselItem} />
    </div>
  );
}
