'use client';

import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ContactFormSubmission } from '@/shared/types/contact-form-submission.type';
import { updateContactSubmission } from './actions';
import { toast } from '@/hooks/use-toast';

type ContactSubmissionsDataTableProps = {
  items: ContactFormSubmission[] | null;
};

export default function ContactSubmissionsDataTable({ items }: ContactSubmissionsDataTableProps) {
  const handleCheckedChange = async (id: string, is_contacted: boolean) => {
    const { success, error } = await updateContactSubmission(id, is_contacted);
    if (success) {
      toast({
        title: 'Contact submission updated',
        description: 'The contact submission has been updated',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error occurred',
        description: error,
      });
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Contacted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items && items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.first_name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.message}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Switch
                    checked={item.is_contacted}
                    onCheckedChange={() => handleCheckedChange(item.id, !item.is_contacted)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No items found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
