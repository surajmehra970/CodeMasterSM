import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Practice Problems - SelfLearning Platform',
  description: 'Practice your coding skills with these problems across various difficulty levels',
};

export default function PracticeLayout({ children }: { children: ReactNode }) {
  return children;
} 