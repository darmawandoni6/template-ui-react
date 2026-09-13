import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('bg-red-500', 'text-white');
    expect(result).toBe('bg-red-500 text-white');
  });

  it('should resolve tailwind conflict classes by keeping the last one', () => {
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });

  it('should handle conditional falsy values', () => {
    const isHidden = false;
    const isVisible = true;
    const result = cn('base-class', isHidden && 'hidden', isVisible && 'block');
    expect(result).toBe('base-class block');
  });
});
