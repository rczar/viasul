import React, { useRef, useEffect, useState } from 'react';
import { CarIcon } from './icons/CarIcon';
import { HomeIcon } from './icons/HomeIcon';
import { LifeIcon } from './icons/LifeIcon';
import { BusinessIcon } from './icons/BusinessIcon';

interface InsuranceProps {
  onCardClick: (topic: string) => void;
}

const insuranceTypes = [
  {
    icon: <CarIcon className="w-12 h-12 text-viasul-wine-medium" />,
    title: 'Auto',
    description: 'Proteja seu veículo contra imprevistos e dirija com total tranquilidade.',
    topic: 'Automóvel'
  },
  {
    icon: <HomeIcon className="w-12 h-12 text-viasul-wine-medium" />,
    title: 'Residencial',
    description: 'A segurança que seu lar precisa, com coberturas completas para sua casa.',
     topic: 'Residencial'
  },
  {
    icon: <LifeIcon className="w-12 h-12 text-viasul-wine-medium" />,
    title: 'Vida',
    description: 'Garanta a tranquilidade financeira e o futuro de quem você mais ama.',
    topic: 'de Vida'
  },
  {
    icon: <BusinessIcon className="w-12 h-12 text-viasul-wine-medium" />,
    title: 'Empresarial',
    description: 'Soluções inteligentes para proteger seu patrimônio e garantir a continuidade do seu negócio.',
    topic: 'Empresarial'
  },
];

const Insurance: React.FC<InsuranceProps> = ({ onCardClick }) => {
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
    <section id="insurance" className="py-20 bg-viasul-gray" ref={sectionRef}>
      {/* VIASUL-UPGRADE: Animation timing adjustment */}
      {/* REASON: Reduced duration for a faster, more responsive feel. */}
      {/* ROLLBACK: Change duration-700 back to duration-1000. */}
      <div
        className={`container mx-auto px-6 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-viasul-wine-dark leading-tight">Nossos Seguros</h2>
          <p className="text-lg text-gray-600 mt-2">Encontre a proteção perfeita para cada necessidade.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {insuranceTypes.map((insurance, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-transform transform hover:-translate-y-2">
              <div className="mb-4 p-4 bg-red-50 rounded-full">{insurance.icon}</div>
              <h3 className="text-2xl font-bold font-serif text-viasul-wine-dark mb-2">{insurance.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{insurance.description}</p>
              <button 
                onClick={() => onCardClick(insurance.topic)}
                className="mt-auto bg-viasul-wine-medium text-white font-bold py-2 px-6 rounded-full hover:bg-viasul-wine-dark transition-colors shadow-md">
                Quero saber mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insurance;