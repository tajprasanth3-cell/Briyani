import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from '../components/Menu.jsx';

describe('Menu Component', () => {
  const mockAddToCart = vi.fn();
  const mockSearchChange = vi.fn();

  it('renders menu sections', () => {
    render(
      <Menu searchQuery="" onSearchChange={mockSearchChange} onAddToCart={mockAddToCart} cartCount={0} />
    );
    expect(screen.getAllByText(/Biryani/i).length).toBeGreaterThan(0);
  });

  it('displays menu items with prices', () => {
    render(
      <Menu searchQuery="" onSearchChange={mockSearchChange} onAddToCart={mockAddToCart} cartCount={0} />
    );
    expect(screen.getAllByText(/Rs\./i).length).toBeGreaterThan(0);
  });

  it('renders search input', () => {
    render(
      <Menu searchQuery="" onSearchChange={mockSearchChange} onAddToCart={mockAddToCart} cartCount={0} />
    );
    expect(screen.getByPlaceholderText('Search for biryani...')).toBeDefined();
  });

  it('calls onSearchChange when typing', () => {
    render(
      <Menu searchQuery="" onSearchChange={mockSearchChange} onAddToCart={mockAddToCart} cartCount={0} />
    );
    const input = screen.getByPlaceholderText('Search for biryani...');
    fireEvent.change(input, { target: { value: 'chicken' } });
    expect(mockSearchChange).toHaveBeenCalledWith('chicken');
  });

  it('renders Add to Cart buttons', () => {
    render(
      <Menu searchQuery="" onSearchChange={mockSearchChange} onAddToCart={mockAddToCart} cartCount={0} />
    );
    expect(screen.getAllByText('Add to Cart').length).toBeGreaterThan(0);
  });

  it('displays cart summary', () => {
    render(
      <Menu searchQuery="" onSearchChange={mockSearchChange} onAddToCart={mockAddToCart} cartCount={5} />
    );
    expect(screen.getByText(/5 item\(s\) added/)).toBeDefined();
  });
});
