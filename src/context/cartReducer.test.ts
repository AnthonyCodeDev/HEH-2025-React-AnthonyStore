import { describe, it, expect } from 'vitest';
import { cartReducer } from './CartContext';
import { Product } from '../types';

describe('cartReducer', () => {
    const produit: Product = {
        _id: '42',
        name: 'Produit Démo',
        category: 'demo',
        description: 'Produit de test',
        price: 50,
        mainImage: 'demo.jpg',
    };

    it('état initial', () => {
        const etatInitial = { items: [], totalAmount: 0 };
        // @ts-expect-error action inconnue
        const resultat = cartReducer(etatInitial, { type: 'INCONNUE' });
        expect(resultat).toEqual(etatInitial);
    });

    it('ajout article', () => {
        const etatInitial = { items: [], totalAmount: 0 };
        const resultat = cartReducer(etatInitial, { type: 'ADD_ITEM', item: produit });
        expect(resultat.items).toHaveLength(1);
        expect(resultat.items[0].quantity).toBe(1);
        expect(resultat.totalAmount).toBe(50);
    });

    it('incrémente quantité', () => {
        const etatInitial = { items: [{ ...produit, quantity: 1 }], totalAmount: 50 };
        const resultat = cartReducer(etatInitial, { type: 'ADD_ITEM', item: produit });
        expect(resultat.items[0].quantity).toBe(2);
        expect(resultat.totalAmount).toBe(100);
    });

    it('décrémente quantité', () => {
        const etatInitial = { items: [{ ...produit, quantity: 3 }], totalAmount: 150 };
        const resultat = cartReducer(etatInitial, { type: 'UPDATE_QUANTITY', id: '42', delta: -1 });
        expect(resultat.items[0].quantity).toBe(2);
        expect(resultat.totalAmount).toBe(100);
    });

    it('retire si quantité zéro', () => {
        const etatInitial = { items: [{ ...produit, quantity: 1 }], totalAmount: 50 };
        const resultat = cartReducer(etatInitial, { type: 'UPDATE_QUANTITY', id: '42', delta: -1 });
        expect(resultat.items).toHaveLength(0);
        expect(resultat.totalAmount).toBe(0);
    });

    it('remplace panier', () => {
        const etatInitial = { items: [{ ...produit, quantity: 2 }], totalAmount: 100 };
        const nouvelEtat = { items: [], totalAmount: 0 };
        const resultat = cartReducer(etatInitial, { type: 'SET_CART', payload: nouvelEtat });
        expect(resultat).toEqual(nouvelEtat);
    });

    it('supprime article', () => {
        const etatInitial = { items: [{ ...produit, quantity: 2 }], totalAmount: 100 };
        const resultat = cartReducer(etatInitial, { type: 'REMOVE_ITEM', id: '42' });
        expect(resultat.items).toHaveLength(0);
        expect(resultat.totalAmount).toBe(0);
    });
}); 