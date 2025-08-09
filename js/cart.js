const cart = JSON.parse(localStorage.getItem('cart')) || [];
const tableBody = document.querySelector('#cart-table tbody');
const totalPriceEl = document.getElementById('total-price');

// ✅ Renders the cart table
function renderCart() {
  tableBody.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    const itemTotal = price * qty;
    total += itemTotal;

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

  totalPriceEl.textContent = `Grand Total: ₦${total.toLocaleString()}`;
}

// ✅ Removes an item when "Remove" is clicked
tableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

// ✅ Optional: Clear cart function
function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}

// ✅ Load cart when page loads
renderCart();
