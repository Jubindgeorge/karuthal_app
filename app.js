// Firebase SDK Modules Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Official Firebase Configuration for Karuthal Project
export const firebaseConfig = {
    apiKey: "AIzaSyBhxl9LMeylfZSbnQ1iIPVk36uzbgnKu9k",
    authDomain: "karuthal-app.firebaseapp.com",
    projectId: "karuthal-app",
    storageBucket: "karuthal-app.firebasestorage.app",
    messagingSenderId: "197224202940",
    appId: "1:197224202940:web:0cf31d570e39cdd667c6b9",
    measurementId: "G-03D8R37C2G"
};

// Initialize Firebase & Firestore securely
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Global UI Helper: Toast Notification System
export function showToast(msg, type = 'success') {
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

export function openModal(modalId) { 
    document.getElementById(modalId)?.classList.remove('hidden'); 
}

export function closeModal(modalId) { 
    document.getElementById(modalId)?.classList.add('hidden'); 
}

console.log("Firebase initialized successfully!");
