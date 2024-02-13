import React from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMinLength } from '@formiz/validations';
import { Meta, StoryObj } from '@storybook/react';

import { FieldInput } from '.';

const Template = (args: ExplicitAny) => {
  const form = useForm();
  return (
    <Formiz connect={form}>
      <FieldInput {...args} />
    </Formiz>
  );
};

export default {
  title: 'Fields/FieldInput',
  component: Template,
  parameters: {
    controls: { expanded: true },
  },
} as Meta<typeof FieldInput>;

export const Default: StoryObj<typeof FieldInput> = {
  args: {
    name: 'default',
    label: 'Default Input',
    componentProps: {
      placeholder: 'Enter text...',
    },
  },
};

export const WithEmailValidation: StoryObj<typeof FieldInput> = {
  args: {
    name: 'email',
    label: 'Email Input',
    required: 'Email is required',
    validations: [
      {
        handler: isEmail(),
        message: 'This is not a valid email',
      },
    ],
    componentProps: {
      placeholder: 'Enter email...',
      keyboardType: 'email-address',
    },
  },
};

export const WithMinLengthValidation: StoryObj<typeof FieldInput> = {
  args: {
    name: 'minLength',
    label: 'Password Input',
    required: 'Password is required',
    validations: [
      {
        handler: isMinLength(6),
        message: 'Password must be at least 6 characters',
      },
    ],
    componentProps: {
      placeholder: 'Enter password...',
      secureTextEntry: true,
    },
  },
};

export const Disabled: StoryObj<typeof FieldInput> = {
  args: {
    name: 'disabled',
    label: 'Disabled Input',
    componentProps: {
      placeholder: 'Disabled',
      editable: false,
    },
  },
};
