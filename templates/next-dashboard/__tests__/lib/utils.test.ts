import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('should merge class names properly', () => {
    expect(cn('bg-primary', 'text-white')).toBe('bg-primary text-white');
  });

  it('should resolve conflicting tailwind classes', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('should omit falsy values', () => {
    expect(cn('flex', false && 'hidden', null, undefined, 'items-center')).toBe('flex items-center');
  });
});
