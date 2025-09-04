import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('counter increments when button clicked', async () => {
  render(<App />)
  expect(screen.getByText(/Counter: 0/i)).toBeInTheDocument()
  await userEvent.click(screen.getByText(/Increment/i))
  expect(screen.getByText(/Counter: 1/i)).toBeInTheDocument()
})
