'use server';

import { createClient } from '@/utils/supabase/server';
import { CarouselFormValues } from '../form';

export async function createCarouselItem(values: CarouselFormValues) {
  const supabase = await createClient();
  const { error } = await supabase.from('carousel_items').insert(values);
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
