'use client'
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { ChangeThemeButton } from './compornents/ChangeThemeButton';
import ModalMain from './compornents/Modal/ModalMain';

const Page: React.FC = () => {
  // 他のコードやコンポーネントをここに追加

  return (
    <html>
      <body className='dark:bg-gray-800'>
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className='h-screen flex justify-center items-center dark:bg-gray-800'>
            <div className='flex justify-center items-center flex-col'>
              <header className='flex justify-end w-full'>
                <ChangeThemeButton />
              </header>
              <ModalMain/>
              <ModalMain/>
              <ModalMain/>
              <ModalMain/>
              <ModalMain/>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Page;