import React, { useRef, useEffect, useState } from 'react';
import { RocketIcon } from './icons/RocketIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UsersIcon } from './icons/UsersIcon';

const differentiators = [
  {
    icon: <RocketIcon className="w-10 h-10 text-viasul-wine-medium" />,
    title: 'Atendimento Rápido',
    text: 'Respostas ágeis e suporte eficiente para você não perder tempo.'
  },
  {
    icon: <ShieldCheckIcon className="w-10 h-10 text-viasul-wine-medium" />,
    title: 'Corretora Autorizada',
    text: 'Somos regulamentados pela SUSEP, garantindo total segurança e conformidade.'
  },
  {
    icon: <SparklesIcon className="w-10 h-10 text-viasul-wine-medium" />,
    title: 'Processo Digital',
    text: 'Contrate e gerencie seu seguro de forma simples, online e sem burocracia.'
  },
  {
    icon: <UsersIcon className="w-10 h-10 text-viasul-wine-medium" />,
    title: 'Parcerias Confiáveis',
    text: 'Trabalhamos com as maiores e mais confiáveis seguradoras do mercado.'
  }
];

const Differentiators: React.FC = () => {
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
    <section id="differentiators" className="py-20 bg-white" ref={sectionRef}>
      {/* VIASUL-UPGRADE: Animation timing adjustment */}
      {/* REASON: Reduced duration for a faster, more responsive feel. */}
      {/* ROLLBACK: Change duration-700 back to duration-1000. */}
      <div
        className={`container mx-auto px-6 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-viasul-wine-dark leading-tight">Por que escolher a Viasul?</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {differentiators.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="p-4 bg-red-50 rounded-full">{item.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-viasul-wine-dark mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;