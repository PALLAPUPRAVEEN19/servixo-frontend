import { createContext, useState, useContext, useEffect } from 'react';

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(() => {
    const stored = localStorage.getItem('servixo_tickets');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('servixo_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const createTicket = (ticketData) => {
    const newTicket = {
      ...ticketData,
      id: `TIC-${Date.now()}`,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      messages: [
        {
          sender: ticketData.userName,
          role: 'user',
          text: ticketData.description,
          time: new Date().toISOString()
        }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  const updateTicket = (id, updates) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const addMessage = (ticketId, message) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, messages: [...(t.messages || []), { ...message, time: new Date().toISOString() }] };
      }
      return t;
    }));
  };

  return (
    <TicketContext.Provider value={{ tickets, createTicket, updateTicket, addMessage }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
