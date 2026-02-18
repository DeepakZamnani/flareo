import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import HorizontalScroll from '@/components/HorizontalScroll';
import Navbar from '@/components/Navbar';
import ThreeDViewer from '@/components/ThreeDViewer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar/>
        <Hero />
      <HorizontalScroll />
     
       <ThreeDViewer />
    
     <Contact/>
    </main>
  );
}