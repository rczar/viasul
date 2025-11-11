import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Insurance from './components/Insurance';
import Differentiators from './components/Differentiators';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  // Use a trigger state for the initial message. `null` means no trigger.
  const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);

  const handleInsuranceCardClick = (topic: string) => {
    setChatInitialMessage(`Olá! Gostaria de saber mais sobre o seguro ${topic}.`);
  };
  
  const handleHeroButtonClick = () => {
    setChatInitialMessage(''); // An empty string will trigger the chat to open without a message.
  };

  // Callback for the chat widget to reset the trigger after it has been consumed.
  const handleInitialMessageSent = () => {
    setChatInitialMessage(null);
  }

  return (
    <div className="bg-white font-sans text-gray-800">
      <Header />
      <main>
        <Hero onCTAClick={handleHeroButtonClick} />
        <About />
        <Insurance onCardClick={handleInsuranceCardClick} />
        <Differentiators />
        <Contact />
      </main>
      <Footer />
      <ChatWidget 
        initialMessage={chatInitialMessage}
        onInitialMessageSent={handleInitialMessageSent}
      />
    </div>
  );
};

export default App;