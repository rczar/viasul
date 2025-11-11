import React, { useRef, useEffect, useState } from 'react';
import { WHATSAPP_LINK } from '../constants';

const Contact: React.FC = () => {
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
        <section id="contact" className="py-20 bg-viasul-gray" ref={sectionRef}>
            <div className={`container mx-auto px-6 text-center transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-viasul-wine-dark mb-4 leading-tight">Pronto para encontrar sua tranquilidade?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Nossa equipe está pronta para ajudar você a encontrar o seguro perfeito. Clique no botão abaixo e fale conosco diretamente pelo WhatsApp.
                </p>
                <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-viasul-wine-medium text-white font-bold text-lg py-3 px-8 rounded-full hover:bg-viasul-wine-dark transition-colors shadow-lg transform hover:scale-105"
                >
                    Iniciar Conversa no WhatsApp
                </a>
            </div>
        </section>
    );
};

export default Contact;
