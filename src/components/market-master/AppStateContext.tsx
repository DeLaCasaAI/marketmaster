import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
export type Product = {
  id: number;
  name: string;
  price: number;
  cost: number;
  category: string;
};

export type DiscountParams = {
  quantity?: number;
  price?: number;
  percentage?: number;
  amount?: number;
  withProduct?: number;
};

export type Discount = {
  id: number;
  name: string;
  type: 'bundle' | 'percentage' | 'fixed';
  productId: number;
  params: DiscountParams;
};

export type SaleItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  discountApplied: number;
};

export type Sale = {
  items: SaleItem[];
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
};

export type SaleRecord = {
  id: number;
  timestamp: string;
  items: SaleItem[];
  paymentMethod: string;
  total: number;
  eventId?: number;
};

export type Event = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  cost: number;
  startTime?: string;
};

export type AppState = {
  products: Product[];
  discounts: Discount[];
  currentSale: Sale;
  salesHistory: SaleRecord[];
  events: Event[];
  currentEvent: Event | null;
  eventStartDate: string | null;
  eventEndDate: string | null;
  language: string;
};

// Define context type
type AppStateContextType = {
  state: AppState;
  addProduct: (product: Omit<Product, "id">) => void;
  editProduct: (id: number, product: Omit<Product, "id">) => void;
  deleteProduct: (id: number) => void;
  addDiscount: (discount: Omit<Discount, "id">) => void;
  editDiscount: (id: number, discount: Omit<Discount, "id">) => void;
  deleteDiscount: (id: number) => void;
  addProductToSale: (productId: number) => void;
  updateProductQuantity: (productId: number, change: number) => void;
  clearCurrentSale: () => void;
  completeSale: () => void;
  setPaymentMethod: (method: string) => void;
  createEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: number, event: Omit<Event, "id">) => void;
  deleteEvent: (id: number) => void;
  setCurrentEvent: (eventId: number | null) => void;
  calculateTodaysSales: () => number;
  calculateEventSales: (eventId: number) => number;
  calculateEventProfit: (sale: Sale, event: Event | null) => number;
  updateStateFromImport: (data: any) => void;
  getSalesByEventId: (eventId: number) => SaleRecord[];
};

// Initialize context with default values
const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Sample data for initial state
const sampleProducts = [
  { id: 1, name: "Organic Tomatoes", price: 3.50, cost: 1.20, category: "produce" },
  { id: 2, name: "Homemade Bread", price: 5.00, cost: 1.80, category: "bakery" }
];

const sampleDiscounts = [
  { 
    id: 1, 
    name: "Tomato Bundle", 
    type: 'bundle' as const, 
    productId: 1, 
    params: { quantity: 3, price: 9.00 } 
  }
];

