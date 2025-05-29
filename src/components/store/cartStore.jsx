import { proxy, subscribe } from 'valtio';

// cartStore: global state for the shopping cart using valtio
export const cartStore = proxy({
  items: [],
  // Add an item to the cart. If it already exists, increase the quantity.
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
  // Remove an item from the cart. If quantity > 1, decrease it; otherwise, remove the item.
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
  // Clear the entire cart
  clear() {
    cartStore.items = [];
  }
});

// Sync cart state with localStorage on every change
subscribe(cartStore, () => {
  localStorage.setItem('cart', JSON.stringify(cartStore.items));
});

// On startup, load cart from localStorage if available
const saved = localStorage.getItem('cart');
if (saved) {
  try {
    cartStore.items = JSON.parse(saved);
  } catch (e) {
    cartStore.items = [];
  }
}