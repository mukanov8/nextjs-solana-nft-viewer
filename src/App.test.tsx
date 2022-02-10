import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the root app component', () => {
  render(<App />)
  const linkElement = screen.getAllByTestId('centralized_swap')
  expect(linkElement).toBeInTheDocument()
})