// Provider component
export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    products: [],
    discounts: [],
    currentSale: {
      items: [],
      paymentMethod: 'cash',
      subtotal: 0,
      discount: 0,
      total: 0
    },
    salesHistory: [],
    events: [],
    currentEvent: null,
    eventStartDate: null,
    eventEndDate: null,
    language: localStorage.getItem('marketMasterLanguage') || 'en'
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('marketMasterData');
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setState(prevState => ({
        ...prevState,
        products: parsedData.products || [],
        discounts: parsedData.discounts || [],
        salesHistory: parsedData.salesHistory || [],
        events: parsedData.events || [],
        currentEvent: null, // Reset current event on load
        eventStartDate: null,
        eventEndDate: null
      }));
    } else {
      // Load sample data if no data in localStorage
      setState(prevState => ({
        ...prevState,
        products: sampleProducts,
        discounts: sampleDiscounts
      }));
    }
  }, []);

  // Check if any event is currently active and set it
  useEffect(() => {
    if (state.events.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day
      
      const activeEvent = state.events.find(event => {
        // Parse the date from YYYY-MM-DD format properly
        const [startYear, startMonth, startDay] = event.startDate.split('-').map(Number);
        const [endYear, endMonth, endDay] = event.endDate.split('-').map(Number);
        
        // Create Date objects with time set to start/end of day to handle same-day events correctly
        const startDate = new Date(startYear, startMonth - 1, startDay);
        startDate.setHours(0, 0, 0, 0); // Start of day
        
        const endDate = new Date(endYear, endMonth - 1, endDay);
        endDate.setHours(23, 59, 59, 999); // End of day
        
        // Debug the date comparison
        console.log('Comparing dates:', {
          today: today.toISOString(),
          eventStart: startDate.toISOString(),
          eventEnd: endDate.toISOString(),
          isEventActive: today >= startDate && today <= endDate
        });
        
        return today >= startDate && today <= endDate;
      });
      
      if (activeEvent && !state.currentEvent) {
        console.log('Setting active event:', activeEvent);
        setState(prevState => ({
          ...prevState,
          currentEvent: activeEvent,
          eventStartDate: activeEvent.startDate,
          eventEndDate: activeEvent.endDate
        }));
      } else if (!activeEvent && state.currentEvent) {
        // If there's no active event but we have a current event set
        // Check if the current event is still valid
        const currentEventStillValid = state.events.find(event => {
          const [startYear, startMonth, startDay] = event.startDate.split('-').map(Number);
          const [endYear, endMonth, endDay] = event.endDate.split('-').map(Number);
          
          const startDate = new Date(startYear, startMonth - 1, startDay);
          startDate.setHours(0, 0, 0, 0);
          
          const endDate = new Date(endYear, endMonth - 1, endDay);
          endDate.setHours(23, 59, 59, 999);
          
          const eventId = state.currentEvent?.id || -1;
          return event.id === eventId && today >= startDate && today <= endDate;
        });
        
        if (!currentEventStillValid) {
          setState(prevState => ({
            ...prevState,
            currentEvent: null,
            eventStartDate: null,
            eventEndDate: null
          }));
        }
      }
    }
  }, [state.events, state.currentEvent]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('marketMasterData', JSON.stringify({
      products: state.products,
      discounts: state.discounts,
      salesHistory: state.salesHistory,
      events: state.events
    }));
  }, [state.products, state.discounts, state.salesHistory, state.events]);

  // Calculate sale totals and apply discounts
  const calculateSaleTotals = (items: SaleItem[]) => {
    let subtotal = 0;
    let totalDiscount = 0;
    
    const updatedItems = [...items];
    
    // Calculate subtotal first
    for (const item of updatedItems) {
      const product = state.products.find(p => p.id === item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    }

    // Apply discounts
    for (const item of updatedItems) {
      item.discountApplied = 0; // Reset discount before recalculation
      
      const product = state.products.find(p => p.id === item.productId);
      if (!product) continue;
      
      // Apply discounts if any
      const applicableDiscounts = state.discounts.filter(d => d.productId === product.id);
      
      if (applicableDiscounts.length > 0) {
        // Handle bundle discounts specially
        const bundleDiscounts = applicableDiscounts.filter(d => d.type === 'bundle');
        
        if (bundleDiscounts.length > 0) {
          // Find the most beneficial bundle discount for this quantity
          let maxDiscount = 0;
          let bestDiscount = null;
          
          for (const discount of bundleDiscounts) {
            const bundleSize = discount.params.quantity || 1;
            const bundlePrice = discount.params.price || 0;
            const bundleCount = Math.floor(item.quantity / bundleSize);
            
            if (bundleCount > 0) {
              const regularPrice = product.price * bundleSize * bundleCount;
              const discountedPrice = bundlePrice * bundleCount;
              const totalSavings = regularPrice - discountedPrice;
              
              if (totalSavings > maxDiscount) {
                maxDiscount = totalSavings;
                bestDiscount = {
                  discount,
                  bundleCount,
                  totalSavings
                };
              }
            }
          }
          
          // Apply the best bundle discount
          if (bestDiscount) {
            const bundleSize = bestDiscount.discount.params.quantity || 1;
            const bundlePrice = bestDiscount.discount.params.price || 0;
            const bundleCount = bestDiscount.bundleCount;
            
            const discountAmount = bestDiscount.totalSavings;
            item.discountApplied += discountAmount;
            totalDiscount += discountAmount;
            
            // Calculate remaining items that are not part of bundle
            const remainingItems = item.quantity - (bundleSize * bundleCount);
            
            // Don't apply other discount types to items that were part of the bundle
            if (remainingItems <= 0) {
              continue;
            }
          }
        }
        
        // Apply other discount types (percentage, fixed)
        for (const discount of applicableDiscounts) {
          if (discount.type === 'percentage') {
            if (item.quantity >= 1) {
              const discountAmount = (product.price * item.quantity) * ((discount.params.percentage || 0) / 100);
              item.discountApplied += discountAmount;
              totalDiscount += discountAmount;
            }
          } else if (discount.type === 'fixed') {
            if (item.quantity >= 1) {
              const discountAmount = (discount.params.amount || 0) * item.quantity;
              item.discountApplied += discountAmount;
              totalDiscount += discountAmount;
              
              // Check if this is a combo discount and the other product is also in the cart
              if (discount.params.withProduct) {
                const withProductInCart = updatedItems.some(i => i.productId === discount.params.withProduct);
                if (!withProductInCart) {
                  totalDiscount -= discountAmount;
                  item.discountApplied -= discountAmount;
                }
              }
            }
          }
        }
      }
    }
    
    return {
      items: updatedItems,
      subtotal,
      discount: totalDiscount,
      total: subtotal - totalDiscount
    };
  };

  // Add a new product
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now()
    };
    
    setState(prevState => ({
      ...prevState,
      products: [...prevState.products, newProduct]
    }));
  };

  // Edit an existing product
  const editProduct = (id: number, product: Omit<Product, "id">) => {
    setState(prevState => ({
      ...prevState,
      products: prevState.products.map(p => 
        p.id === id ? { ...product, id } : p
      )
    }));
  };

  // Delete a product
  const deleteProduct = (id: number) => {
    setState(prevState => ({
      ...prevState,
      products: prevState.products.filter(p => p.id !== id)
    }));
  };

  // Add a new discount
  const addDiscount = (discount: Omit<Discount, "id">) => {
    const newDiscount = {
      ...discount,
      id: Date.now()
    };
    
    setState(prevState => ({
      ...prevState,
      discounts: [...prevState.discounts, newDiscount]
    }));
  };

  // Edit an existing discount
  const editDiscount = (id: number, discount: Omit<Discount, "id">) => {
    setState(prevState => ({
      ...prevState,
      discounts: prevState.discounts.map(d => 
        d.id === id ? { ...discount, id } : d
      )
    }));
  };

  // Delete a discount
  const deleteDiscount = (id: number) => {
    setState(prevState => ({
      ...prevState,
      discounts: prevState.discounts.filter(d => d.id !== id)
    }));
  };

  // Add product to current sale
  const addProductToSale = (productId: number) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    setState(prevState => {
      let updatedItems;
      const existingItemIndex = prevState.currentSale.items.findIndex(item => item.productId === productId);
      
      if (existingItemIndex !== -1) {
        // Update existing item
        updatedItems = [...prevState.currentSale.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
      } else {
        // Add new item
        updatedItems = [
          ...prevState.currentSale.items,
          {
            productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            discountApplied: 0
          }
        ];
      }
      
      const { items, subtotal, discount, total } = calculateSaleTotals(updatedItems);
      
      return {
        ...prevState,
        currentSale: {
          ...prevState.currentSale,
          items,
          subtotal,
          discount,
          total
        }
      };
    });
  };

  // Update product quantity in current sale
  const updateProductQuantity = (productId: number, change: number) => {
    setState(prevState => {
      const existingItem = prevState.currentSale.items.find(item => item.productId === productId);
      
      if (!existingItem) return prevState;
      
      const updatedQuantity = existingItem.quantity + change;
      
      let updatedItems;
      if (updatedQuantity <= 0) {
        // Remove item if quantity reaches 0
        updatedItems = prevState.currentSale.items.filter(item => item.productId !== productId);
      } else {
        // Update item quantity
        updatedItems = prevState.currentSale.items.map(item => 
          item.productId === productId 
            ? { ...item, quantity: updatedQuantity }
            : item
        );
      }
      
      const { items, subtotal, discount, total } = calculateSaleTotals(updatedItems);
      
      return {
        ...prevState,
        currentSale: {
          ...prevState.currentSale,
          items,
          subtotal,
          discount,
          total
        }
      };
    });
  };
  
  // Clear current sale
  const clearCurrentSale = () => {
    setState(prevState => ({
      ...prevState,
      currentSale: {
        items: [],
        paymentMethod: 'cash',
        subtotal: 0,
        discount: 0,
        total: 0
      }
    }));
  };

  // Complete sale
  const completeSale = () => {
    setState(prevState => {
      if (prevState.currentSale.items.length === 0) return prevState;
      
      const saleRecord: SaleRecord = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        items: [...prevState.currentSale.items],
        paymentMethod: prevState.currentSale.paymentMethod,
        total: prevState.currentSale.total,
        eventId: prevState.currentEvent?.id
      };
      
      return {
        ...prevState,
        salesHistory: [saleRecord, ...prevState.salesHistory]
      };
    });
  };

  // Set payment method
  const setPaymentMethod = (method: string) => {
    setState(prevState => ({
      ...prevState,
      currentSale: {
        ...prevState.currentSale,
        paymentMethod: method
      }
    }));
  };

  // Create a new event
  const createEvent = (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: Date.now()
    };
    
    setState(prevState => ({
      ...prevState,
      events: [...prevState.events, newEvent]
    }));
  };

  // Update an existing event
  const updateEvent = (id: number, event: Omit<Event, "id">) => {
    setState(prevState => {
      const updatedEvents = prevState.events.map(e => 
        e.id === id ? { ...event, id } : e
      );
      
      return {
        ...prevState,
        events: updatedEvents,
        // If the current event is being updated, update it as well
        currentEvent: prevState.currentEvent?.id === id ? 
          { ...event, id } : prevState.currentEvent
      };
    });
  };

  // Delete an event
  const deleteEvent = (id: number) => {
    setState(prevState => {
      // Remove event from events list
      const updatedEvents = prevState.events.filter(e => e.id !== id);
      
      // If the deleted event was the current event, reset current event
      const updatedCurrentEvent = prevState.currentEvent?.id === id ? 
        null : prevState.currentEvent;
      
      return {
        ...prevState,
        events: updatedEvents,
        currentEvent: updatedCurrentEvent,
        eventStartDate: updatedCurrentEvent?.startDate || null,
        eventEndDate: updatedCurrentEvent?.endDate || null
      };
    });
  };

  // Set current event
  const setCurrentEvent = (eventId: number | null) => {
    setState(prevState => {
      if (eventId === null) {
        return {
          ...prevState,
          currentEvent: null,
          eventStartDate: null,
          eventEndDate: null
        };
      }
      
      const selectedEvent = prevState.events.find(e => e.id === eventId) || null;
      
      return {
        ...prevState,
        currentEvent: selectedEvent,
        eventStartDate: selectedEvent?.startDate || null,
        eventEndDate: selectedEvent?.endDate || null
      };
    });
  };

  // Calculate total sales for today
  const calculateTodaysSales = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return state.salesHistory
      .filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= today;
      })
      .reduce((sum, sale) => sum + sale.total, 0);
  };

  // Calculate total sales for a specific event
  const calculateEventSales = (eventId: number) => {
    return state.salesHistory
      .filter(sale => sale.eventId === eventId)
      .reduce((sum, sale) => sum + sale.total, 0);
  };
  
  // Get sales records for a specific event
  const getSalesByEventId = (eventId: number) => {
    return state.salesHistory.filter(sale => sale.eventId === eventId);
  };

  // Calculate profit for an event
  const calculateEventProfit = (sale: Sale, event: Event | null) => {
    let totalRevenue = sale.total;
    let totalCostOfGoods = 0;
    
    for (const item of sale.items) {
      const product = state.products.find(p => p.id === item.productId);
      if (product) {
        totalCostOfGoods += product.cost * item.quantity;
      }
    }
    
    const eventCost = event ? event.cost : 0;
    return totalRevenue - totalCostOfGoods - eventCost;
  };

  // Update state from imported data
  const updateStateFromImport = (data: any) => {
    setState(prevState => ({
      ...prevState,
      products: data.products || [],
      discounts: data.discounts || [],
      salesHistory: data.salesHistory || [],
      events: data.events || [],
      currentEvent: null,
      eventStartDate: null,
      eventEndDate: null
    }));
  };

  const value = {
    state,
    addProduct,
    editProduct,
    deleteProduct,
    addDiscount,
    editDiscount,
    deleteDiscount,
    addProductToSale,
    updateProductQuantity,
    clearCurrentSale,
    completeSale,
    setPaymentMethod,
    createEvent,
    updateEvent,
    deleteEvent,
    setCurrentEvent,
    calculateTodaysSales,
    calculateEventSales,
    calculateEventProfit,
    updateStateFromImport,
    getSalesByEventId
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook to use the context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
