import React from 'react';

import { Formiz, useForm } from '@formiz/core';
import { Meta, StoryObj } from '@storybook/react';

import { FieldCodeInput } from '.';

const Template = (args: ExplicitAny) => {
  const form = useForm();
  return (
    <Formiz connect={form}>
      <FieldCodeInput {...args} />
    </Formiz>
  );
};

export default {
  title: 'Fields/FieldCodeInput',
  component: Template,
} as Meta<typeof FieldCodeInput>;

export const Default: StoryObj<typeof FieldCodeInput> = {
  args: {
    name: 'default',
    label: 'Default Code Input',
    codeLength: 6,
    required: 'Code is required',
  },
};

export const CustomCodeLength: StoryObj<typeof FieldCodeInput> = {
  args: {
    name: 'customLength',
    label: 'Custom Code Length',
    codeLength: 4,
    validations: [
      {
        handler: (value: string) => value.length === 4,
        message: 'Code must be 4 characters',
      },
    ],
  },
};
