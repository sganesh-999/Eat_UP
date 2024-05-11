import { render, screen } from '@testing-library/react'
//import App from './App'
import Contact from '../Contact'
import { describe, expect } from 'vitest'

describe('Contact', () => {
  test('renders the App component', () => {
    render(<Contact />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  });
  it('should render contact component',()=>{
    render(<Contact />);

    const sample = screen.getByPlaceholderText("Email");
    
    expect(sample).toBeTruthy()
  }
)
})
// it or test both are same , describe is set of it/test cases
describe('Name available in contact',()=>{
  it('should render contact component',()=>{
    render(<Contact />);

    const sample = screen.getAllByRole("textbox");
    console.log(sample)
    expect(sample.length).toBe(3)
  }
)
}
)