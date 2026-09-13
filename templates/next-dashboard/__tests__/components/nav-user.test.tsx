import { render, screen } from '@testing-library/react';

import { NavUser } from '@/components/layout/nav-user';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/use-auth-store';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

describe('NavUser Component', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Doni Darmawan',
        email: 'doni@example.com',
        avatar: 'https://github.com/darmawandoni6.png',
        role: 'admin',
      },
      isAuthenticated: true,
    });
  });

  it('renders user information in the sidebar footer trigger', () => {
    render(
      <SidebarProvider>
        <NavUser />
      </SidebarProvider>,
    );

    expect(screen.getByText('Doni Darmawan')).toBeInTheDocument();
    expect(screen.getByText('doni@example.com')).toBeInTheDocument();
  });
});
