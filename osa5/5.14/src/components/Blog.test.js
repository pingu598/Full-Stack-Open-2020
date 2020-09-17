import React from 'react'
import '@testing-library/jest-dom/extend-expect'
//import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "hello",
    url: "google.com",
    user: {
      name: "matti"
    }
    
  }
  
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )
  const li = component.container.querySelector('li')
  
  console.log(prettyDOM(li))

  const button = component.getByText('show')
  fireEvent.click(button)
  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'hello'
  )
  expect(component.container).toHaveTextContent(
    "google.com"
  )
  //expect(component.getByText('google.com').toBeEmptyDOMElement)
    

  
})