import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input component', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('triggers onChange when typing', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Bilal' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});