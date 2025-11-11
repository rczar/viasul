import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatMessage } from '../types';

interface ChatWidgetProps {
  initialMessage?: string | null;
  onInitialMessageSent: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ initialMessage, onInitialMessageSent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize the chat session once when the component mounts
  useEffect(() => {
    try {
      const ai = new GoogleGenAI({ apiKey: "AIzaSyAFbQ7pePD8XebDcNbHoDBXNu3H7aQI_3I" });
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'Você é um assistente virtual da Viasul Corretora de Seguros. Seu nome é Via. Seja amigável, prestativo e especializado em seguros. Forneça informações claras e concisas sobre seguros de automóvel, residencial, de vida e empresarial. Se não souber a resposta, diga que vai verificar com um especialista. Sempre se ofereça para conectar o usuário com um corretor humano via WhatsApp para cotações ou detalhes mais complexos.',
        },
      });
      setChat(newChat);
      setMessages([
        { role: 'model', text: 'Olá! Eu sou a Via, sua assistente virtual da Viasul Seguros. Como posso te ajudar hoje?' }
      ]);
    } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages([{role: 'model', text: 'Desculpe, não consigo me conectar ao nosso assistente no momento. Por favor, tente mais tarde.'}]);
    }
  }, []); // Empty dependency array ensures this runs only once.

  // Effect to handle opening the chat and sending the initial message from an external trigger
  useEffect(() => {
    if (initialMessage !== null && chat) {
      setIsExpanded(true);
      if (initialMessage) {
        handleSend(initialMessage);
      }
      onInitialMessageSent(); // Reset the trigger in the parent component
    }
  }, [initialMessage, chat]);

  useEffect(() => {
    if (isExpanded) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded]);

  const handleSend = async (messageToSend?: string) => {
    const message = (messageToSend || input).trim();
    if (!message || !chat) return;

    const userMessage: ChatMessage = { role: 'user', text: message };
    setMessages(prev => [...prev, userMessage]);
    if (!messageToSend) {
        setInput('');
    }
    setIsLoading(true);

    try {
      const result = await chat.sendMessage({ message });
      const modelResponse = result.text;
      
      const modelMessage: ChatMessage = { role: 'model', text: modelResponse };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = { role: 'model', text: 'Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  }

  return (
    <>
      {/* Main Chat Window */}
      <div className={`fixed bottom-5 right-5 z-[60] w-[calc(100%-40px)] max-w-sm transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col h-[70vh] max-h-[600px]">
          <header className="bg-viasul-wine-dark text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Assistente Viasul</h3>
              <p className="text-sm opacity-80">Online</p>
            </div>
            <button onClick={() => setIsExpanded(false)} className="text-white hover:opacity-75">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </header>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-viasul-wine-medium text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                  <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                      <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.1s]"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                      </div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <footer className="p-4 border-t bg-white rounded-b-2xl">
            <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-viasul-wine-medium"
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleFormSubmit(e);
                  }
                }}
              />
              <button type="submit" className="bg-viasul-wine-medium text-white p-3 rounded-full hover:bg-viasul-wine-dark disabled:bg-gray-400 transition-colors" disabled={isLoading || !input.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </footer>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button 
        onClick={() => setIsExpanded(true)}
        className={`fixed bottom-5 right-5 z-50 bg-viasul-wine-medium text-white p-4 rounded-full shadow-lg hover:bg-viasul-wine-dark transition-all duration-300 ease-in-out transform hover:scale-110 ${isExpanded ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}
        aria-label="Abrir chat com assistente virtual"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </>
  );
};

export default ChatWidget;
