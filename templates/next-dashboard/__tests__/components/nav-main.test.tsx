import { fireEvent, render, screen } from '@testing-library/react';
import { SquareTerminal } from 'lucide-react';

import { NavMain } from '@/components/layout/nav-main';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { NavItem } from '@/types/dashboard';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

describe('NavMain Component', () => {
  const mockItems: NavItem[] = [
    {
      title: 'Dashboard',
      url: '/',
    },
    {
      title: 'Playground',
      url: '/playground',
      icon: SquareTerminal,
      items: [
        {
          title: 'History',
          url: '/playground/history',
        },
        {
          title: 'Starred',
          url: '/playground/starred',
        },
      ],
    },
  ];

  it('hides submenus by default when not on their route', () => {
    mockUsePathname.mockReturnValue('/');

    render(
      <SidebarProvider>
        <NavMain items={mockItems} />
      </SidebarProvider>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Playground')).toBeInTheDocument();
    // Sub-items should be hidden initially
    expect(screen.queryByText('History')).not.toBeInTheDocument();
    expect(screen.queryByText('Starred')).not.toBeInTheDocument();
  });

  it('expands submenu when user clicks parent menu item', () => {
    mockUsePathname.mockReturnValue('/');

    render(
      <SidebarProvider>
        <NavMain items={mockItems} />
      </SidebarProvider>,
    );

    // Click Playground parent button
    const playgroundBtn = screen.getByRole('button', { name: /playground/i });
    fireEvent.click(playgroundBtn);

    // Sub-items should now be visible
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Starred')).toBeInTheDocument();
  });

  it('automatically opens submenu and highlights active sub-item if current route matches', () => {
    mockUsePathname.mockReturnValue('/playground/history');

    render(
      <SidebarProvider>
        <NavMain items={mockItems} />
      </SidebarProvider>,
    );

    // Submenu is auto-expanded
    const historyLink = screen.getByText('History').closest('a');
    expect(historyLink).toBeInTheDocument();
    expect(historyLink).toHaveAttribute('data-active');
  });
});
