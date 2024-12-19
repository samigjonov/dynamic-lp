import { createClient } from '@/utils/supabase/server';
import ContactSubmissionsDataTable from './data-table';

export default async function ContactSubmissions() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('contact_form_submissions')
    .select('*')
    .order('created_at', { ascending: true });
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold">Contact Submissions management</h3>
      <ContactSubmissionsDataTable items={data} />
    </div>
  );
}
