import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClass?: string;
}

export function Section({ children, className = '', id, containerClass = '' }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${containerClass}`}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, className = '' }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={`mb-12 md:mb-16 text-center max-w-3xl mx-auto ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
    </div>
  );
}
