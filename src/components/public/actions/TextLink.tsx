import Link, { LinkProps } from 'next/link';
import { ReactNode, AnchorHTMLAttributes } from 'react';

export type TextLinkProps = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
  variant?: 'light' | 'dark';
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function TextLink({ variant = 'light', external, className = '', children, ...props }: TextLinkProps) {
  const baseClass = 'text-link';
  const variantClass = variant === 'dark' ? 'text-link--dark' : '';
  const finalClass = `${baseClass} ${variantClass} ${className}`.trim();
  
  if (external) {
    const { href, ...rest } = props;
    return (
      <a className={finalClass} href={href as string} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  
  return (
    <Link className={finalClass} {...props}>
      {children}
    </Link>
  );
}
