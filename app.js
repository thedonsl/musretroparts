/* ==========================================================================
   MUSA RETRO PARTS (武佐 レトロパーツ) - CORE JS APPLICATION
   Tagline: 武佐 = Spare Parts Warrior
   Features:
   - Left-hand Vehicle Hierarchy (Makes > Models > Years)
   - Real-time catalog filtering & searching
   - Product details modal with photo gallery
   - Interactive PayPal Smart Payment SDK simulation
   - Complete Admin Portal (CRUD for Makes, Models, Years, Parts)
   - LocalStorage state persistence
   ========================================================================== */

// --- INITIAL DEFAULT DATABASE STATE ---
const DEFAULT_MAKES = [
  { id: 'datsun_nissan', name: 'Datsun / Nissan', icon: 'fa-car' },
  { id: 'honda', name: 'Honda', icon: 'fa-car-side' },
  { id: 'mazda', name: 'Mazda', icon: 'fa-circle-notch' },
  { id: 'suzuki', name: 'Suzuki', icon: 'fa-bolt' },
  { id: 'toyota', name: 'Toyota', icon: 'fa-crown' }
];

const DEFAULT_MODELS = [
  // Datsun / Nissan
  { id: '240z_280z', makeId: 'datsun_nissan', name: '240Z / 260Z / 280Z (S30)', years: [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978] },
  { id: '280zx', makeId: 'datsun_nissan', name: '280ZX (S130)', years: [1979, 1980, 1981, 1982, 1983] },
  { id: 'skyline_r32', makeId: 'datsun_nissan', name: 'Skyline GT-R (R32)', years: [1989, 1990, 1991, 1992, 1993, 1994] },
  { id: 'skyline_r33', makeId: 'datsun_nissan', name: 'Skyline GT-R (R33)', years: [1995, 1996, 1997, 1998] },
  { id: '300zx_z32', makeId: 'datsun_nissan', name: '300ZX Twin Turbo (Z32)', years: [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
  { id: 'silvia_s13', makeId: 'datsun_nissan', name: 'Silvia S13 / 180SX', years: [1989, 1990, 1991, 1992, 1993, 1994] },
  
  // Honda
  { id: 'crx_ef', makeId: 'honda', name: 'CR-X / Civic Si (EF)', years: [1988, 1989, 1990, 1991] },
  { id: 'civic_eg', makeId: 'honda', name: 'Civic Si / SiR (EG)', years: [1992, 1993, 1994, 1995] },
  { id: 'civic_ek', makeId: 'honda', name: 'Civic Type R (EK9)', years: [1996, 1997, 1998, 1999] },
  { id: 'nsx_na1', makeId: 'honda', name: 'NSX (NA1)', years: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
  { id: 'integra_dc2', makeId: 'honda', name: 'Integra Type R (DC2)', years: [1995, 1996, 1997, 1998, 1999] },

  // Mazda
  { id: 'rx7_fb', makeId: 'mazda', name: 'RX-7 Savanna (FB/SA22C)', years: [1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985] },
  { id: 'rx7_fc', makeId: 'mazda', name: 'RX-7 Turbo II (FC3S)', years: [1986, 1987, 1988, 1989, 1990, 1991] },
  { id: 'rx7_fd', makeId: 'mazda', name: 'RX-7 Efini Twin Turbo (FD3S)', years: [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
  { id: 'miata_na', makeId: 'mazda', name: 'MX-5 Eunos Roadster (NA)', years: [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997] },

  // Suzuki
  { id: 'cappuccino', makeId: 'suzuki', name: 'Cappuccino Turbo (EA11R/21R)', years: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998] },
  { id: 'jimny_ja11', makeId: 'suzuki', name: 'Jimny Turbo (JA11/JA12)', years: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998] },
  { id: 'swift_gti', makeId: 'suzuki', name: 'Swift GTi (AA34S)', years: [1989, 1990, 1991, 1992, 1993, 1994] },

  // Toyota
  { id: 'ae86', makeId: 'toyota', name: 'Corolla Levin / Trueno (AE86)', years: [1983, 1984, 1985, 1986, 1987] },
  { id: 'supra_mk3', makeId: 'toyota', name: 'Supra Turbo (MA70 / JZA70)', years: [1986, 1987, 1988, 1989, 1990, 1991, 1992] },
  { id: 'supra_mk4', makeId: 'toyota', name: 'Supra RZ Twin Turbo (JZA80)', years: [1993, 1994, 1995, 1996, 1997, 1998, 1999] },
  { id: 'celica_gtfour', makeId: 'toyota', name: 'Celica GT-Four (ST185/205)', years: [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
  { id: 'mr2_sw20', makeId: 'toyota', name: 'MR2 GT Turbo (SW20)', years: [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] }
];

const DEFAULT_PARTS = [
  {
    id: 'part_1',
    name: 'Datsun 240Z Triple Weber 45 DCOE Carburetor Assembly',
    oemNumber: '19030-L28WB',
    makeId: 'datsun_nissan',
    modelId: '240z_280z',
    startYear: 1970,
    endYear: 1978,
    category: 'Engine',
    price: 1850.00,
    stock: 3,
    condition: 'OEM Restored',
    description: 'Authentic restored Triple Weber 45 DCOE carburetors with high-velocity stacks and polished manifold for Datsun 240Z, 260Z, and 280Z L-series engines. Fully recalibrated and flow-tested.',
    images: [
      'https://images.unsplash.com/photo-1698180830151-58df39322115?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626668011687-8a114cf5a34c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'part_2',
    name: 'Nissan Skyline GT-R R32 Nismo 320km/h Gauge Cluster',
    oemNumber: '24810-RN580',
    makeId: 'datsun_nissan',
    modelId: 'skyline_r32',
    startYear: 1989,
    endYear: 1994,
    category: 'Interior',
    price: 1420.00,
    stock: 2,
    condition: 'Rare NOS',
    description: 'Ultra rare New Old Stock (NOS) Nismo white instrument gauge cluster for Nissan Skyline GT-R R32 BNR32. 320 km/h speedometer with 10,000 RPM tachometer.',
    images: [
      'https://images.unsplash.com/photo-1601488674014-aea2be68ebe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'part_3',
    name: 'Toyota AE86 TRD 4A-GE High-Response Twin Cam Valve Cover',
    oemNumber: '11201-AE86-TRD',
    makeId: 'toyota',
    modelId: 'ae86',
    startYear: 1983,
    endYear: 1987,
    category: 'Engine',
    price: 680.00,
    stock: 5,
    condition: 'NOS Boxed',
    description: 'Original Toyota Racing Development (TRD) wrinkle red valve cover for 4A-GE 16V engines fitted in Corolla Levin and Sprinter Trueno AE86 models. Includes original gasket kit.',
    images: [
      'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'part_4',
    name: 'Mazda RX-7 FD3S Efini Sequential Twin Turbocharger Assembly',
    oemNumber: 'N3A1-13-700',
    makeId: 'mazda',
    modelId: 'rx7_fd',
    startYear: 1992,
    endYear: 1999,
    category: 'Engine',
    price: 2100.00,
    stock: 1,
    condition: 'OEM Restored',
    description: 'Hitachi HT12 sequential twin turbocharger set for Mazda RX-7 FD3S 13B-REW rotary engine. Fully overhauled with upgraded 360-degree thrust bearings.',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'part_5',
    name: 'Honda NSX NA1 Titanium Weighted Shift Knob & Boot',
    oemNumber: '54102-SL0-003',
    makeId: 'honda',
    modelId: 'nsx_na1',
    startYear: 1990,
    endYear: 1999,
    category: 'Interior',
    price: 450.00,
    stock: 4,
    condition: 'OEM Original',
    description: 'Factory original Honda NSX NA1 polished titanium shift knob with authentic black leather shift boot and red stitching.',
    images: [
      'https://images.unsplash.com/photo-1651913166649-43666d6d84a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560270034-7a13d74c0e6f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'part_6',
    name: 'Suzuki Cappuccino EA11R F6A Intercooler & Hardpipe Kit',
    oemNumber: '13700-80F00',
    makeId: 'suzuki',
    modelId: 'cappuccino',
    startYear: 1991,
    endYear: 1998,
    category: 'Engine',
    price: 520.00,
    stock: 6,
    condition: 'JDM Performance',
    description: 'High-flow aluminum intercooler unit with polished piping designed specifically for Suzuki Cappuccino EA11R F6A turbo Kei car.',
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494ceb8?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'part_7',
    name: 'Toyota Supra JZA80 Euro-Spec Glass Headlight Assemblies (Pair)',
    oemNumber: '81110-1B240',
    makeId: 'toyota',
    modelId: 'supra_mk4',
    startYear: 1993,
    endYear: 1999,
    category: 'Exterior',
    price: 1650.00,
    stock: 2,
    condition: 'NOS Boxed',
    description: 'Genuine Toyota JZA80 Supra Euro glass headlights. Eliminates yellowing plastic housings; clean glass lenses with inner chrome bezels.',
    images: [
      'https://images.unsplash.com/photo-1626668011687-8a114cf5a34c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'part_8',
    name: 'Datsun 240Z Fairlady Z Vintage Leather Steering Wheel (350mm)',
    oemNumber: '48430-E4100',
    makeId: 'datsun_nissan',
    modelId: '240z_280z',
    startYear: 1970,
    endYear: 1978,
    category: 'Interior',
    price: 890.00,
    stock: 2,
    condition: 'OEM Vintage',
    description: 'Iconic Fairlady Z competition steering wheel featuring real wood/leather finish and original Z emblem horn button.',
    images: [
      'https://images.unsplash.com/photo-1626668011687-8a114cf5a34c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

// --- APP STATE ---
let state = {
  makes: JSON.parse(localStorage.getItem('musa_makes')) || DEFAULT_MAKES,
  models: JSON.parse(localStorage.getItem('musa_models')) || DEFAULT_MODELS,
  parts: JSON.parse(localStorage.getItem('musa_parts')) || DEFAULT_PARTS,
  cart: JSON.parse(localStorage.getItem('musa_cart')) || [],
  
  // Filters
  selectedMakeId: null,
  selectedModelId: null,
  selectedYear: null,
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',

  // Active UI
  currentView: 'shop', // 'home', 'shop', 'about', 'contact', 'admin'
  activeModalPartId: null,
  adminTab: 'parts' // 'makes', 'models', 'parts'
};

// Save state helper
function saveState() {
  localStorage.setItem('musa_makes', JSON.stringify(state.makes));
  localStorage.setItem('musa_models', JSON.stringify(state.models));
  localStorage.setItem('musa_parts', JSON.stringify(state.parts));
  localStorage.setItem('musa_cart', JSON.stringify(state.cart));
}

// Reset data helper
function resetToDefaultData() {
  if (confirm('Reset catalog, makes, models, and parts to original factory dataset?')) {
    localStorage.clear();
    state.makes = [...DEFAULT_MAKES];
    state.models = [...DEFAULT_MODELS];
    state.parts = [...DEFAULT_PARTS];
    state.cart = [];
    saveState();
    initApp();
  }
}

// --- DOM ELEMENT REFERENCES ---
const views = {
  home: document.getElementById('view-home'),
  shop: document.getElementById('view-shop'),
  about: document.getElementById('view-about'),
  contact: document.getElementById('view-contact'),
  admin: document.getElementById('view-admin')
};

// --- ROUTING & NAVIGATION ---
function navigateTo(viewName) {
  state.currentView = viewName;
  Object.keys(views).forEach(key => {
    if (views[key]) {
      views[key].classList.toggle('active', key === viewName);
    }
  });

  // Update navbar links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.view === viewName);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewName === 'shop') renderShopCatalog();
  if (viewName === 'admin') renderAdminView();
}

// --- HIERARCHY & SIDEBAR RENDERER ---
function renderVehicleSidebar() {
  const treeContainer = document.getElementById('vehicle-tree-container');
  if (!treeContainer) return;

  treeContainer.innerHTML = '';

  state.makes.forEach(make => {
    const makeModels = state.models.filter(m => m.makeId === make.id);
    const makePartsCount = state.parts.filter(p => p.makeId === make.id).length;

    const makeLi = document.createElement('li');
    makeLi.className = `make-item ${state.selectedMakeId === make.id ? 'open' : ''}`;

    const makeHeader = document.createElement('div');
    makeHeader.className = 'make-header';
    makeHeader.innerHTML = `
      <div class="make-info">
        <i class="fas ${make.icon || 'fa-car'} make-logo-icon"></i>
        <span>${make.name}</span>
      </div>
      <div style="display:flex; align-items:center; gap: 0.5rem;">
        <span class="make-count">${makePartsCount}</span>
        <i class="fas fa-chevron-down chevron-icon"></i>
      </div>
    `;

    makeHeader.addEventListener('click', (e) => {
      // Toggle dropdown open
      makeLi.classList.toggle('open');
      
      // Filter shop by make
      state.selectedMakeId = make.id;
      state.selectedModelId = null;
      state.selectedYear = null;
      renderShopCatalog();
      renderActiveBreadcrumbs();
    });

    // Models Container
    const modelsUl = document.createElement('ul');
    modelsUl.className = 'models-list';

    makeModels.forEach(model => {
      const modelPartsCount = state.parts.filter(p => p.modelId === model.id).length;
      const modelLi = document.createElement('li');
      modelLi.className = `model-item ${state.selectedModelId === model.id ? 'open' : ''}`;

      const modelHeader = document.createElement('div');
      modelHeader.className = 'model-header';
      modelHeader.innerHTML = `
        <span>${model.name}</span>
        <span style="font-size:0.7rem; opacity:0.6;">(${modelPartsCount})</span>
      `;

      modelHeader.addEventListener('click', (e) => {
        e.stopPropagation();
        modelLi.classList.toggle('open');
        state.selectedMakeId = make.id;
        state.selectedModelId = model.id;
        state.selectedYear = null;
        renderShopCatalog();
        renderActiveBreadcrumbs();
      });

      // Years Chips
      const yearsUl = document.createElement('ul');
      yearsUl.className = 'years-list';

      (model.years || []).sort((a,b)=>a-b).forEach(year => {
        const yearChip = document.createElement('li');
        yearChip.className = `year-chip ${state.selectedYear === year && state.selectedModelId === model.id ? 'active' : ''}`;
        yearChip.textContent = year;
        
        yearChip.addEventListener('click', (e) => {
          e.stopPropagation();
          state.selectedMakeId = make.id;
          state.selectedModelId = model.id;
          state.selectedYear = year;
          renderVehicleSidebar();
          renderShopCatalog();
          renderActiveBreadcrumbs();
        });

        yearsUl.appendChild(yearChip);
      });

      modelLi.appendChild(modelHeader);
      modelLi.appendChild(yearsUl);
      modelsUl.appendChild(modelLi);
    });

    makeLi.appendChild(makeHeader);
    makeLi.appendChild(modelsUl);
    treeContainer.appendChild(makeLi);
  });
}

// Active Breadcrumbs Bar
function renderActiveBreadcrumbs() {
  const container = document.getElementById('active-filters-bar');
  if (!container) return;

  container.innerHTML = '';
  let activePills = [];

  if (state.selectedMakeId) {
    const make = state.makes.find(m => m.id === state.selectedMakeId);
    if (make) activePills.push({ label: `Make: ${make.name}`, type: 'make' });
  }

  if (state.selectedModelId) {
    const model = state.models.find(m => m.id === state.selectedModelId);
    if (model) activePills.push({ label: `Model: ${model.name}`, type: 'model' });
  }

  if (state.selectedYear) {
    activePills.push({ label: `Year: ${state.selectedYear}`, type: 'year' });
  }

  if (state.selectedCategory && state.selectedCategory !== 'all') {
    activePills.push({ label: `Category: ${state.selectedCategory}`, type: 'category' });
  }

  if (state.searchQuery) {
    activePills.push({ label: `Search: "${state.searchQuery}"`, type: 'search' });
  }

  if (activePills.length === 0) {
    container.innerHTML = `<span style="font-size:0.85rem; color: var(--text-dim);">Showing all classic Japanese car parts</span>`;
    return;
  }

  activePills.forEach(pill => {
    const badge = document.createElement('div');
    badge.className = 'filter-badge-pill';
    badge.innerHTML = `
      <span>${pill.label}</span>
      <button><i class="fas fa-times"></i></button>
    `;

    badge.querySelector('button').addEventListener('click', () => {
      if (pill.type === 'make') { state.selectedMakeId = null; state.selectedModelId = null; state.selectedYear = null; }
      if (pill.type === 'model') { state.selectedModelId = null; state.selectedYear = null; }
      if (pill.type === 'year') { state.selectedYear = null; }
      if (pill.type === 'category') { state.selectedCategory = 'all'; }
      if (pill.type === 'search') { state.searchQuery = ''; document.getElementById('search-input').value = ''; }
      renderVehicleSidebar();
      renderShopCatalog();
      renderActiveBreadcrumbs();
    });

    container.appendChild(badge);
  });
}

// Reset All Filters
function resetFilters() {
  state.selectedMakeId = null;
  state.selectedModelId = null;
  state.selectedYear = null;
  state.selectedCategory = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  
  renderVehicleSidebar();
  renderShopCatalog();
  renderActiveBreadcrumbs();
}

// --- SHOP CATALOG RENDERER ---
function renderShopCatalog() {
  const catalogGrid = document.getElementById('parts-catalog-grid');
  if (!catalogGrid) return;

  // Filtering Logic
  let filtered = state.parts.filter(part => {
    if (state.selectedMakeId && part.makeId !== state.selectedMakeId) return false;
    if (state.selectedModelId && part.modelId !== state.selectedModelId) return false;
    
    if (state.selectedYear) {
      if (part.startYear && part.endYear) {
        if (state.selectedYear < part.startYear || state.selectedYear > part.endYear) return false;
      } else if (part.startYear && state.selectedYear !== part.startYear) {
        return false;
      }
    }

    if (state.selectedCategory !== 'all' && part.category.toLowerCase() !== state.selectedCategory.toLowerCase()) {
      return false;
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchName = part.name.toLowerCase().includes(q);
      const matchOem = part.oemNumber.toLowerCase().includes(q);
      const matchDesc = part.description.toLowerCase().includes(q);
      if (!matchName && !matchOem && !matchDesc) return false;
    }

    return true;
  });

  // Sorting
  if (state.sortBy === 'price-low') {
    filtered.sort((a,b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a,b) => b.price - a.price);
  } else if (state.sortBy === 'name') {
    filtered.sort((a,b) => a.name.localeCompare(b.name));
  }

  // Update Part Count Badge
  const countBadge = document.getElementById('catalog-count-badge');
  if (countBadge) countBadge.textContent = `${filtered.length} Parts Available`;

  catalogGrid.innerHTML = '';

  if (filtered.length === 0) {
    catalogGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search-minus"></i>
        <h3>No Parts Found Matching Your Vehicle Filter</h3>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Try resetting your filters or request a rare custom part from our Tokyo sourcing hub.</p>
        <button class="btn-primary" style="margin-top: 1.2rem;" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  filtered.forEach(part => {
    const make = state.makes.find(m => m.id === part.makeId);
    const model = state.models.find(m => m.id === part.modelId);
    const mainImg = (part.images && part.images.length > 0) ? part.images[0] : 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80';

    const card = document.createElement('div');
    card.className = 'part-card';
    card.innerHTML = `
      <div class="part-image-wrap">
        <img src="${mainImg}" alt="${part.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'">
        <span class="part-condition-badge ${part.condition.toLowerCase().includes('nos') ? 'nos' : ''}">${part.condition || 'OEM Genuine'}</span>
        <span class="part-stock-badge">${part.stock > 0 ? `${part.stock} in stock` : 'Out of Stock'}</span>
      </div>
      <div class="part-card-body">
        <div class="part-oem-code">OEM: ${part.oemNumber || 'JPN-CLASSIC'}</div>
        <h3 class="part-title">${part.name}</h3>
        <div class="part-compatibility-tag">
          <i class="fas fa-check-circle"></i>
          <span>Fits: ${make ? make.name : ''} ${model ? model.name : ''} (${part.startYear || ''}-${part.endYear || ''})</span>
        </div>
        <div class="part-card-footer">
          <div class="part-price">$${Number(part.price).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
          <div class="part-card-btns">
            <button class="btn-icon" title="Quick View" onclick="openProductModal('${part.id}')">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon btn-add-cart" onclick="addToCart('${part.id}')">
              <i class="fas fa-shopping-cart"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;

    catalogGrid.appendChild(card);
  });
}

// --- PRODUCT DETAIL MODAL ---
function openProductModal(partId) {
  const part = state.parts.find(p => p.id === partId);
  if (!part) return;

  state.activeModalPartId = partId;
  const modal = document.getElementById('product-modal');
  const make = state.makes.find(m => m.id === part.makeId);
  const model = state.models.find(m => m.id === part.modelId);
  const images = (part.images && part.images.length > 0) ? part.images : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'];

  const modalBody = document.getElementById('modal-body-content');
  modalBody.innerHTML = `
    <div class="product-modal-grid">
      <div class="product-gallery">
        <img id="modal-main-img" class="main-gallery-img" src="${images[0]}" alt="${part.name}">
        <div class="gallery-thumbs">
          ${images.map((img, idx) => `
            <img class="gallery-thumb ${idx === 0 ? 'active' : ''}" src="${img}" onclick="switchGalleryImg('${img}', this)" alt="thumb">
          `).join('')}
        </div>
      </div>

      <div class="product-info-col">
        <div style="color: var(--accent-gold); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">
          ${part.category} &bull; ${part.condition}
        </div>
        <h2>${part.name}</h2>
        <div style="font-family: var(--font-mono); color: var(--text-dim); margin-bottom: 1rem;">OEM Part #: ${part.oemNumber}</div>
        
        <div style="font-size: 1.8rem; font-weight: 900; color: #fff; margin-bottom: 1rem;">
          $${Number(part.price).toLocaleString(undefined, {minimumFractionDigits: 2})}
        </div>

        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
          ${part.description}
        </p>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
          <div style="font-weight: 700; color: var(--accent-red); margin-bottom: 0.5rem; display:flex; align-items:center; gap: 0.5rem;">
            <i class="fas fa-shield-alt"></i> Musa Fitment & Authenticity Guarantee
          </div>
          <table class="specs-table">
            <tr><td>Vehicle Make:</td><td>${make ? make.name : 'Japanese Classic'}</td></tr>
            <tr><td>Compatible Model:</td><td>${model ? model.name : 'All Models'}</td></tr>
            <tr><td>Year Range:</td><td>${part.startYear} &ndash; ${part.endYear || '1999'}</td></tr>
            <tr><td>Availability:</td><td>${part.stock > 0 ? `<span style="color:#10b981;">In Stock (${part.stock} units)</span>` : '<span style="color:#ef4444;">Backorder</span>'}</td></tr>
          </table>
        </div>

        <div style="display: flex; gap: 1rem;">
          <button class="btn-primary" style="flex-grow: 1;" onclick="addToCart('${part.id}'); closeModal();">
            <i class="fas fa-cart-plus"></i> Add To Shopping Cart
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function switchGalleryImg(src, thumbEl) {
  document.getElementById('modal-main-img').src = src;
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

function closeModal() {
  document.getElementById('product-modal').classList.remove('open');
}

// --- CART & PAYPAL INTEGRATION ---
function addToCart(partId) {
  const part = state.parts.find(p => p.id === partId);
  if (!part) return;

  const existing = state.cart.find(item => item.partId === partId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ partId, qty: 1 });
  }

  saveState();
  updateCartUI();
  toggleCartDrawer(true);
}

function removeFromCart(partId) {
  state.cart = state.cart.filter(item => item.partId !== partId);
  saveState();
  updateCartUI();
}

function updateCartQty(partId, delta) {
  const item = state.cart.find(i => i.partId === partId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(partId);
    } else {
      saveState();
      updateCartUI();
    }
  }
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge-count');
  const cartContainer = document.getElementById('cart-items-container');
  const totalEl = document.getElementById('cart-total-amount');

  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) cartBadge.textContent = totalQty;

  if (!cartContainer) return;

  cartContainer.innerHTML = '';
  let grandTotal = 0;

  if (state.cart.length === 0) {
    cartContainer.innerHTML = `
      <div style="text-align:center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fas fa-shopping-basket" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-dim);"></i>
        <p>Your shopping cart is currently empty.</p>
      </div>
    `;
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  state.cart.forEach(item => {
    const part = state.parts.find(p => p.id === item.partId);
    if (!part) return;

    const subtotal = part.price * item.qty;
    grandTotal += subtotal;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${(part.images && part.images[0]) || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'}" alt="${part.name}">
      <div class="cart-item-info">
        <div style="font-weight: 700; font-size: 0.9rem; line-height: 1.2;">${part.name}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">OEM: ${part.oemNumber}</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 0.5rem;">
          <div style="font-family: var(--font-mono); font-weight:700; color: var(--accent-gold);">$${Number(part.price).toFixed(2)}</div>
          <div style="display:flex; align-items:center; gap: 0.4rem; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">
            <button onclick="updateCartQty('${part.id}', -1)">-</button>
            <span style="font-size:0.85rem; font-family: var(--font-mono); font-weight:bold;">${item.qty}</span>
            <button onclick="updateCartQty('${part.id}', 1)">+</button>
          </div>
        </div>
      </div>
      <button style="color: var(--text-dim); height: fit-content;" onclick="removeFromCart('${part.id}')">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;

    cartContainer.appendChild(itemEl);
  });

  if (totalEl) totalEl.textContent = `$${grandTotal.toFixed(2)}`;
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.toggle('open', open);
  }
}

// PayPal Simulated Checkout Modal
function initiatePayPalCheckout() {
  if (state.cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const grandTotal = state.cart.reduce((sum, item) => {
    const part = state.parts.find(p => p.id === item.partId);
    return sum + (part ? part.price * item.qty : 0);
  }, 0);

  const paypalModal = document.getElementById('paypal-modal');
  const paypalContainer = document.getElementById('paypal-checkout-container');

  paypalContainer.innerHTML = `
    <div style="text-align:center; padding: 1rem 0;">
      <div style="font-size: 2.2rem; font-weight: 900; color: #003087; margin-bottom: 0.2rem; font-family: sans-serif;">
        <i>Pay<span style="color:#0079c1;">Pal</span></i>
      </div>
      <div style="color: var(--text-muted); font-size: 0.9rem;">Musa Retro Parts Secure Sandbox Payment</div>
      
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 1.2rem; border-radius: var(--radius-md); margin: 1.5rem 0; text-align: left;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem;">
          <span>Order Total (${state.cart.length} items):</span>
          <strong style="color: var(--accent-gold);">$${grandTotal.toFixed(2)} USD</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
          <span>Worldwide Express Courier:</span>
          <strong style="color:#10b981;">FREE (Promotional)</strong>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-dim); border-top: 1px solid var(--border-subtle); padding-top: 0.5rem; margin-top: 0.5rem;">
          Merchant: 武佐 MUSA RETRO PARTS TOKYO HUB
        </div>
      </div>

      <form id="paypal-sim-form" onsubmit="processPayPalSuccess(event)">
        <div class="form-group" style="margin-bottom: 1rem; text-align: left;">
          <label>PayPal Buyer Email (Sandbox):</label>
          <input type="email" class="form-control" value="collector@jdmclassic.com" required>
        </div>
        <div class="form-group" style="margin-bottom: 1.5rem; text-align: left;">
          <label>Shipping Address:</label>
          <input type="text" class="form-control" value="100 JDM Way, Suite 400, Los Angeles, CA 90210" required>
        </div>
        <button type="submit" class="btn-paypal" style="font-size: 1.05rem;">
          <i class="fab fa-paypal"></i> Complete Payment ($${grandTotal.toFixed(2)})
        </button>
      </form>
    </div>
  `;

  paypalModal.classList.add('open');
}

function processPayPalSuccess(e) {
  e.preventDefault();
  const paypalContainer = document.getElementById('paypal-checkout-container');
  const orderId = 'MUSA-PAYPAL-' + Math.floor(100000 + Math.random() * 900000);

  paypalContainer.innerHTML = `
    <div style="text-align:center; padding: 2rem 1rem;">
      <div style="width: 70px; height: 70px; background: rgba(16, 185, 129, 0.2); border: 2px solid #10b981; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 1.5rem auto;">
        <i class="fas fa-check"></i>
      </div>
      <h2 style="font-size: 1.6rem; color: #fff; margin-bottom: 0.5rem;">PayPal Payment Confirmed!</h2>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
        Thank you for trusting 武佐 (Musa Retro Parts). Your vintage parts order has been processed successfully.
      </p>

      <div style="background: rgba(255,255,255,0.04); border: 1px dashed var(--accent-gold); padding: 1rem; border-radius: var(--radius-md); text-align: left; font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 1.5rem;">
        <div><strong>Transaction ID:</strong> ${orderId}</div>
        <div><strong>Payment Provider:</strong> PayPal Smart Checkout</div>
        <div><strong>Status:</strong> CLEARED & DISPATCHED TO WAREHOUSE</div>
      </div>

      <button class="btn-primary" onclick="closePayPalModal(); state.cart = []; saveState(); updateCartUI(); toggleCartDrawer(false);">
        Close & Continue Browsing
      </button>
    </div>
  `;
}

function closePayPalModal() {
  document.getElementById('paypal-modal').classList.remove('open');
}

// --- ADMIN MANAGEMENT PORTAL ---
function renderAdminView() {
  const statsContainer = document.getElementById('admin-stats-grid');
  if (statsContainer) {
    const totalMakes = state.makes.length;
    const totalModels = state.models.length;
    const totalParts = state.parts.length;
    const totalValue = state.parts.reduce((sum, p) => sum + (p.price * p.stock), 0);

    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-icon"><i class="fas fa-car"></i></div>
        <div>
          <div class="stat-number">${totalMakes}</div>
          <div style="font-size:0.8rem; color: var(--text-muted);">Car Makes</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="color: var(--accent-gold); background: rgba(212, 175, 55, 0.15);"><i class="fas fa-sitemap"></i></div>
        <div>
          <div class="stat-number">${totalModels}</div>
          <div style="font-size:0.8rem; color: var(--text-muted);">Car Models</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="color: var(--accent-cyan); background: rgba(0, 242, 254, 0.15);"><i class="fas fa-boxes"></i></div>
        <div>
          <div class="stat-number">${totalParts}</div>
          <div style="font-size:0.8rem; color: var(--text-muted);">Parts Inventory</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="color: #10b981; background: rgba(16, 185, 129, 0.15);"><i class="fas fa-dollar-sign"></i></div>
        <div>
          <div class="stat-number">$${totalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          <div style="font-size:0.8rem; color: var(--text-muted);">Stock Value</div>
        </div>
      </div>
    `;
  }

  renderAdminTabContent();
}

function setAdminTab(tabName) {
  state.adminTab = tabName;
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  renderAdminTabContent();
}

function renderAdminTabContent() {
  const container = document.getElementById('admin-tab-content');
  if (!container) return;

  if (state.adminTab === 'makes') {
    container.innerHTML = `
      <div class="admin-panel-card">
        <h3 style="margin-bottom: 1rem; color: #fff;"><i class="fas fa-plus-circle" style="color: var(--accent-red);"></i> Add New Japanese Car Make</h3>
        <form id="form-add-make" onsubmit="handleAddMake(event)">
          <div class="form-grid">
            <div class="form-group">
              <label>Make Unique ID (e.g., subaru):</label>
              <input type="text" id="make-id-input" class="form-control" placeholder="e.g. subaru" required>
            </div>
            <div class="form-group">
              <label>Make Display Name (e.g., Subaru):</label>
              <input type="text" id="make-name-input" class="form-control" placeholder="e.g. Subaru" required>
            </div>
          </div>
          <button type="submit" class="btn-primary" style="margin-top: 1rem;">
            <i class="fas fa-save"></i> Save Car Make
          </button>
        </form>
      </div>

      <div class="admin-panel-card">
        <h3 style="margin-bottom: 1rem; color: #fff;">Existing Car Makes</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Make Name</th>
                <th>Associated Models</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.makes.map(m => `
                <tr>
                  <td style="font-family: var(--font-mono);">${m.id}</td>
                  <td><strong>${m.name}</strong></td>
                  <td>${state.models.filter(mod => mod.makeId === m.id).length} Models</td>
                  <td>
                    <button style="color: var(--accent-red);" onclick="deleteMake('${m.id}')"><i class="fas fa-trash"></i> Delete</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (state.adminTab === 'models') {
    container.innerHTML = `
      <div class="admin-panel-card">
        <h3 style="margin-bottom: 1rem; color: #fff;"><i class="fas fa-plus-circle" style="color: var(--accent-gold);"></i> Add New Car Model & Production Years</h3>
        <form id="form-add-model" onsubmit="handleAddModel(event)">
          <div class="form-grid">
            <div class="form-group">
              <label>Select Parent Make:</label>
              <select id="model-parent-make" class="form-control" required>
                ${state.makes.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Model ID (e.g. wrx_gc8):</label>
              <input type="text" id="model-id-input" class="form-control" placeholder="e.g. wrx_gc8" required>
            </div>
            <div class="form-group">
              <label>Model Name (e.g., Impreza WRX STI (GC8)):</label>
              <input type="text" id="model-name-input" class="form-control" placeholder="e.g. Impreza WRX STI (GC8)" required>
            </div>
            <div class="form-group">
              <label>Production Years (comma separated, e.g.: 1992,1993,1994,1995,1996,1997,1998,1999):</label>
              <input type="text" id="model-years-input" class="form-control" placeholder="1992,1993,1994,1995,1996,1997,1998,1999" required>
            </div>
          </div>
          <button type="submit" class="btn-primary" style="margin-top: 1rem;">
            <i class="fas fa-save"></i> Save Car Model
          </button>
        </form>
      </div>

      <div class="admin-panel-card">
        <h3 style="margin-bottom: 1rem; color: #fff;">Existing Car Models</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Make</th>
                <th>Model Name</th>
                <th>Production Years</th>
                <th>Parts Linked</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.models.map(mod => {
                const make = state.makes.find(m => m.id === mod.makeId);
                const partsCount = state.parts.filter(p => p.modelId === mod.id).length;
                return `
                  <tr>
                    <td>${make ? make.name : mod.makeId}</td>
                    <td><strong>${mod.name}</strong></td>
                    <td style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">${(mod.years || []).join(', ')}</td>
                    <td>${partsCount} Parts</td>
                    <td>
                      <button style="color: var(--accent-red);" onclick="deleteModel('${mod.id}')"><i class="fas fa-trash"></i> Delete</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (state.adminTab === 'parts') {
    container.innerHTML = `
      <div class="admin-panel-card">
        <h3 style="margin-bottom: 1rem; color: #fff;"><i class="fas fa-box-open" style="color: var(--accent-red);"></i> Create & Attach New Car Part</h3>
        <form id="form-add-part" onsubmit="handleAddPart(event)">
          <div class="form-grid">
            <div class="form-group">
              <label>Part Title:</label>
              <input type="text" id="part-name-input" class="form-control" placeholder="e.g. Nissan Fairlady 240Z Front Bumper Chrome" required>
            </div>
            <div class="form-group">
              <label>OEM Part Number:</label>
              <input type="text" id="part-oem-input" class="form-control" placeholder="e.g. 62601-E4100" required>
            </div>
            <div class="form-group">
              <label>Car Make:</label>
              <select id="part-make-select" class="form-control" onchange="updateModelSelectInAdmin()" required>
                ${state.makes.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Car Model:</label>
              <select id="part-model-select" class="form-control" required>
                <!-- Populated dynamically -->
              </select>
            </div>
            <div class="form-group">
              <label>Start Year:</label>
              <input type="number" id="part-startyear-input" class="form-control" value="1970" min="1950" max="1999" required>
            </div>
            <div class="form-group">
              <label>End Year:</label>
              <input type="number" id="part-endyear-input" class="form-control" value="1978" min="1950" max="1999" required>
            </div>
            <div class="form-group">
              <label>Category:</label>
              <select id="part-category-select" class="form-control">
                <option value="Engine">Engine & Drivetrain</option>
                <option value="Interior">Interior & Gauges</option>
                <option value="Exterior">Exterior & Body Work</option>
                <option value="Suspension">Suspension & Brakes</option>
                <option value="Electrical">Electrical & Ignition</option>
              </select>
            </div>
            <div class="form-group">
              <label>Condition Tag:</label>
              <select id="part-condition-select" class="form-control">
                <option value="OEM Restored">OEM Restored</option>
                <option value="Rare NOS">Rare NOS (New Old Stock)</option>
                <option value="OEM Original">OEM Original Used</option>
                <option value="JDM Performance">JDM Performance</option>
              </select>
            </div>
            <div class="form-group">
              <label>Price ($ USD):</label>
              <input type="number" step="0.01" id="part-price-input" class="form-control" placeholder="499.00" required>
            </div>
            <div class="form-group">
              <label>Stock Count:</label>
              <input type="number" id="part-stock-input" class="form-control" value="1" min="1" required>
            </div>
            <div class="form-group full-width">
              <label>Image Gallery URLs (Comma separated):</label>
              <input type="text" id="part-images-input" class="form-control" placeholder="https://images.unsplash.com/..., https://..." value="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80">
            </div>
            <div class="form-group full-width">
              <label>Detailed Part Description:</label>
              <textarea id="part-desc-input" class="form-control" rows="3" placeholder="Provide authentic details, fitment specs, and condition notes..." required></textarea>
            </div>
          </div>
          <button type="submit" class="btn-primary" style="margin-top: 1.2rem;">
            <i class="fas fa-plus"></i> Add Part To Inventory
          </button>
        </form>
      </div>

      <div class="admin-panel-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
          <h3 style="color: #fff;">Current Parts Catalog Inventory</h3>
          <button class="reset-filter-btn" onclick="resetToDefaultData()">Factory Reset All Data</button>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Title & OEM</th>
                <th>Make / Model / Years</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.parts.map(p => {
                const make = state.makes.find(m => m.id === p.makeId);
                const model = state.models.find(m => m.id === p.modelId);
                return `
                  <tr>
                    <td>
                      <strong>${p.name}</strong>
                      <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim);">OEM: ${p.oemNumber}</div>
                    </td>
                    <td>${make ? make.name : p.makeId} &bull; ${model ? model.name : p.modelId} (${p.startYear}-${p.endYear})</td>
                    <td><span class="part-condition-badge">${p.category}</span></td>
                    <td style="font-family:var(--font-mono); font-weight:bold; color:var(--accent-gold);">$${Number(p.price).toFixed(2)}</td>
                    <td>${p.stock}</td>
                    <td>
                      <button style="color: var(--accent-red);" onclick="deletePart('${p.id}')"><i class="fas fa-trash"></i> Delete</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    updateModelSelectInAdmin();
  }
}

function updateModelSelectInAdmin() {
  const makeSelect = document.getElementById('part-make-select');
  const modelSelect = document.getElementById('part-model-select');
  if (!makeSelect || !modelSelect) return;

  const selectedMake = makeSelect.value;
  const filteredModels = state.models.filter(m => m.makeId === selectedMake);
  modelSelect.innerHTML = filteredModels.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
}

// Admin Form Handlers
function handleAddMake(e) {
  e.preventDefault();
  const id = document.getElementById('make-id-input').value.trim().toLowerCase().replace(/\s+/g, '_');
  const name = document.getElementById('make-name-input').value.trim();

  if (state.makes.some(m => m.id === id)) {
    alert('A make with this ID already exists!');
    return;
  }

  state.makes.push({ id, name, icon: 'fa-car' });
  saveState();
  renderVehicleSidebar();
  renderAdminView();
}

function handleAddModel(e) {
  e.preventDefault();
  const makeId = document.getElementById('model-parent-make').value;
  const id = document.getElementById('model-id-input').value.trim().toLowerCase().replace(/\s+/g, '_');
  const name = document.getElementById('model-name-input').value.trim();
  const yearsStr = document.getElementById('model-years-input').value.trim();

  const years = yearsStr.split(',').map(y => parseInt(y.trim())).filter(y => !isNaN(y));

  state.models.push({ id, makeId, name, years });
  saveState();
  renderVehicleSidebar();
  renderAdminView();
}

function handleAddPart(e) {
  e.preventDefault();
  const name = document.getElementById('part-name-input').value.trim();
  const oemNumber = document.getElementById('part-oem-input').value.trim();
  const makeId = document.getElementById('part-make-select').value;
  const modelId = document.getElementById('part-model-select').value;
  const startYear = parseInt(document.getElementById('part-startyear-input').value);
  const endYear = parseInt(document.getElementById('part-endyear-input').value);
  const category = document.getElementById('part-category-select').value;
  const condition = document.getElementById('part-condition-select').value;
  const price = parseFloat(document.getElementById('part-price-input').value);
  const stock = parseInt(document.getElementById('part-stock-input').value);
  const imagesStr = document.getElementById('part-images-input').value.trim();
  const description = document.getElementById('part-desc-input').value.trim();

  const images = imagesStr ? imagesStr.split(',').map(s => s.trim()) : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'];

  const newPart = {
    id: 'part_' + Date.now(),
    name,
    oemNumber,
    makeId,
    modelId,
    startYear,
    endYear,
    category,
    condition,
    price,
    stock,
    images,
    description
  };

  state.parts.unshift(newPart);
  saveState();
  renderVehicleSidebar();
  renderAdminView();
  alert('New part successfully attached and published to catalog!');
}

function deleteMake(id) {
  if (confirm('Delete this car make? Linked models and parts will remain in system.')) {
    state.makes = state.makes.filter(m => m.id !== id);
    saveState();
    renderVehicleSidebar();
    renderAdminView();
  }
}

function deleteModel(id) {
  if (confirm('Delete this car model?')) {
    state.models = state.models.filter(m => m.id !== id);
    saveState();
    renderVehicleSidebar();
    renderAdminView();
  }
}

function deletePart(id) {
  if (confirm('Remove this part from inventory catalog?')) {
    state.parts = state.parts.filter(p => p.id !== id);
    saveState();
    renderVehicleSidebar();
    renderShopCatalog();
    renderAdminView();
  }
}

// --- INITIALIZATION ---
function initApp() {
  // Global event listeners
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (state.currentView !== 'shop') navigateTo('shop');
      renderShopCatalog();
      renderActiveBreadcrumbs();
    });
  }

  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderShopCatalog();
    });
  }

  // Initial render
  renderVehicleSidebar();
  renderShopCatalog();
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
