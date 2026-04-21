import React from 'react';

export function Card({ children, className = '', noBg = false }: { children: React.ReactNode; className?: string; noBg?: boolean }) {
  return (
    <div className={`rounded-xl shadow-sm border border-slate-100 overflow-hidden ${noBg ? '' : 'bg-white'} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 bg-slate-50 border-t border-slate-100 ${className}`}>
      {children}
    </div>
  );
}
