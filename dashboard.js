/**
 * Doppio Cafe - High Fidelity Cashier Takeaway POS & Inventory Dashboard Control System
 * Manages states, ingredient reductions, thermal printing, analytics, and CRUD configurations.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. INITIAL DATABASES & LOCAL STORAGE STATE
  // ==========================================
  
  // Default Menu Database if not initialized in localStorage
  const defaultMenu = [
    { name: 'Iced Latte', description: 'Creamy chilled latte served over ice.', price: 249, category: 'COLD COFFEE', icon: '🥛' },
    { name: 'Iced Americano', description: 'Strong refreshing black iced coffee.', price: 229, category: 'COLD COFFEE', icon: '🧊' },
    { name: 'Irish Coffee', description: 'Rich creamy coffee topped with whipped cream.', price: 279, category: 'COLD COFFEE', icon: '🥃' },
    { name: 'Mocha Frappe', description: 'Chocolate blended cold coffee with whipped cream.', price: 279, category: 'COLD COFFEE', icon: '🍫' },
    { name: 'Doppio Signature Frappe', description: 'Signature creamy frappe with chocolate toppings.', price: 298, category: 'COLD COFFEE', icon: '☕' },
    { name: 'Iced Caramel Macchiato', description: 'Sweet caramel layered iced coffee.', price: 279, category: 'COLD COFFEE', icon: '🍯' },
    { name: 'Hazelnut Frappe', description: 'Nutty creamy blended coffee.', price: 279, category: 'COLD COFFEE', icon: '🌰' },
    { name: 'Espresso Ginger Ale', description: 'Espresso mixed with sparkling ginger ale.', price: 279, category: 'COLD COFFEE', icon: '🥤' },
    { name: 'Classic Frappe', description: 'Smooth creamy cold coffee frappe.', price: 279, category: 'COLD COFFEE', icon: '🍦' },

    { name: 'Doppio', description: 'Double shot hot espresso with rich crema.', price: 219, category: 'HOT COFFEE', icon: '☕' },
    { name: 'Espresso', description: 'Strong concentrated black coffee shot.', price: 189, category: 'HOT COFFEE', icon: '☕' },
    { name: 'Cappuccino', description: 'Frothy coffee with latte art.', price: 229, category: 'HOT COFFEE', icon: '🎨' },
    { name: 'Cafe Latte', description: 'Smooth creamy latte with milk foam art.', price: 229, category: 'HOT COFFEE', icon: '🥛' },
    { name: 'Flat White', description: 'Velvety smooth milk coffee.', price: 229, category: 'HOT COFFEE', icon: '☕' },
    { name: 'Affogato', description: 'Espresso poured over vanilla ice cream.', price: 279, category: 'HOT COFFEE', icon: '🍨' },
    { name: 'Americano', description: 'Smooth black coffee.', price: 209, category: 'HOT COFFEE', icon: '☕' },
    { name: 'Cortado', description: 'Espresso balanced with warm milk.', price: 229, category: 'HOT COFFEE', icon: '🥃' },
    { name: 'Caramel Macchiato', description: 'Creamy caramel flavored coffee.', price: 249, category: 'HOT COFFEE', icon: '🍯' },
    { name: 'Doppio Hot Chocolate', description: 'Warm signature hot chocolate.', price: 229, category: 'HOT COFFEE', icon: '🍫' },
    { name: 'Cafe Mocha', description: 'Perfect mix of espresso, chocolate, and milk.', price: 269, category: 'HOT COFFEE', icon: '☕' },
    { name: 'Classic Hot Chocolate', description: 'Traditional creamy rich hot chocolate.', price: 349, category: 'HOT COFFEE', icon: '🍫' },

    { name: 'Iced Matcha Latte', description: 'Refreshing creamy green tea latte over ice.', price: 329, category: 'MATCHA', icon: '🍵' },
    { name: 'Matcha Latte', description: 'Warm creamy matcha drink.', price: 329, category: 'MATCHA', icon: '🍵' },
    { name: 'Iced Strawberry Matcha', description: 'Strawberry and matcha layered drink.', price: 349, category: 'MATCHA', icon: '🍓' },
    { name: 'Iced Vanilla Matcha', description: 'Sweet vanilla infused matcha drink.', price: 329, category: 'MATCHA', icon: '🌿' },
    { name: 'Mango Matcha', description: 'Tropical mango and matcha fusion.', price: 349, category: 'MATCHA', icon: '🥭' },

    { name: 'Fries Salted', description: 'Crispy salted french fries.', price: 249, category: 'FRIES & SHARE PLATES', icon: '🍟' },
    { name: 'Fries Peri Peri', description: 'Spicy peri peri seasoned fries.', price: 269, category: 'FRIES & SHARE PLATES', icon: '🌶️' },
    { name: 'Fries Loaded', description: 'Cheese loaded fries.', price: 279, category: 'FRIES & SHARE PLATES', icon: '🧀' },
    { name: 'Potato Wedges Classic', description: 'Crispy potato wedges with dip.', price: 249, category: 'FRIES & SHARE PLATES', icon: '🥔' },
    { name: 'Potato Wedges Loaded', description: 'Cheese and sauce loaded wedges.', price: 279, category: 'FRIES & SHARE PLATES', icon: '🍟' },
    { name: 'Hot Chicken Wings', description: 'Crispy spicy hot chicken wings.', price: 329, category: 'FRIES & SHARE PLATES', icon: '🍗' },
    { name: 'Chicken Pops', description: 'Bite-sized crispy chicken pops.', price: 299, category: 'FRIES & SHARE PLATES', icon: '🍿' },
    { name: 'Chicken Nuggets', description: 'Classic delicious golden chicken nuggets.', price: 299, category: 'FRIES & SHARE PLATES', icon: '🍗' },
    { name: 'Chicken Finger', description: 'Crispy golden fried chicken fingers.', price: 299, category: 'FRIES & SHARE PLATES', icon: '🍗' },

    { name: 'Mojito', description: 'Chilled mint and lime mocktail.', price: 329, category: 'MOCKTAILS', icon: '🍹' },
    { name: 'Green Apple Soda', description: 'Refreshing sparkling green apple infusion.', price: 329, category: 'MOCKTAILS', icon: '🍏' },
    { name: 'Blue Lagoon', description: 'Tropical sweet and sour blue mocktail.', price: 329, category: 'MOCKTAILS', icon: '🥤' },
    { name: 'Spicy Guava Mojito', description: 'Spiced guava mixed with mint and lime.', price: 329, category: 'MOCKTAILS', icon: '🌶️' },
    { name: 'Lemon Iced Tea', description: 'Classic refreshing sweetened lemon iced tea.', price: 329, category: 'MOCKTAILS', icon: '🍋' },
    { name: 'Litchi and Lime Granita', description: 'Shaved ice dessert with litchi and lime.', price: 329, category: 'MOCKTAILS', icon: '🍧' },
    { name: 'Strawberry Granita', description: 'Iced strawberry blend.', price: 329, category: 'MOCKTAILS', icon: '🍓' },
    { name: 'Spicy Mango Martini', description: 'Zesty mango mocktail with a hint of chili spice.', price: 329, category: 'MOCKTAILS', icon: '🍸' },

    { name: 'Bombay Grilled Sandwich', description: 'Indian style grilled vegetable sandwich.', price: 369, category: 'SANDWICHES', icon: '🥪' },
    { name: 'Cheese Corn Grilled Sandwich', description: 'Grilled sandwich stuffed with cheese and corn.', price: 329, category: 'SANDWICHES', icon: '🌽' },
    { name: 'Cheese Chilli Sandwich', description: 'Spicy cheese sandwich toasted perfectly.', price: 349, category: 'SANDWICHES', icon: '🌶️' },

    { name: 'Nutella Thickshake', description: 'Thick chocolate hazelnut milkshake.', price: 299, category: 'THICK SHAKES', icon: '🍫' },
    { name: 'Oreo Cookies Thickshake', description: 'Oreo loaded creamy shake.', price: 299, category: 'THICK SHAKES', icon: '🍪' },
    { name: 'Salted Caramel Thickshake', description: 'Sweet caramel creamy shake.', price: 299, category: 'THICK SHAKES', icon: '🍯' },
    { name: 'Strawberry Thickshake', description: 'Fresh strawberry creamy shake.', price: 299, category: 'THICK SHAKES', icon: '🍓' },
    { name: 'Mango Smoothie', description: 'Tropical mango smoothie.', price: 299, category: 'THICK SHAKES', icon: '🥭' },
    { name: 'Kids Mnm Shake', description: 'Fun colorful M&M candy milkshake.', price: 299, category: 'THICK SHAKES', icon: '🍬' },

    { name: 'Cheese Garlic', description: 'Garlic bread with melted cheese.', price: 249, category: 'CLASSIC TOAST', icon: '🧄' },
    { name: 'Chilli Cheese Garlic', description: 'Spicy garlic cheese toast.', price: 259, category: 'CLASSIC TOAST', icon: '🌶️' },
    { name: 'Cheese Corn Toast', description: 'Toast topped with cheese and corn.', price: 289, category: 'CLASSIC TOAST', icon: '🌽' },
    { name: 'Cheese Mushroom Toast', description: 'Toast topped with mushroom and cheese.', price: 329, category: 'CLASSIC TOAST', icon: '🍄' },

    { name: 'Classic Cheese Omelette', description: 'Soft fluffy cheese omelette.', price: 247, category: 'EGGS', icon: '🍳' },
    { name: 'Garden Omelette', description: 'Veggie stuffed omelette with toast.', price: 295, category: 'EGGS', icon: '🥗' },
    { name: 'Masala Omelette', description: 'Indian spiced omelette.', price: 269, category: 'EGGS', icon: '🌶️' },
    { name: 'Butter Garlic Egg', description: 'Garlic butter tossed egg dish.', price: 279, category: 'EGGS', icon: '🧄' },

    { name: 'Classic Nachos', description: 'Nachos served with cheese dip.', price: 298, category: 'APPETIZERS', icon: '🧀' },
    { name: 'Loaded Nachos', description: 'Nachos loaded with salsa and cheese.', price: 269, category: 'APPETIZERS', icon: '🌶️' },

    { name: 'Swiggy Combo1', description: 'Premium combo tailored for Swiggy users.', price: 420, category: 'COMBOS', icon: '🍱' },
    { name: 'Swiggy Combo2', description: 'Luxury platter meal combination.', price: 600, category: 'COMBOS', icon: '🍱' },
    { name: 'Swiggy Combo3', description: 'Signature double-pack combo.', price: 530, category: 'COMBOS', icon: '🍱' },
    { name: 'Swiggy Combo4', description: 'Family snack and sip sharing combo.', price: 500, category: 'COMBOS', icon: '🍱' },
    { name: 'Swiggy Combo5', description: 'Perfect light breakfast pairing combo.', price: 430, category: 'COMBOS', icon: '🍱' },

    { name: 'Alfredo Pennei Pasta', description: 'Creamy rich Alfredo white sauce penne pasta.', price: 499, category: 'PASTA', icon: '🍝' }
  ];

  // Default Inventory values
  const defaultInventory = {
    coffee_beans: 3000,   // grams (3.0 kg)
    steamed_milk: 3000,   // ml (3.0 Liters)
    matcha_powder: 3000,  // grams (3.0 kg)
    cocoa_powder: 3000,   // grams (3.0 kg)
    paper_cups: 300,      // units
    sugar_syrup: 3000,    // ml
    snack_packs: 300      // units (fries/toast/eggs packaging)
  };

  // Get or Set localStorage states
  let menu = JSON.parse(localStorage.getItem('doppio_menu')) || defaultMenu;
  let inventory = JSON.parse(localStorage.getItem('doppio_inventory')) || defaultInventory;
  let bills = JSON.parse(localStorage.getItem('doppio_bills')) || [];
  
  // Set default initial state if empty
  if (!localStorage.getItem('doppio_menu')) localStorage.setItem('doppio_menu', JSON.stringify(menu));
  if (!localStorage.getItem('doppio_inventory')) localStorage.setItem('doppio_inventory', JSON.stringify(inventory));

  // Cart State
  let cart = [];
  let selectedPaymentMethod = 'UPI';

  // ==========================================
  // 2. CORE LAYOUT & NAVIGATION
  // ==========================================
  
  // Real-time Clock
  function updateDateTime() {
    const el = document.getElementById('dateTime');
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    }
  }
  updateDateTime();
  setInterval(updateDateTime, 30000);

  // Tab Switcher
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const tabContents = document.querySelectorAll('.tab-content');
  const tabTitle = document.getElementById('tab-title');
  const tabSubtitle = document.getElementById('tab-subtitle');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const tabId = link.getAttribute('data-tab');
      
      // Update sidebar active state
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Update workspace view
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');

      // Update titles
      tabTitle.textContent = link.textContent.trim();
      if (tabId === 'pos-tab') tabSubtitle.textContent = 'Default Tab: Selection Grid';
      else if (tabId === 'bills-tab') tabSubtitle.textContent = 'Print, Edit, or Delete Receipts';
      else if (tabId === 'inventory-tab') tabSubtitle.textContent = 'Live Ingredient & Resource Levels';
      else if (tabId === 'reports-tab') tabSubtitle.textContent = 'Nagpur Branch Sales & Analytics';
      else if (tabId === 'editor-tab') tabSubtitle.textContent = 'Manage Drink & Food Items';
      
      // Hook triggers
      if (tabId === 'inventory-tab') renderInventory();
      if (tabId === 'reports-tab') renderReports();
      if (tabId === 'bills-tab') renderBills();
      if (tabId === 'editor-tab') renderMenuEditor();
    });
  });

  // Generate Takeaway Order Number
  function generateOrderNumber() {
    const input = document.getElementById('order-num');
    if (input) {
      const num = 'DO-' + (1000 + bills.length + 1);
      input.value = num;
    }
  }
  generateOrderNumber();

  // ==========================================
  // 3. TAKEAWAY POS (TAB 1)
  // ==========================================
  const posSearch = document.getElementById('pos-search');
  const posCategories = document.getElementById('pos-categories');
  const posItemsGrid = document.getElementById('pos-items-grid');

  let activePOSCategory = 'ALL';
  let posSearchQuery = '';

  // Get categories from menu database
  function renderPOSCategories() {
    if (!posCategories) return;
    const categories = ['ALL', ...new Set(menu.map(item => item.category))];
    posCategories.innerHTML = '';
    
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `pos-cat-btn ${cat === activePOSCategory ? 'active' : ''}`;
      btn.setAttribute('data-category', cat);
      // Clean name
      let label = cat.toLowerCase().replace('&', 'and');
      label = label.charAt(0).toUpperCase() + label.slice(1);
      btn.textContent = label;
      posCategories.appendChild(btn);
    });
  }

  // Render items grid
  function renderPOSItems() {
    if (!posItemsGrid) return;
    posItemsGrid.innerHTML = '';

    const filteredItems = menu.filter(item => {
      const matchesCategory = activePOSCategory === 'ALL' || item.category === activeCategoryMapper(activePOSCategory);
      const matchesSearch = item.name.toLowerCase().includes(posSearchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(posSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    filteredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'pos-item-card';
      card.addEventListener('click', () => addToCart(item));

      card.innerHTML = `
        <div>
          <div class="pos-item-icon">${item.icon}</div>
          <div class="pos-item-title">${item.name}</div>
        </div>
        <div class="pos-item-price">₹${item.price}</div>
      `;
      posItemsGrid.appendChild(card);
    });
  }

  function activeCategoryMapper(cat) {
    return cat; // Category strings match exactly
  }

  // Handle Search & Filter clicks
  if (posSearch) {
    posSearch.addEventListener('input', (e) => {
      posSearchQuery = e.target.value;
      renderPOSItems();
    });
  }

  if (posCategories) {
    posCategories.addEventListener('click', (e) => {
      if (e.target.classList.contains('pos-cat-btn')) {
        document.querySelectorAll('.pos-cat-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        activePOSCategory = e.target.getAttribute('data-category');
        renderPOSItems();
      }
    });
  }

  // Cart operations
  function addToCart(menuItem) {
    const existing = cart.find(item => item.name === menuItem.name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...menuItem, qty: 1 });
    }
    renderCart();
  }

  function updateCartQty(name, delta) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.name !== name);
    }
    renderCart();
  }

  const cartList = document.getElementById('cart-items-list');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartGst = document.getElementById('cart-gst');
  const cartTotal = document.getElementById('cart-total');

  function renderCart() {
    if (!cartList) return;
    cartList.innerHTML = '';

    if (cart.length === 0) {
      cartList.innerHTML = `
        <div class="empty-cart-state">
          <i class="fa-solid fa-basket-shopping"></i>
          <p>Cart is currently empty.<br>Tap items to add.</p>
        </div>
      `;
      cartSubtotal.textContent = '₹0.00';
      cartGst.textContent = '₹0.00';
      cartTotal.textContent = '₹0.00';
      return;
    }

    let subtotal = 0;

    cart.forEach(item => {
      const rowTotal = item.price * item.qty;
      subtotal += rowTotal;

      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price-unit">₹${item.price} each</span>
        </div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn decrease" data-name="${item.name}"><i class="fa-solid fa-minus"></i></button>
          <span class="cart-item-qty">${item.qty}</span>
          <button class="cart-qty-btn increase" data-name="${item.name}"><i class="fa-solid fa-plus"></i></button>
        </div>
        <span class="cart-item-total">₹${rowTotal}</span>
      `;
      cartList.appendChild(row);
    });

    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    cartSubtotal.textContent = `₹${subtotal}`;
    cartGst.textContent = `₹${gst}`;
    cartTotal.textContent = `₹${total}`;
  }

  // Handle Cart Clicks (Plus / Minus)
  if (cartList) {
    cartList.addEventListener('click', (e) => {
      const btn = e.target.closest('.cart-qty-btn');
      if (!btn) return;
      const name = btn.getAttribute('data-name');
      const delta = btn.classList.contains('increase') ? 1 : -1;
      updateCartQty(name, delta);
    });
  }

  // Clear Cart
  const clearCartBtn = document.getElementById('clear-cart');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      const nameInput = document.getElementById('cust-name');
      if (nameInput) nameInput.value = '';
      renderCart();
    });
  }

  // Payment Selection
  const payBtns = document.querySelectorAll('.pay-method-btn');
  payBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      payBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPaymentMethod = btn.getAttribute('data-method');
    });
  });

  // Complete Checkout & print
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Cart is empty! Add drinks or food before checking out.');
        return;
      }

      const custNameInput = document.getElementById('cust-name');
      const custName = (custNameInput && custNameInput.value.trim()) || 'Takeaway Customer';
      const orderNum = document.getElementById('order-num').value;

      // 1. INVENTORY DEDUCTION MATH
      let sufficientStock = true;
      let missingItem = '';

      // Check stock sufficiency first
      const proposedDeductions = {};
      cart.forEach(cartItem => {
        const specs = getDeductionSpecs(cartItem);
        Object.keys(specs).forEach(ing => {
          proposedDeductions[ing] = (proposedDeductions[ing] || 0) + (specs[ing] * cartItem.qty);
        });
      });

      Object.keys(proposedDeductions).forEach(ing => {
        if (inventory[ing] < proposedDeductions[ing]) {
          sufficientStock = false;
          missingItem = ing.replace('_', ' ');
        }
      });

      if (!sufficientStock) {
        alert(`Insufficient stock! We do not have enough ${missingItem} in inventory to complete this order.`);
        return;
      }

      // Deduct from live inventory
      Object.keys(proposedDeductions).forEach(ing => {
        inventory[ing] -= proposedDeductions[ing];
      });
      localStorage.setItem('doppio_inventory', JSON.stringify(inventory));

      // Calculate totals
      let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const gst = Math.round(subtotal * 0.18);
      const total = subtotal + gst;

      // 2. CREATE TRANSACTION BILL
      const newBill = {
        orderId: orderNum,
        customerName: custName,
        dateTime: new Date().toLocaleString('en-IN'),
        items: [...cart],
        subtotal: subtotal,
        gst: gst,
        total: total,
        paymentMethod: selectedPaymentMethod
      };

      bills.push(newBill);
      localStorage.setItem('doppio_bills', JSON.stringify(bills));

      // 3. COMPILE AND TRIGGER THERMAL RECEIPT PRINTING
      triggerThermalReceiptPrint(newBill);

      // Reset cart and fields
      cart = [];
      if (custNameInput) custNameInput.value = '';
      generateOrderNumber();
      renderCart();
      checkLowStockAlerts();
    });
  }

  // Recipe specs for ingredient deduction
  function getDeductionSpecs(item) {
    const specs = { paper_cups: 0, coffee_beans: 0, steamed_milk: 0, matcha_powder: 0, cocoa_powder: 0, sugar_syrup: 0, snack_packs: 0 };
    
    const cat = item.category;
    
    if (cat === 'COLD COFFEE' || cat === 'HOT COFFEE') {
      specs.paper_cups = 1;
      specs.coffee_beans = 20; // 20g beans
      specs.sugar_syrup = 10;  // 10ml syrup
      if (item.name.toLowerCase().includes('latte') || 
          item.name.toLowerCase().includes('cappuccino') || 
          item.name.toLowerCase().includes('flat white') ||
          item.name.toLowerCase().includes('macchiato') ||
          item.name.toLowerCase().includes('frappe') ||
          item.name.toLowerCase().includes('mocha')) {
        specs.steamed_milk = 200; // 200ml milk
      }
    } else if (cat === 'MATCHA') {
      specs.paper_cups = 1;
      specs.matcha_powder = 5; // 5g matcha
      specs.sugar_syrup = 15;
      if (item.name.toLowerCase().includes('latte') || item.name.toLowerCase().includes('matcha')) {
        specs.steamed_milk = 200;
      }
    } else if (cat === 'THICK SHAKES') {
      specs.paper_cups = 1;
      specs.steamed_milk = 150; // uses milk
      specs.sugar_syrup = 20;
      if (item.name.toLowerCase().includes('nutella') || item.name.toLowerCase().includes('oreo')) {
        specs.cocoa_powder = 25; // flavor powder
      }
    } else if (cat === 'MOCKTAILS') {
      specs.paper_cups = 1;
      specs.sugar_syrup = 30; // syrup bases
    } else if (cat === 'FRIES & SHARE PLATES' || cat === 'SANDWICHES' || cat === 'CLASSIC TOAST' || cat === 'EGGS' || cat === 'APPETIZERS' || cat === 'PASTA' || cat === 'COMBOS') {
      specs.snack_packs = 1; // packing unit
    }

    return specs;
  }

  // ==========================================
  // 4. THERMAL RECEIPT COMPILER
  // ==========================================
  function triggerThermalReceiptPrint(bill) {
    const el = document.getElementById('thermal-receipt');
    if (!el) return;

    let itemsRows = '';
    bill.items.forEach(item => {
      itemsRows += `
        <tr>
          <td class="receipt-item-col">${item.name}</td>
          <td class="receipt-qty-col">${item.qty}</td>
          <td class="receipt-price-col">₹${item.price * item.qty}</td>
        </tr>
      `;
    });

    el.innerHTML = `
      <div class="receipt-header">
        <div class="receipt-title">DOPPIO CAFE</div>
        <div class="receipt-subtitle">London Street, Nagpur</div>
        <div class="receipt-subtitle">Ph: +91 91300 03177</div>
      </div>
      <div class="receipt-divider"></div>
      <div class="receipt-meta-row">
        <span>Bill ID: ${bill.orderId}</span>
        <span>Type: Takeaway</span>
      </div>
      <div class="receipt-meta-row">
        <span>Date: ${bill.dateTime}</span>
      </div>
      <div class="receipt-meta-row">
        <span>Cust: ${bill.customerName}</span>
      </div>
      <div class="receipt-divider"></div>
      
      <table class="receipt-table">
        <thead>
          <tr>
            <th class="receipt-item-col">Item</th>
            <th class="receipt-qty-col">Qty</th>
            <th class="receipt-price-col">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>
      
      <div class="receipt-divider"></div>
      
      <div class="receipt-summary-block">
        <div class="receipt-summary-row">
          <span>Subtotal</span>
          <span>₹${bill.subtotal}</span>
        </div>
        <div class="receipt-summary-row">
          <span>GST (18%)</span>
          <span>₹${bill.gst}</span>
        </div>
        <div class="receipt-summary-row bold">
          <span>Grand Total</span>
          <span>₹${bill.total}</span>
        </div>
      </div>
      
      <div class="receipt-divider"></div>
      <div class="receipt-meta-row" style="margin-top: 4px; justify-content: center; font-size: 8px;">
        <span>Payment Method: ${bill.paymentMethod}</span>
      </div>
      
      <div class="receipt-footer">
        <p>Thank you for choosing Doppio Cafe!</p>
        <p>Served with passion by bonie</p>
      </div>
    `;

    // Trigger Print
    window.print();
  }

  // ==========================================
  // 5. BILLS MANAGEMENT (TAB 2)
  // ==========================================
  const billsTableBody = document.getElementById('bills-table-body');
  const billsSearchInput = document.getElementById('bills-search-input');
  const billsCount = document.getElementById('bills-count');

  let billsSearchQuery = '';

  function renderBills() {
    if (!billsTableBody) return;
    billsTableBody.innerHTML = '';

    const filteredBills = bills.filter(bill => {
      return bill.customerName.toLowerCase().includes(billsSearchQuery.toLowerCase()) || 
             bill.orderId.toLowerCase().includes(billsSearchQuery.toLowerCase());
    });

    if (billsCount) billsCount.textContent = `Showing ${filteredBills.length} Bills`;

    if (filteredBills.length === 0) {
      billsTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px;">
            <i class="fa-solid fa-receipt" style="font-size: 30px; color: var(--accent-caramel); margin-bottom: 10px; display: block;"></i>
            No matching cashier bills found.
          </td>
        </tr>
      `;
      return;
    }

    // Sort showing newest bills first
    const sortedBills = [...filteredBills].reverse();

    sortedBills.forEach(bill => {
      const tr = document.createElement('tr');
      
      let itemsListStr = bill.items.map(item => `${item.name} (${item.qty})`).join(', ');
      if (itemsListStr.length > 30) itemsListStr = itemsListStr.substring(0, 27) + '...';

      const methodClass = bill.paymentMethod.toLowerCase();

      tr.innerHTML = `
        <td style="font-weight: 700;">${bill.orderId}</td>
        <td>${bill.customerName}</td>
        <td>${bill.dateTime}</td>
        <td title="${bill.items.map(i => `${i.name} (x${i.qty})`).join(', ')}">${itemsListStr}</td>
        <td><span class="payment-badge ${methodClass}">${bill.paymentMethod}</span></td>
        <td style="font-weight: 700; color: var(--accent-caramel);">₹${bill.total}</td>
        <td>
          <button class="table-action-btn print" data-id="${bill.orderId}" title="Print Receipt"><i class="fa-solid fa-print"></i></button>
          <button class="table-action-btn edit" data-id="${bill.orderId}" title="Edit Customer"><i class="fa-solid fa-user-pen"></i></button>
          <button class="table-action-btn delete" data-id="${bill.orderId}" title="Delete Bill"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      `;
      billsTableBody.appendChild(tr);
    });
  }

  // Hook Bills Action Buttons (Print, Edit, Delete)
  if (billsTableBody) {
    billsTableBody.addEventListener('click', (e) => {
      const btn = e.target.closest('.table-action-btn');
      if (!btn) return;

      const orderId = btn.getAttribute('data-id');
      const targetBillIndex = bills.findIndex(b => b.orderId === orderId);
      if (targetBillIndex === -1) return;

      if (btn.classList.contains('print')) {
        triggerThermalReceiptPrint(bills[targetBillIndex]);
      } else if (btn.classList.contains('edit')) {
        const newName = prompt('Edit Takeaway Customer Name:', bills[targetBillIndex].customerName);
        if (newName !== null && newName.trim() !== '') {
          bills[targetBillIndex].customerName = newName.trim();
          localStorage.setItem('doppio_bills', JSON.stringify(bills));
          renderBills();
        }
      } else if (btn.classList.contains('delete')) {
        if (confirm(`Are you sure you want to delete bill ${orderId}? This cannot be undone.`)) {
          // Optional: Restore inventory specs
          const bill = bills[targetBillIndex];
          bill.items.forEach(cartItem => {
            const specs = getDeductionSpecs(cartItem);
            Object.keys(specs).forEach(ing => {
              inventory[ing] += (specs[ing] * cartItem.qty);
            });
          });
          localStorage.setItem('doppio_inventory', JSON.stringify(inventory));
          
          bills.splice(targetBillIndex, 1);
          localStorage.setItem('doppio_bills', JSON.stringify(bills));
          renderBills();
          checkLowStockAlerts();
        }
      }
    });
  }

  if (billsSearchInput) {
    billsSearchInput.addEventListener('input', (e) => {
      billsSearchQuery = e.target.value;
      renderBills();
    });
  }

  // ==========================================
  // 6. INVENTORY TAB (TAB 3)
  // ==========================================
  const inventoryGrid = document.getElementById('inventory-grid');
  const restockBtn = document.getElementById('restock-inventory-btn');

  function renderInventory() {
    if (!inventoryGrid) return;
    inventoryGrid.innerHTML = '';

    const items = [
      { key: 'coffee_beans', label: 'Coffee Beans', max: 3000, unit: 'g' },
      { key: 'steamed_milk', label: 'Steamed Milk', max: 3000, unit: 'ml' },
      { key: 'matcha_powder', label: 'Matcha Powder', max: 3000, unit: 'g' },
      { key: 'cocoa_powder', label: 'Cocoa Powder', max: 3000, unit: 'g' },
      { key: 'paper_cups', label: 'Takeaway Paper Cups', max: 300, unit: 'pcs' },
      { key: 'sugar_syrup', label: 'Sugar & Syrups', max: 3000, unit: 'ml' },
      { key: 'snack_packs', label: 'Food Snack Packs', max: 300, unit: 'pcs' }
    ];

    items.forEach(item => {
      const current = inventory[item.key];
      const percent = Math.min(100, Math.round((current / item.max) * 100));
      const isLow = current < (item.key.includes('cup') || item.key.includes('snack') ? 25 : 400);

      const card = document.createElement('div');
      card.className = 'inventory-card';
      card.innerHTML = `
        <div class="inventory-card-title">
          <h3>${item.label}</h3>
          <span class="inventory-amount">${formatStockValue(current, item.key)}</span>
        </div>
        <div class="inventory-progress-wrapper">
          <div class="inventory-progress-bar ${isLow ? 'low' : ''}" style="width: ${percent}%;"></div>
        </div>
        <div class="inventory-card-footer">
          <span>Capacity: ${item.max} ${item.unit}</span>
          <span>${percent}% Remaining</span>
        </div>
      `;
      inventoryGrid.appendChild(card);
    });
  }

  function formatStockValue(val, key) {
    if (key === 'paper_cups' || key === 'snack_packs') return `${val} units`;
    if (val >= 1000) return `${(val/1000).toFixed(2)} kg`;
    return `${val} ${key.includes('milk') || key.includes('syrup') ? 'ml' : 'g'}`;
  }

  if (restockBtn) {
    restockBtn.addEventListener('click', () => {
      inventory = { ...defaultInventory };
      localStorage.setItem('doppio_inventory', JSON.stringify(inventory));
      renderInventory();
      checkLowStockAlerts();
      alert('Inventory successfully restocked to full standard capacity (3.0 kg / 300 units)!');
    });
  }

  // Real-time alerts banner
  const alertsContainer = document.getElementById('low-stock-alerts');
  function checkLowStockAlerts() {
    if (!alertsContainer) return;
    alertsContainer.innerHTML = '';

    const warnings = [];
    if (inventory.coffee_beans < 400) warnings.push(`Warning: Coffee Beans are very low (${(inventory.coffee_beans/1000).toFixed(2)} kg remaining). Please restock immediately.`);
    if (inventory.steamed_milk < 600) warnings.push(`Warning: Steamed Milk is very low (${(inventory.steamed_milk/1000).toFixed(2)} L remaining). Please restock immediately.`);
    if (inventory.matcha_powder < 100) warnings.push(`Warning: Matcha Powder is very low (${inventory.matcha_powder}g remaining).`);
    if (inventory.paper_cups < 20) warnings.push(`Warning: Takeaway Paper Cups are critically low (${inventory.paper_cups} left).`);

    warnings.forEach(warn => {
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert-banner';
      alertDiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>${warn}</span>`;
      alertsContainer.appendChild(alertDiv);
    });
  }
  checkLowStockAlerts();

  // ==========================================
  // 7. SALES REPORTS & EXPORTERS (TAB 4)
  // ==========================================
  const reportRevenue = document.getElementById('report-total-revenue');
  const reportOrders = document.getElementById('report-total-orders');
  const reportTopItem = document.getElementById('report-top-item');
  const ledgerList = document.getElementById('report-ledger-list');
  const ingStatsList = document.getElementById('ingredient-stats-list');

  function renderReports() {
    // 1. Calculate Summary Cards
    const totalRev = bills.reduce((sum, b) => sum + b.total, 0);
    if (reportRevenue) reportRevenue.textContent = `₹${totalRev}`;
    if (reportOrders) reportOrders.textContent = bills.length;

    // Calculate Top Item
    const itemCounts = {};
    bills.forEach(b => {
      b.items.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
      });
    });

    let topItem = '-';
    let maxQty = 0;
    Object.keys(itemCounts).forEach(name => {
      if (itemCounts[name] > maxQty) {
        maxQty = itemCounts[name];
        topItem = name;
      }
    });
    if (reportTopItem) reportTopItem.textContent = topItem !== '-' ? `${topItem} (${maxQty} sold)` : '-';

    // 2. Render Order Logs Summary
    if (ledgerList) {
      ledgerList.innerHTML = '';
      if (bills.length === 0) {
        ledgerList.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding:20px;">No sales logged.</p>';
      } else {
        const sorted = [...bills].reverse();
        sorted.forEach(bill => {
          const item = document.createElement('div');
          item.className = 'ledger-item';
          item.innerHTML = `
            <div class="ledger-details">
              <span class="ledger-title">${bill.customerName} (${bill.orderId})</span>
              <span class="ledger-meta">${bill.dateTime} • ${bill.paymentMethod}</span>
            </div>
            <span class="ledger-price">₹${bill.total}</span>
          `;
          ledgerList.appendChild(item);
        });
      }
    }

    // 3. Render Ingredient resource consumption report
    if (ingStatsList) {
      ingStatsList.innerHTML = '';
      
      const usedBeans = 3000 - inventory.coffee_beans;
      const usedMilk = 3000 - inventory.steamed_milk;
      const usedMatcha = 3000 - inventory.matcha_powder;
      const usedCocoa = 3000 - inventory.cocoa_powder;
      const usedCups = 300 - inventory.paper_cups;
      const usedSnackPacks = 300 - inventory.snack_packs;

      const items = [
        { label: 'Coffee Beans Consumed', value: usedBeans, max: 3000, unit: 'g' },
        { label: 'Steamed Milk Consumed', value: usedMilk, max: 3000, unit: 'ml' },
        { label: 'Matcha Powder Consumed', value: usedMatcha, max: 3000, unit: 'g' },
        { label: 'Cocoa Powder Consumed', value: usedCocoa, max: 3000, unit: 'g' },
        { label: 'Paper Cups Utilized', value: usedCups, max: 300, unit: 'pcs' },
        { label: 'Takeaway Food Packs Utilized', value: usedSnackPacks, max: 300, unit: 'pcs' }
      ];

      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'ingredient-stat-row';
        row.innerHTML = `
          <span class="ing-stat-name">${item.label}</span>
          <span class="ing-stat-amount">${item.value < 0 ? 0 : item.value} ${item.unit} (${Math.round(Math.max(0, item.value / item.max) * 100)}% capacity used)</span>
        `;
        ingStatsList.appendChild(row);
      });
    }
  }

  // EXCEL / CSV DATABASE EXPORTER
  const excelBtn = document.getElementById('export-excel-btn');
  if (excelBtn) {
    excelBtn.addEventListener('click', () => {
      if (bills.length === 0) {
        alert('No bills logged to export!');
        return;
      }

      // Compose CSV string
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += 'Order ID,Customer Name,Date and Time,Items Ordered,Payment Method,Subtotal (INR),GST (INR),Total Bill (INR)\n';

      bills.forEach(bill => {
        const itemsStr = bill.items.map(i => `${i.name} (x${i.qty})`).join('; ');
        const row = `"${bill.orderId}","${bill.customerName}","${bill.dateTime}","${itemsStr}","${bill.paymentMethod}",${bill.subtotal},${bill.gst},${bill.total}`;
        csvContent += row + '\n';
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `doppio_nagpur_sales_report_${new Date().toLocaleDateString()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // PDF EXPORTER
  const pdfBtn = document.getElementById('export-pdf-btn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      const printWindow = window.open('', '_blank');
      
      const totalRev = bills.reduce((sum, b) => sum + b.total, 0);
      let billsRows = '';
      bills.forEach(b => {
        billsRows += `
          <tr>
            <td style="padding:8px; border-bottom:1px solid #ddd;">${b.orderId}</td>
            <td style="padding:8px; border-bottom:1px solid #ddd;">${b.customerName}</td>
            <td style="padding:8px; border-bottom:1px solid #ddd;">${b.dateTime}</td>
            <td style="padding:8px; border-bottom:1px solid #ddd;">${b.items.map(i => `${i.name} (x${i.qty})`).join(', ')}</td>
            <td style="padding:8px; border-bottom:1px solid #ddd;">${b.paymentMethod}</td>
            <td style="padding:8px; border-bottom:1px solid #ddd; font-weight:bold;">₹${b.total}</td>
          </tr>
        `;
      });

      printWindow.document.write(`
        <html>
        <head>
          <title>Doppio Cafe Nagpur | Sales Analytics Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #2C1B18; }
            h1 { font-family: Georgia, serif; text-align: center; border-bottom: 2px solid #2C1B18; padding-bottom: 10px; }
            .meta-panel { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px; }
            .metrics-panel { display: flex; gap: 20px; margin-bottom: 30px; }
            .metric-box { flex: 1; border: 1px solid #ddd; padding: 20px; border-radius: 8px; text-align: center; }
            .metric-box h2 { font-size: 24px; color: #C88A58; margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #F5EBE0; padding: 10px; border-bottom: 2px solid #2C1B18; text-align: left; }
          </style>
        </head>
        <body>
          <h1>DOPPIO CAFE NAGPUR</h1>
          <h3 style="text-align: center; margin-top: -10px; color: #7E6E6A;">Takeaway POS Sales & Ledger Audit Report</h3>
          
          <div class="meta-panel">
            <span>Report Date: ${new Date().toLocaleDateString('en-IN')}</span>
            <span>Generated By: cashier (bonie)</span>
          </div>

          <div class="metrics-panel">
            <div class="metric-box">
              <h3>Total Sales Revenue</h3>
              <h2>₹${totalRev}</h2>
            </div>
            <div class="metric-box">
              <h3>Total Orders Logged</h3>
              <h2>${bills.length}</h2>
            </div>
          </div>

          <h3>Ledger Transactions Log</h3>
          <table>
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Customer</th>
                <th>Date & Time</th>
                <th>Items Ordered</th>
                <th>Payment</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${billsRows || '<tr><td colspan="6" style="text-align:center; padding:20px;">No sales logged in Nagpur branch database.</td></tr>'}
            </tbody>
          </table>
          
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    });
  }

  // ==========================================
  // 8. MENU CRUD EDITOR (TAB 5)
  // ==========================================
  const editorGrid = document.getElementById('editor-items-grid');
  const addBtn = document.getElementById('add-new-menu-btn');
  const cancelBtn = document.getElementById('cancel-edit-btn');
  const editorForm = document.getElementById('menu-item-editor-form');
  const formPanelTitle = document.getElementById('form-panel-title');

  function renderMenuEditor() {
    if (!editorGrid) return;
    editorGrid.innerHTML = '';

    menu.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'editor-item-card';
      card.innerHTML = `
        <div class="editor-card-header">
          <span class="editor-card-icon">${item.icon}</span>
          <span class="editor-card-price">₹${item.price}</span>
        </div>
        <div>
          <div class="editor-card-title">${item.name}</div>
          <div class="editor-card-category">${item.category}</div>
        </div>
        <div class="editor-card-actions">
          <button class="editor-action-btn edit" data-index="${index}"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="editor-action-btn delete" data-index="${index}"><i class="fa-solid fa-trash-can"></i> Delete</button>
        </div>
      `;
      editorGrid.appendChild(card);
    });
  }

  // Hook edit and delete buttons inside Grid
  if (editorGrid) {
    editorGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.editor-action-btn');
      if (!btn) return;

      const index = parseInt(btn.getAttribute('data-index'), 10);
      
      if (btn.classList.contains('edit')) {
        // Load item into Editor Form
        const item = menu[index];
        document.getElementById('edit-item-index').value = index;
        document.getElementById('item-name-input').value = item.name;
        document.getElementById('item-category-input').value = item.category;
        document.getElementById('item-price-input').value = item.price;
        document.getElementById('item-desc-input').value = item.description || '';
        document.getElementById('item-icon-input').value = item.icon;

        if (formPanelTitle) formPanelTitle.textContent = 'Edit Menu Item';
        document.getElementById('save-item-btn').textContent = 'Update Item';
      } else if (btn.classList.contains('delete')) {
        if (confirm(`Are you sure you want to delete ${menu[index].name} from the menu?`)) {
          menu.splice(index, 1);
          localStorage.setItem('doppio_menu', JSON.stringify(menu));
          renderMenuEditor();
          renderPOSCategories();
          renderPOSItems();
        }
      }
    });
  }

  // Reset Editor Form
  function resetEditorForm() {
    if (editorForm) editorForm.reset();
    document.getElementById('edit-item-index').value = '';
    if (formPanelTitle) formPanelTitle.textContent = 'Add New Menu Item';
    document.getElementById('save-item-btn').textContent = 'Save Menu Item';
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', resetEditorForm);
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      resetEditorForm();
      document.getElementById('item-name-input').focus();
    });
  }

  // Form Submit (Save / Update Item)
  if (editorForm) {
    editorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const indexStr = document.getElementById('edit-item-index').value;
      const name = document.getElementById('item-name-input').value.trim();
      const category = document.getElementById('item-category-input').value;
      const price = parseInt(document.getElementById('item-price-input').value, 10);
      const description = document.getElementById('item-desc-input').value.trim();
      const icon = document.getElementById('item-icon-input').value.trim();

      const newItem = { name, category, price, description, icon };

      if (indexStr === '') {
        // Add new item
        menu.push(newItem);
      } else {
        // Update item
        const index = parseInt(indexStr, 10);
        menu[index] = newItem;
      }

      localStorage.setItem('doppio_menu', JSON.stringify(menu));
      resetEditorForm();
      renderMenuEditor();
      renderPOSCategories();
      renderPOSItems();
    });
  }

  // ==========================================
  // 9. INITIAL BOOTSTRAP TRIGGERS
  // ==========================================
  renderPOSCategories();
  renderPOSItems();
  renderCart();
});
