import React, { useState, useEffect } from 'react';

interface HeroProps {
    onCTAClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCTAClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="hero" className="relative bg-viasul-wine-dark text-white min-h-screen flex items-center">
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://blog.opipari.com.br/wp-content/uploads/2025/10/image-2.jpg')" }}></div>
            <div className="relative container mx-auto px-6 text-center z-10">
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
                        Viasul Seguros: Proteção para o que mais importa.
                    </h1>
                </div>
                <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
                        Encontre o seguro ideal com atendimento personalizado e as melhores condições do mercado.
                    </p>
                    <button
                        onClick={onCTAClick}
                        className="bg-white text-viasul-wine-dark font-bold text-lg py-3 px-8 rounded-full hover:bg-viasul-wine-light transition-transform transform hover:scale-105 shadow-lg"
                    > 
                    <p className="text-viasul-wine-dark hover:text-white">Fale com nosso especialista</p>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
