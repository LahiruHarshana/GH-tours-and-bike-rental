import { ReactNode } from 'react';

export type EyebrowProps = {
  children: ReactNode;
  variant?: 'dark' | 'light';
  as?: 'span' | 'p' | 'div';
  className?: string;
};

export function Eyebrow({ children, variant = 'dark', as: Component = 'span', className = '' }: EyebrowProps) {
  const baseClass = 'eyebrow';
  const variantClass = variant === 'light' ? 'eyebrow--light' : '';
  
  return (
    <Component className={`${baseClass} ${variantClass} ${className}`.trim()}>
      <i aria-hidden="true" />
      {children}
    </Component>
  );
}
