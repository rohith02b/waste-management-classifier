import LandingAnimation from '@/components/LandingAnimation';
import MainLayout from '@/layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className='mb-24 text-center'>
        <p className='text-3xl md:text-5xl mt-24 '>
          Empowering Sustainable Waste Management with AI Classification
        </p>
        <p className='mt-6 text-lg md:w-2/3 mx-auto '>
          Innovative waste classification system leveraging artificial
          intelligence to categorize diverse waste types accurately.
        </p>
        <LandingAnimation />
      </div>
    </MainLayout>
  );
}
