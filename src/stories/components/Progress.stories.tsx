import type { Meta, StoryObj } from '@storybook/react';
import Progress from '../../components/Progress';
import { LocationFormFields } from '../../pages/LocationForm';

const meta: Meta = {
  title: "Inputs/Progress",
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    length: 6,
    step: 4,
  }
};

export default meta;
type Story = StoryObj;

export const _Progress: Story = {
  args: {
    isActive: false,
    onNext: (data: LocationFormFields, e: React.BaseSyntheticEvent) => {
      e.preventDefault()
      console.log({ data })
    }
  }
};