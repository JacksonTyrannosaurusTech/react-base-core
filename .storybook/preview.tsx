import React from "react";
import '../src/index.css';
import type { Preview } from "@storybook/react";
import { PrimeReactProvider } from 'primereact/api';

const preview: Preview = {
  decorators: [(Story) => (
    <PrimeReactProvider value={{ unstyled: true }}>
      <Story />
    </PrimeReactProvider>
  )],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
