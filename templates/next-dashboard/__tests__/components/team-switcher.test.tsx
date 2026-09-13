import { render, screen } from '@testing-library/react';
import { GalleryVerticalEnd } from 'lucide-react';

import { TeamSwitcher } from '@/components/layout/team-switcher';
import { SidebarProvider } from '@/components/ui/sidebar';

describe('TeamSwitcher Component', () => {
  const mockTeams = [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
  ];

  it('renders active team in the sidebar header', () => {
    render(
      <SidebarProvider>
        <TeamSwitcher teams={mockTeams} />
      </SidebarProvider>,
    );

    expect(screen.getByText('Acme Inc')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });
});
