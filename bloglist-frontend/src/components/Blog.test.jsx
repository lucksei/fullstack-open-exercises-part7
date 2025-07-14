import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Blog from './Blog';
import store from '../utils/storeConfig';

describe('<Blog /> inside container', () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Testman',
      likes: 0,
      url: 'http://localhost:1234/',
      user: 'asdf',
    };
    container = render(
      <Provider store={store}>
        <Blog blog={blog} />
      </Provider>,
    ).container;
  });

  test('<Blog /> renders its title and author without showing the url by default', () => {
    const blogElement = container.querySelector('.blog');
    expect(blogElement).toHaveTextContent(
      'Component testing is done with react-testing-library Testman',
    );

    const urlElement = blogElement.querySelector('.url');
    expect(urlElement).not.toBeVisible();

    const likesElement = blogElement.querySelector('.likes');
    expect(likesElement).not.toBeVisible();
  });

  test('<Blog /> shows the url and number of likes when the button controlling the shown details has been clicked', async () => {
    const blogElement = container.querySelector('.blog');

    // Click the button
    const toggleShowButton = blogElement.querySelector('.btn-toggle-show');
    const user = userEvent.setup();
    await user.click(toggleShowButton);

    // Elements are now visible
    const likesElement = blogElement.querySelector('.likes');
    expect(likesElement).toBeVisible();

    const urlElement = blogElement.querySelector('.url');
    expect(urlElement).toBeVisible();
  });
});

describe('<Blog /> with mock handler stubs', () => {
  let container;
  // NOTE: This test broke because im not passign the functions as props anymore with redux
  // const mockHandlerEdit = vi.fn();
  // const mockHandlerDelete = vi.fn();
  const dispatch = vi.fn();
  const spy = vi.spyOn(store, 'dispatch');

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Testman',
      likes: 0,
      url: 'http://localhost:1234/',
      user: 'asdf',
    };
    container = render(
      <Provider store={store}>
        <Blog blog={blog} />
      </Provider>,
    ).container;
  });

  test('<Blog /> the like button can be clicked twice', async () => {
    const blogElement = container.querySelector('.blog');
    const user = userEvent.setup();

    const likeButton = blogElement.querySelector('.btn-like');
    console.log(likeButton);

    await user.click(likeButton);
    await user.click(likeButton);

    spy.mock.calls.forEach(([action]) => {
      dispatch(action);
    });

    dispatch.mock.calls.forEach(([action]) => {
      console.log(action);
    });

    // expect(dispatch).toHaveBeenCalledTimes(2);

    const dispatchCalls = expect(spy.mock.calls).toHaveLength(2);
  });
});
