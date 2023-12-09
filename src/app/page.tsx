'use client'
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { ChangeThemeButton } from './compornents/ChangeThemeButton';
import Card from './compornents/Card';

const Page: React.FC = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <header className='flex justify-end w-full border-b border-b-gray-700 bg-slate-300/90 dark:bg-slate-900/90'>
        <ChangeThemeButton />
      </header>
      <main className='h-screen flex justify-center bg-slate-300 dark:bg-slate-900'>
        <div className='flex flex-col'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Page;