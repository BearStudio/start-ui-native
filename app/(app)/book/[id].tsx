import React from 'react';

import { useSegments } from 'expo-router';

import BookDetails from '@/modules/books/bookDetail';

const BookId: React.FC = () => {
  const segments = useSegments();
  console.log(segments);
  return <BookDetails />;
};

export default BookId;
