import { render, screen } from '@testing-library/react';

import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders disabled button without leaking loading prop to DOM', () => {
    const { container } = render(<Button loading={false}>Submit</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAttribute('loading');
  });

  it('renders spinner and disables button when loading={true}', () => {
    const { container } = render(<Button loading={true}>Save</Button>);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
    expect(button?.querySelector('.animate-spin')).toBeInTheDocument();
    expect(button).not.toHaveAttribute('loading');
  });
});
