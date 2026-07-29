import type { Preview } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';

import '../app/globals.css';

// Mock messages for Storybook so components that use `useTranslations`
// (e.g. LocaleSwitcher, error pages) render without throwing.
const mockMessages = {
  LocaleSwitcher: {
    label: 'Change language',
    locale: '{locale, select, en {English} ja {日本語} ko {한국어} zh {中文} other {Unknown}}',
    loading: 'Switching language...',
  },
  Common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Try Again',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    close: 'Close',
    refresh: 'Refresh Page',
    reportIssue: 'Report Issue',
    pageNotFound: 'Page not found',
    pageNotFoundDescription: 'The page you are looking for does not exist or has been moved.',
    goHome: 'Go Home',
    errorDescription: 'An unexpected error occurred.',
    criticalError: 'Critical Error',
    criticalErrorDescription: 'A critical error occurred.',
  },
  Errors: {
    sessionExpired: 'Your session has expired.',
    accessDenied: 'You do not have permission to perform this action.',
    notFound: 'The requested resource was not found.',
    rateLimited: 'Too many requests.',
    serverError: 'Something went wrong on our end.',
    serviceUnavailable: 'The service is temporarily unavailable.',
    networkError: 'Unable to reach the server.',
  },
};

const themeValues = {
  light: 'light',
  dark: 'dark',
} as const;

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Preview theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: themeValues.light, title: 'Light' },
          { value: themeValues.dark, title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: themeValues.light,
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === themeValues.dark ? themeValues.dark : themeValues.light;

      return (
        <NextIntlClientProvider locale="en" messages={mockMessages}>
          <div className={theme}>
            <div className="min-h-screen bg-background p-6 text-foreground">
              <Story />
            </div>
          </div>
        </NextIntlClientProvider>
      );
    },
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    docs: {
      toc: true,
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
