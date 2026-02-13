import Image from 'next/image';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='w-full flex bg-black'>
      <section className='flex-1'>{children}</section>

      <div className='flex flex-1 min-h-screen h-auto max-h-screen'>
        <Image
          src='/assets/images/side-img.svg'
          alt='Side Image'
          width={720}
          height={1024}
          className='flex-1 object-cover object-center hidden lg:block'
          loading='eager'
          preload
        />
      </div>
    </main>
  );
}
