const cart = JSON.parse(localStorage.getItem('cart')) || [];
const tableBody = document.querySelector('#cart-table tbody');
const totalPriceEl = document.getElementById('total-price');
const deliverySelect = document.getElementById('delivery');
const deliveryFeeEl = document.getElementById('delivery-fee');
const finalTotalEl = document.getElementById('final-total');

let subtotal = 0;
let deliveryFee = 0;

// ✅ Renders the cart table
function renderCart() {
  tableBody.innerHTML = '';
  subtotal = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    const itemTotal = price * qty;
    subtotal += itemTotal;

    row.innerHTML = `
      <td>${item.name || '—'}</td>
      <td>${item.size || '—'}</td>
      <td>₦${price.toLocaleString()}</td>
      <td>${qty}</td>
      <td>₦${itemTotal.toLocaleString()}</td>
      <td><button class="remove" data-index="${index}">Remove</button></td>
    `;

    tableBody.appendChild(row);
  });

  updateTotals();
}

// ✅ Updates totals
function updateTotals() {
  deliveryFee = Number(deliverySelect.value) || 0;
  deliveryFeeEl.textContent = `Delivery Fee: ₦${deliveryFee.toLocaleString()}`;
  const grandTotal = subtotal + deliveryFee;
  totalPriceEl.textContent = `Subtotal: ₦${subtotal.toLocaleString()}`;
  finalTotalEl.textContent = `Grand Total: ₦${grandTotal.toLocaleString()}`;
}

// ✅ Change delivery fee dynamically
deliverySelect.addEventListener('change', updateTotals);

// ✅ Remove items
tableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

// ✅ Clear cart
function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}

// ✅ Initial load
renderCart();
