import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

describe('LoadingSpinner', () => {
  it('renders loading text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText(/Loading/i)).toBeDefined();
  });

  it('renders with default message', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByText(/Loading/i);
    expect(spinner).toBeDefined();
  });
});
