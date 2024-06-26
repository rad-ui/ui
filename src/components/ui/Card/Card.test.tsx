import React from 'react'
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card Component', () => {
  // tests

  // test content
  test('renders Card component with content', () => {
    render(<Card data-testid="card">I am Text</Card>)
    expect(screen.getByTestId('card')).toHaveTextContent('I am Text')
  })

  test('renders Card component with className', () => {
    render(
      <Card data-testid="card" className="bg-gray-200">
        I am the Text
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveClass('bg-gray-200')
  })

  // renders with custom style
  test('renders Card component with custom style', () => {
    render(
      <Card data-testid="card" rootStyles={{ color: 'red' }}>
        I am the Content
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveStyle('color: red')
  })

  // renders with custom id
  test('renders Card component with custom id', () => {
    render(
      <Card data-testid="card" id="card-id">
        I am Custom
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveAttribute('id', 'card-id')
  })

  // renders with custom data attribute
  test('renders Card component with custom data attribute', () => {
    render(
      <Card data-testid="card" data-custom="card-data">
        I am the Custom Data
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveAttribute(
      'data-custom',
      'card-data'
    )
  })
})
