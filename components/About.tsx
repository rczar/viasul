import React, { useRef, useEffect, useState } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      {/* VIASUL-UPGRADE: Animation timing adjustment */}
      {/* REASON: Reduced duration for a faster, more responsive feel. */}
      {/* ROLLBACK: Change duration-700 back to duration-1000. */}
      <div
        className={`container mx-auto px-6 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:pr-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-viasul-wine-dark mb-4 leading-tight">Sua tranquilidade é nosso compromisso.</h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              Na Viasul, entendemos que cada cliente é único. Por isso, nossa missão é oferecer mais do que seguros: entregamos segurança e confiança através de um atendimento humano, ágil e totalmente personalizado.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Com corretores experientes e as melhores parcerias do mercado, garantimos a proteção ideal para cada momento da sua vida.
            </p>
          </div>
          <div>
            <img 
              src="https://picsum.photos/id/1018/600/400" 
              alt="Paisagem tranquila representando segurança" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;