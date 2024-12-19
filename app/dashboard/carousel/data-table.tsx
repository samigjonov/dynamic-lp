'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { CarouselItem } from '@/shared/types/carousel-item.type';
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { deleteCarouselItem } from './actions';

type CarouselDataTableProps = {
  items: CarouselItem[] | null;
};

export default function CarouselDataTable({ items }: CarouselDataTableProps) {
  const [deleteItem, setDeleteItem] = useState<CarouselItem | null>(null);

  const handleDelete = async () => {
    if (!deleteItem) return;

    const { success, error } = await deleteCarouselItem(deleteItem.id);
    if (success) {
      setDeleteItem(null);
    } else {
      console.error('Error deleting carousel item', error);
    }
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>CTA</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items && items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description.slice(0, 50)}...</TableCell>
                <TableCell>
                  <Link
                    href={item.cta_link}
                    className="text-blue-500 underline hover:no-underline"
                    target="_blank"
                  >
                    {item.cta_text}
                  </Link>
                </TableCell>
                <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/carousel/${item.id}/edit`}>
                      <Button variant="outline">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="destructive" onClick={() => setDeleteItem(item)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
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
      <AlertDialog open={Boolean(deleteItem)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your carousel item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteItem(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
