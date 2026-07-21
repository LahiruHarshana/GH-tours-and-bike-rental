import { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'standard' | 'small' | 'wide';
  children: ReactNode;
};

export function Button({ variant = 'primary', size = 'standard', className = '', children, ...props }: ButtonProps) {
  const variantMap = {
    primary: 'button--gold',
    secondary: 'button--dark',
    ghost: 'button--ghost',
  };
  const sizeMap = {
    standard: '',
    small: 'button--small',
    wide: 'button--wide',
  };
  
  return (
    <button 
      className={`button ${variantMap[variant]} ${sizeMap[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
