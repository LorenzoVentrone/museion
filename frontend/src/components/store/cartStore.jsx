import { proxy, subscribe } from 'valtio';

export const cartStore = proxy({
  items: [],
  addItem(item) {
    const match = i =>
      i.item_id === item.item_id &&
      (i.date ?? null) === (item.date ?? null) &&
      i.type === item.type &&
      (i.color ?? null) === (item.color ?? null) &&
      (i.logo ?? null) === (item.logo ?? null);

    const existing = cartStore.items.find(match);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      cartStore.items.push({
        ...item,
        quantity: item.quantity || 1,
        date: item.date ?? null,
        color: item.color ?? null,
        logo: item.logo ?? null,
      });
    }
  },
  removeItem(item) {
    const idx = cartStore.items.findIndex(i =>
      i.item_id === item.item_id &&
      (i.date ?? null) === (item.date ?? null) &&
      i.type === item.type &&
      (i.color ?? null) === (item.color ?? null) &&
      (i.logo ?? null) === (item.logo ?? null)
    );
    if (idx > -1) {
      if (cartStore.items[idx].quantity > 1) {
        cartStore.items[idx].quantity -= 1;
      } else {
        cartStore.items.splice(idx, 1);
      }
    }
  },
  clear() {
    cartStore.items = [];
  }
});


// Sincronizza con localStorage ogni volta che cambia
subscribe(cartStore, () => {
  localStorage.setItem('cart', JSON.stringify(cartStore.items));
});

// All'avvio, carica dal localStorage se presente
const saved = localStorage.getItem('cart');
if (saved) {
  try {
    cartStore.items = JSON.parse(saved);
  } catch (e) {
    cartStore.items = [];
  }
}