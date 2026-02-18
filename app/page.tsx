import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import HorizontalScroll from '@/components/HorizontalScroll';
import SplitScreen from '@/components/SplitScreen';
import ThreeDViewer from '@/components/ThreeDViewer';

export default function Home() {
  return (
    <main className="relative">
        <Hero />
      <HorizontalScroll />
     
       <ThreeDViewer />
    
     <Contact/>
    </main>
  );
}