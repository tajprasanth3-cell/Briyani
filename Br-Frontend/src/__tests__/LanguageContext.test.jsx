import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext.jsx';

function TestComponent() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="home-text">{t('home')}</span>
      <button onClick={() => setLanguage('hi')}>Switch</button>
    </div>
  );
}

describe('LanguageContext', () => {
  it('provides default English language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('home-text').textContent).toBe('Home');
  });

  it('translates to Hindi', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    screen.getByText('Switch').click();
    expect(screen.getByTestId('lang').textContent).toBe('hi');
    expect(screen.getByTestId('home-text').textContent).toBe('घर');
  });
});
