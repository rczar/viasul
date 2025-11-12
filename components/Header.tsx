import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { WHATSAPP_LINK } from '../constants';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { href: '#about', text: 'Sobre Nós' },
        { href: '#insurance', text: 'Seguros' },
        { href: '#differentiators', text: 'Diferenciais' },
        { href: '#contact', text: 'Contato' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#hero" className="flex items-center space-x-2">
                    <Logo className="w-10 h-10" />
                    <span className={`font-bold text-xl font-serif transition-colors ${isScrolled ? 'text-viasul-wine-dark' : 'text-white'}`}>Viasul Seguros</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className={`font-semibold transition-colors ${isScrolled ? 'text-gray-600 hover:text-viasul-wine-dark' : 'text-white hover:text-gray-200'}`}>{link.text}</a>
                    ))}
                </nav>

                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:inline-block bg-white text-viasul-wine-dark font-bold py-2 px-5 rounded-full hover:bg-viasul-wine-light transition-colors shadow-sm">
                    <p className="text-viasul-wine-dark hover:text-white">Fale Conosco</p>
                </a>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                    <svg className={`w-6 h-6 transition-colors ${isScrolled ? 'text-viasul-wine-dark' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-viasul-wine-dark font-semibold">{link.text}</a>
                        ))}
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-viasul-wine-medium text-white font-bold py-2 px-6 rounded-full hover:bg-viasul-wine-dark transition-colors shadow-md">
                            Fale Conosco
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
