import { createClient } from '@/utils/supabase/server';
import AboutForm from './form';

export default async function AboutManagement() {
  const supabase = await createClient();
  const { data: aboutUs } = await supabase.from('about_us').select().single();
  return <AboutForm aboutUs={aboutUs} />;
}
