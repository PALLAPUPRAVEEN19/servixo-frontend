// src/services/mockStorage.js

const INITIAL_DATA = {
  users: [
    { id: 'u1', name: 'John User', email: 'user@example.com', password: 'password123', role: 'user' },
    { id: 'p1', name: 'Alex Johnson', email: 'alex@pro.com', password: 'password123', role: 'professional', skills: ['Plumbing', 'Electrical'], exp: '5 Years', rating: '4.8', price: '$40/hr', category: 'Plumbing' },
    { id: 'p2', name: 'Sarah Miller', email: 'sarah@pro.com', password: 'password123', role: 'professional', skills: ['Cleaning', 'Organization'], exp: '3 Years', rating: '4.9', price: '$25/hr', category: 'Cleaning' },
    { id: 'p3', name: 'Michael Chen', email: 'michael@pro.com', password: 'password123', role: 'professional', skills: ['Gardening', 'Landscaping'], exp: '7 Years', rating: '4.7', price: '$35/hr', category: 'Outdoor' },
    { id: 'p4', name: 'Emily Davis', email: 'emily@pro.com', password: 'password123', role: 'professional', skills: ['Tutoring', 'Mathematics'], exp: '4 Years', rating: '5.0', price: '$50/hr', category: 'Education' },
    { id: 'p5', name: 'Robert Wilson', email: 'robert@pro.com', password: 'password123', role: 'professional', skills: ['Painting', 'Decoration'], exp: '6 Years', rating: '4.6', price: '$45/hr', category: 'Painting' },
    { id: 'p6', name: 'Jessica Taylor', email: 'jessica@pro.com', password: 'password123', role: 'professional', skills: ['Moving', 'Packing'], exp: '2 Years', rating: '4.5', price: '$30/hr', category: 'Logistics' },
    { id: 'p7', name: 'David Harris', email: 'david@pro.com', password: 'password123', role: 'professional', skills: ['Electrical Repair', 'Wiring'], exp: '8 Years', rating: '4.9', price: '$55/hr', category: 'Electrician' },
    { id: 'a1', name: 'Admin Admin', email: 'admin@example.com', password: 'password123', role: 'admin' },
    { id: 's1', name: 'Support Rep', email: 'support@example.com', password: 'password123', role: 'support' }
  ],
  services: [
    { id: 's1', name: 'Plumbing Repair', category: 'Plumbing', price: '$80', proId: 'p1', proName: 'Alex Johnson', status: 'approved' },
    { id: 's2', name: 'House Cleaning', category: 'Cleaning', price: '$50', proId: 'p2', proName: 'Sarah Miller', status: 'approved' },
    { id: 's3', name: 'Electrical Work', category: 'Electrician', price: '$120', proId: 'p7', proName: 'David Harris', status: 'pending' },
    { id: 's4', name: 'Tutoring', category: 'Education', price: '$25', proId: 'p4', proName: 'Emily Davis', status: 'approved' },
    { id: 's5', name: 'Painting', category: 'Painting', price: '$200', proId: 'p5', proName: 'Robert Wilson', status: 'rejected' }
  ],
  bookings: [
    { id: 'b1', userId: 'u1', userName: 'John User', proId: 'p1', proName: 'Alex Johnson', service: 'Plumbing Repair', status: 'upcoming', date: '2026-04-10', time: '10:00 AM', amount: '$85.00' },
    { id: 'b2', userId: 'u1', userName: 'John User', proId: 'p2', proName: 'Sarah Miller', service: 'House Cleaning', status: 'pending', date: '2026-04-12', time: '2:00 PM', amount: '$55.00' }
  ],
  tickets: [
    { id: 'TIC-1024', userId: 'u1', userName: 'John User', issue: 'Triple charge for cleaning', category: 'Payment', status: 'open', priority: 'high' },
    { id: 'TIC-1025', userId: 'p1', userName: 'Alex Johnson', issue: 'How to withdraw funds?', category: 'Account', status: 'in-progress', priority: 'medium' }
  ],
  earnings: [
    { id: 'e1', proId: 'p1', amount: '$450.00', date: '2026-03-25', status: 'paid' }
  ]
};

const DB_KEY = 'servixo_db';

export const mockStorage = {
  initDB: () => {
    if (!localStorage.getItem(DB_KEY)) {
      localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
    }
  },

  getAll: (key) => {
    const db = JSON.parse(localStorage.getItem(DB_KEY)) || INITIAL_DATA;
    return db[key] || [];
  },

  getItemById: (key, id) => {
    const items = mockStorage.getAll(key);
    return items.find(item => item.id === id);
  },

  addItem: (key, item) => {
    const db = JSON.parse(localStorage.getItem(DB_KEY)) || INITIAL_DATA;
    if (!db[key]) db[key] = [];
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    db[key].push(newItem);
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return newItem;
  },

  updateItem: (key, id, updates) => {
    const db = JSON.parse(localStorage.getItem(DB_KEY)) || INITIAL_DATA;
    if (!db[key]) return null;
    const index = db[key].findIndex(item => item.id === id);
    if (index !== -1) {
      db[key][index] = { ...db[key][index], ...updates };
      localStorage.setItem(DB_KEY, JSON.stringify(db));
      return db[key][index];
    }
    return null;
  },

  deleteItem: (key, id) => {
    const db = JSON.parse(localStorage.getItem(DB_KEY)) || INITIAL_DATA;
    if (!db[key]) return false;
    db[key] = db[key].filter(item => item.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return true;
  }
};
