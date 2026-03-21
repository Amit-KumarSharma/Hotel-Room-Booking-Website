import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialRooms = [
  { id: '1', title: 'Presidential Suite', description: 'Ultimate luxury with panoramic views', price: 120000, status: 'available', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80' },
  { id: '2', title: 'Ocean View Room', description: 'Breathtaking ocean vistas', price: 64000, status: 'available', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80' },
  { id: '3', title: 'Deluxe Suite', description: 'Spacious and elegant accommodation', price: 40000, status: 'available', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80' }
];

export const useDbStore = create(
  persist(
    (set, get) => ({
      rooms: initialRooms,
      bookings: [],
      
      // Admin Actions
      addRoom: (room) => set({ rooms: [...get().rooms, { ...room, id: Date.now().toString(), status: 'available' }] }),
      deleteRoom: (id) => set({ rooms: get().rooms.filter(r => r.id !== id) }),
      updateRoom: (id, data) => set({ rooms: get().rooms.map(r => r.id === id ? { ...r, ...data } : r) }),
      
      // User Actions
      bookRoom: (roomId, userId, checkIn, checkOut, guests) => {
        const newBooking = {
          id: Date.now().toString(),
          roomId,
          userId,
          checkIn,
          checkOut,
          guests,
          status: 'confirmed',
          date: new Date().toISOString()
        };
        set({ 
          bookings: [...get().bookings, newBooking],
          rooms: get().rooms.map(r => r.id === roomId ? { ...r, status: 'booked' } : r)
        });
        return newBooking;
      },
      cancelBooking: (bookingId) => {
        const booking = get().bookings.find(b => b.id === bookingId);
        set({
          bookings: get().bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b),
          rooms: get().rooms.map(r => r.id === booking.roomId ? { ...r, status: 'available' } : r)
        });
      }
    }),
    {
      name: 'hotel-db-storage',
    }
  )
);
