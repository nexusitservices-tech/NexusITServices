import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface NexusFormGroupProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const NexusFormGroup: React.FC<NexusFormGroupProps> = ({
  label,
  hint,
  error,
  required,
  children,
  className = '',
  dark = false
}) => {
  return (
    <div className={`space-y-1.5 text-left ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className={`text-xs font-semibold tracking-wide ${dark ? 'text-slate-200' : 'text-[#07142F]'}`}>
            {label}
            {required && <span className="text-[#1677FF] ml-1">*</span>}
          </label>
          {hint && !error && (
            <span className={`text-[11px] ${dark ? 'text-slate-400' : 'text-[#66748B]'}`}>
              {hint}
            </span>
          )}
        </div>
      )}

      {children}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export interface NexusInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  dark?: boolean;
}

export const NexusInput = forwardRef<HTMLInputElement, NexusInputProps>(
  ({ error, leftIcon, rightIcon, dark = false, className = '', disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-[#66748B] pointer-events-none shrink-0">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          disabled={disabled}
          className={`w-full text-sm rounded-md transition-colors duration-200 ${
            leftIcon ? 'pl-9' : 'pl-3.5'
          } ${rightIcon ? 'pr-9' : 'pr-3.5'} py-2.5 ${
            dark
              ? 'bg-[#0B2144] border-white/15 text-white placeholder-slate-400 focus:border-[#39B9FF] focus:ring-1 focus:ring-[#39B9FF]'
              : 'bg-white border-[#DCE6F0] text-[#07142F] placeholder-[#66748B]/70 focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF]'
          } border outline-none disabled:bg-slate-100 disabled:cursor-not-allowed ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 text-[#66748B] pointer-events-none shrink-0">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
NexusInput.displayName = 'NexusInput';

export interface NexusTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  dark?: boolean;
}

export const NexusTextarea = forwardRef<HTMLTextAreaElement, NexusTextareaProps>(
  ({ error, dark = false, className = '', disabled, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={`w-full text-sm rounded-md transition-colors duration-200 px-3.5 py-2.5 ${
          dark
            ? 'bg-[#0B2144] border-white/15 text-white placeholder-slate-400 focus:border-[#39B9FF] focus:ring-1 focus:ring-[#39B9FF]'
            : 'bg-white border-[#DCE6F0] text-[#07142F] placeholder-[#66748B]/70 focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF]'
        } border outline-none disabled:bg-slate-100 disabled:cursor-not-allowed resize-y ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
    );
  }
);
NexusTextarea.displayName = 'NexusTextarea';

export interface NexusSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options: { value: string; label: string }[];
  dark?: boolean;
}

export const NexusSelect = forwardRef<HTMLSelectElement, NexusSelectProps>(
  ({ error, options, dark = false, className = '', disabled, ...props }, ref) => {
    return (
      <select
        ref={ref}
        disabled={disabled}
        className={`w-full text-sm rounded-md transition-colors duration-200 px-3.5 py-2.5 bg-white border border-[#DCE6F0] text-[#07142F] outline-none cursor-pointer focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] disabled:bg-slate-100 disabled:cursor-not-allowed ${
          dark
            ? 'bg-[#0B2144] border-white/15 text-white focus:border-[#39B9FF] focus:ring-[#39B9FF]'
            : ''
        } ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className={dark ? 'bg-[#07142F] text-white' : 'text-[#07142F]'}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);
NexusSelect.displayName = 'NexusSelect';
