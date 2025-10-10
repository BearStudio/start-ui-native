import { useLocalSearchParams } from 'expo-router';

import { ViewBook } from '@/features/books/view-book';

export default function Book() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ViewBook bookId={id} />;
}
