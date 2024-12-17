'use client';

import { useRouter } from 'next/navigation';
import CarouselForm, { CarouselFormValues } from '../form';
import { createCarouselItem } from './actions';
import { toast } from '@/hooks/use-toast';

export default function CreateForm() {
  const router = useRouter();
  const handleCreate = async (values: CarouselFormValues) => {
    const result = await createCarouselItem(values);
    if (result.success) {
      toast({
        title: 'Carousel item created',
        description: 'The carousel item has been created successfully',
      });
      router.push('/dashboard/carousel');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error occurred',
        description: result.error,
      });
    }
  };
  return <CarouselForm onSubmit={handleCreate} />;
}
