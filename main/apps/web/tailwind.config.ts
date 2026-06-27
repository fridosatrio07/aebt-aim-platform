import type { Config } from 'tailwindcss';

const token = (name: string) => `var(--${name})`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: token('background'),
        foreground: token('foreground'),
        'surface-1': token('surface-1'),
        'surface-2': token('surface-2'),
        'surface-3': token('surface-3'),
        'border-subtle': token('border-subtle'),
        'border-strong': token('border-strong'),
        'text-muted': token('text-muted'),
        'text-disabled': token('text-disabled'),
        'brand-navy': token('brand-navy'),
        'brand-blue': token('brand-blue'),
        'intelligence-cyan': token('intelligence-cyan'),
        'integrity-teal': token('integrity-teal'),
        'status-success': token('status-success'),
        'status-warning': token('status-warning'),
        'status-danger': token('status-danger'),
        'status-draft': token('status-draft'),
        'status-pending-review': token('status-pending-review'),
        'status-approved': token('status-approved'),
        'risk-low': token('risk-low'),
        'risk-medium': token('risk-medium'),
        'risk-high': token('risk-high'),
        'risk-critical': token('risk-critical'),
        'due-normal': token('due-normal'),
        'due-soon': token('due-soon'),
        'due-overdue': token('due-overdue'),
        'evidence-ready': token('evidence-ready'),
        'evidence-missing': token('evidence-missing'),
        'export-ready': token('export-ready'),
        'export-warning': token('export-warning'),
        aim: {
          ink: token('foreground'),
          field: token('surface-2'),
          line: token('border-subtle'),
          action: token('integrity-teal'),
          alert: token('status-warning')
        }
      }
    }
  },
  plugins: []
};

export default config;
