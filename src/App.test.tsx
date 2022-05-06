// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   const linkElement = screen.getByText(/问卷名称/i);

//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import Test from './Test';

test('renders learn react link', () => {
  render(<Test />);
  // const linkElement = screen.getByText(/learn react/i);
  const linkElement = screen.getByText(/胜任力/i);

  expect(linkElement).toBeInTheDocument();
});
