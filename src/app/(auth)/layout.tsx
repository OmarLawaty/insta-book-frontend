import Image from 'next/image';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='w-full flex bg-black'>
      <section className='flex flex-1 justify-center items-center py-10 text-white p-5'>
        <div className='flex flex-1 flex-col w-full max-w-[clamp(20rem,39.5vw,24rem)] gap-4'>{children}</div>
      </section>

      <div className='flex-1 min-h-screen h-auto max-h-screen hidden md:flex'>
        <Image
          src='/assets/images/side-img.svg'
          alt='Side Image'
          width={720}
          height={1024}
          className='flex-1 object-cover object-center'
          loading='eager'
          preload
        />
      </div>
    </main>
  );
}
