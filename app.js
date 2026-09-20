// Official Firebase Configuration for Karuthal Project
const firebaseConfig = {
    apiKey: "AIzaSyBhxl9LMeylfZSbnQ1iIPVk36uzbgnKu9k",
    authDomain: "karuthal-app.firebaseapp.com",
    projectId: "karuthal-app",
    storageBucket: "karuthal-app.firebasestorage.app",
    messagingSenderId: "197224202940",
    appId: "1:197224202940:web:0cf31d570e39cdd667c6b9",
    measurementId: "G-03D8R37C2G"
};

// Initialize Firebase & Firestore securely
let db = null;
let auth = null;
try {
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore ? firebase.firestore() : null;
        auth = firebase.auth ? firebase.auth() : null;
        console.log("Firebase initialized successfully!");
    }
} catch (e) {
    console.log("Firebase initialization warning, running fallback mode:", e);
}

// Unified Packages Configuration (Synced across Home and Customer Hub)
const KARUTHAL_PACKAGES = {
    basic: { id: 'PKG-BASIC', name: 'Essential Support Plan', price: 1499, displayPrice: '₹1,499 / mo', desc: 'Ideal for occasional doctor visits and monthly checkup coordination.' },
    gold: { id: 'PKG-GOLD', name: 'Senior Family Complete', price: 3499, displayPrice: '₹3,499 / mo', desc: 'Comprehensive monthly support for regular checkups and emergency coverage.' },
    platinum: { id: 'PKG-PLATINUM', name: 'VIP Total Health Guard', price: 6999, displayPrice: '₹6,999 / mo', desc: 'Unlimited dedicated support, priority transport, and complete family health records.' }
};

const RATES_CONFIG = {
    hatchback_sedan: { minTariff: 300, perKmRate: 15, driverBatta: 250 },
    suv: { minTariff: 750, perKmRate: 18, driverBatta: 400 },
    tempo_traveller: { minTariff: 3000, perKmRate: 25, driverBatta: 600 }
};

function initStorage() {
    if (!localStorage.getItem('karuthal_admin')) {
        localStorage.setItem('karuthal_admin', JSON.stringify({ user: 'admin', pass: 'admin123', name: 'System Administrator' }));
    }
    if (!localStorage.getItem('karuthal_packages')) {
        localStorage.setItem('karuthal_packages', JSON.stringify(Object.values(KARUTHAL_PACKAGES)));
    }
    if (!localStorage.getItem('karuthal_staff')) {
        localStorage.setItem('karuthal_staff', JSON.stringify([
            { id: 'STF-1001', name: 'Anitha Ramesh', phone: '9847012345', role: 'Care Coordinator', pass: 'staff123' },
            { id: 'STF-1002', name: 'Rahul Varma', phone: '9847055443', role: 'Billing Manager', pass: 'staff123' }
        ]));
    }
    if (!localStorage.getItem('karuthal_drivers')) {
        localStorage.setItem('karuthal_drivers', JSON.stringify([
            { id: 'DRV-201', name: 'Ramesh Kumar', phone: '9847112233', vehicle: 'Dzire', pass: 'driver123', location: '10.0159° N, 76.3419° E' }
        ]));
    }
    if (!localStorage.getItem('karuthal_customers')) {
        localStorage.setItem('karuthal_customers', JSON.stringify([
            { id: 'CUST-501', name: 'Jubin D George', phone: '9846001122', pass: 'cust123', parentName: 'K. P. Menon' }
        ]));
    }
    if (!localStorage.getItem('karuthal_clients')) {
        localStorage.setItem('karuthal_clients', JSON.stringify([
            { 
                id: 'CLI-501', name: 'K. P. Menon', age: 76, phone: '9846011223', location: 'Kadavanthra, Kochi', plan: 'Senior Family Complete',
                lastHospitalVisit: '10 Sep 2026 - Amrita Hospital, Cardiology Checkup',
                diagnosis: 'Hypertension & Mild Type-2 Diabetes',
                medicines: ['Amlodipine 5mg (1-0-0)', 'Metformin 500mg (1-0-1)']
            }
        ]));
    }
    if (!localStorage.getItem('karuthal_bookings')) {
        localStorage.setItem('karuthal_bookings', JSON.stringify([]));
    }
}

function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
    const bg = type === 'success' ? 'bg-slate-900 text-white border-l-4 border-emerald-500 shadow-xl' : 'bg-red-600 text-white shadow-xl';
    toast.className = `${bg} px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-300 animate-bounce`;
    toast.innerText = msg;
    
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none';
        document.body.appendChild(container);
    }
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

function openModal(modalId) { document.getElementById(modalId)?.classList.remove('hidden'); }
function closeModal(modalId) { document.getElementById(modalId)?.classList.add('hidden'); }
