'use client';

import { CarouselItem } from '@/shared/types/carousel-item.type';
import CarouselForm, { CarouselFormValues } from '../../form';
import { updateCarouselItem } from './actions';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type EditFormProps = {
  defaultValues: CarouselItem;
};

export default function EditForm({ defaultValues }: EditFormProps) {
  const router = useRouter();
  const handleUpdate = async (values: CarouselFormValues) => {
    const result = await updateCarouselItem(defaultValues.id, values);
    if (result.success) {
      toast({
        title: 'Carousel item updated',
        description: 'The carousel item has been updated successfully',
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

  return <CarouselForm onSubmit={handleUpdate} defaultValues={defaultValues} isEdit />;
}
