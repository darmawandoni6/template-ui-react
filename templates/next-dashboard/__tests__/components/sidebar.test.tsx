import { render, screen } from '@testing-library/react';

import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

describe('Sidebar Component System', () => {
  it('renders sidebar within provider', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div>Header Content</div>
          </SidebarHeader>
          <SidebarContent>
            <div>Main Navigation</div>
          </SidebarContent>
        </Sidebar>
        <SidebarTrigger />
      </SidebarProvider>,
    );

    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Main Navigation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle sidebar/i })).toBeInTheDocument();
  });
});
