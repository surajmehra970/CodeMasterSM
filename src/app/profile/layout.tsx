import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile | CodeMaster',
  description: 'View and manage your CodeMaster profile information',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 