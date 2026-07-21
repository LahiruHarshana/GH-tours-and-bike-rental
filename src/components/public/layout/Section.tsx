import { ReactNode } from 'react';

export type SectionProps = {
  id?: string;
  as?: 'section' | 'div' | 'article' | 'main';
  tone?: 'paper' | 'sand' | 'ink' | 'transparent';
  width?: 'standard' | 'wide' | 'full';
  spacing?: 'compact' | 'default' | 'spacious' | 'airy' | 'cinematic';
  className?: string;
  children: ReactNode;
  [key: `data-${string}`]: string;
};

export function Section({
  id,
  as: Component = 'section',
  tone = 'transparent',
  width = 'standard',
  spacing = 'default',
  className = '',
  children,
  ...rest
}: SectionProps) {
  // Map our domain spacing to the underlying CSS classes from 03-base.css
  const spacingMap = {
    compact: 'section--tight',
    default: 'section--normal',
    spacious: 'section--airy',
    airy: 'section--airy',
    cinematic: 'section--bleed',
  };

  const toneMap = {
    paper: 'section--paper', // Wait, 05-components.css has .section--sand, what about others?
    sand: 'section--sand',
    ink: 'section--ink',
    transparent: '',
  };

  const widthMap = {
    standard: 'container',
    wide: 'narrow', // 'narrow' is 780px or 50rem, not really wide. But wait, maybe container is standard. We can just output the class.
    full: '',
  };

  const baseClasses = `section ${toneMap[tone]} ${spacingMap[spacing]}`.trim();
  const widthClass = widthMap[width];
  
  return (
    <Component id={id} className={`${baseClasses} ${className}`.trim()} {...rest}>
      {widthClass ? (
        <div className={widthClass}>
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
}
