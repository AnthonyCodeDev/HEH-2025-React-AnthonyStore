// @vitest-environment jsdom
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import Login from './Login';
import Register from './Register';

expect.extend(matchers);

// Mock de useNavigate
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return Object.assign({}, actual, {
        useNavigate: () => vi.fn(),
        Link: (props: any) => <a {...props} />,
    });
});

// Mock d'axios
vi.mock('axios', () => ({
    default: {
        post: vi.fn(() => Promise.resolve({ data: { user: { profileImage: 'img.jpg' }, tokens: { accessToken: 'a', refreshToken: 'b' } } })),
    },
}));

// Mock de window.alert
const alertMock = vi.fn();
window.alert = alertMock;

describe('Login', () => {
    beforeEach(() => {
        localStorage.clear();
        alertMock.mockClear();
    });

    it('affiche les champs email et mot de passe', () => {
        render(<Login />);
        expect(screen.getByLabelText('Adresse mail', { selector: '#login-email' })).toBeInTheDocument();
        expect(screen.getByLabelText('Mot de passe', { selector: '#login-password' })).toBeInTheDocument();
    });

    it('affiche une erreur si le formulaire est vide', async () => {
        render(<Login />);
        fireEvent.click(screen.getAllByRole('button', { name: /connexion/i })[0]);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalled();
        });

        expect(screen.getByLabelText('Adresse mail', { selector: '#login-email' })).toHaveValue('');
        expect(screen.getByLabelText('Mot de passe', { selector: '#login-password' })).toHaveValue('');
    });

    it('soumet le formulaire avec des valeurs valides', async () => {
        render(<Login />);
        fireEvent.change(screen.getByLabelText('Adresse mail', { selector: '#login-email' }), { target: { value: 'test@mail.com' } });
        fireEvent.change(screen.getByLabelText('Mot de passe', { selector: '#login-password' }), { target: { value: 'azerty' } });
        fireEvent.click(screen.getAllByRole('button', { name: /connexion/i })[0]);

        await waitFor(() => {
            expect(localStorage.getItem('user')).not.toBeNull();
            expect(localStorage.getItem('accessToken')).not.toBeNull();
            expect(alertMock).toHaveBeenCalledWith('Connexion réussie !');
        });
    });
});

describe('Register', () => {
    beforeEach(() => {
        localStorage.clear();
        alertMock.mockClear();
    });

    it('affiche tous les champs du formulaire', () => {
        render(<Register />);
        expect(screen.getByLabelText('Nom', { selector: '#register-nom' })).toBeInTheDocument();
        expect(screen.getByLabelText('Adresse mail', { selector: '#register-email' })).toBeInTheDocument();
        expect(screen.getByLabelText('Mot de passe', { selector: '#register-password' })).toBeInTheDocument();
        expect(screen.getByLabelText('Confirmer le mot de passe', { selector: '#register-confirm-password' })).toBeInTheDocument();
        expect(screen.getByLabelText('Image de profil', { selector: '#register-image' })).toBeInTheDocument();
    });

    it('affiche une erreur si image non sélectionnée', async () => {
        render(<Register />);
        fireEvent.change(screen.getByLabelText('Nom', { selector: '#register-nom' }), { target: { value: 'Jean' } });
        fireEvent.change(screen.getByLabelText('Adresse mail', { selector: '#register-email' }), { target: { value: 'jean@mail.com' } });
        fireEvent.change(screen.getByLabelText('Mot de passe', { selector: '#register-password' }), { target: { value: 'azerty' } });
        fireEvent.change(screen.getByLabelText('Confirmer le mot de passe', { selector: '#register-confirm-password' }), { target: { value: 'azerty' } });
        fireEvent.click(screen.getAllByRole('button', { name: /créer un compte/i })[0]);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Veuillez sélectionner une image de profil.');
        });

        expect(localStorage.getItem('user')).toBeNull();
    });

    it('soumet le formulaire si tout est valide', async () => {
        render(<Register />);
        fireEvent.change(screen.getByLabelText('Nom', { selector: '#register-nom' }), { target: { value: 'Jean' } });
        fireEvent.change(screen.getByLabelText('Adresse mail', { selector: '#register-email' }), { target: { value: 'jean@mail.com' } });
        fireEvent.change(screen.getByLabelText('Mot de passe', { selector: '#register-password' }), { target: { value: 'azerty' } });
        fireEvent.change(screen.getByLabelText('Confirmer le mot de passe', { selector: '#register-confirm-password' }), { target: { value: 'azerty' } });

        const file = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });
        const input = screen.getByLabelText('Image de profil', { selector: '#register-image' });
        fireEvent.change(input, { target: { files: [file] } });

        fireEvent.click(screen.getAllByRole('button', { name: /créer un compte/i })[0]);

        await waitFor(() => {
            expect(localStorage.getItem('user')).not.toBeNull();
            expect(localStorage.getItem('accessToken')).not.toBeNull();
            expect(alertMock).toHaveBeenCalledWith('Compte créé ! Vérifiez votre email.');
        });
    });
}); 