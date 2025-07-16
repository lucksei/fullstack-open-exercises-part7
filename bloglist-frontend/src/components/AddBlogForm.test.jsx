import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import loginService from '../services/login';
import blogService from '../services/blogs';
import store from '../utils/storeConfig';
import AddBlogForm from './AddBlogForm';

describe('<AddBlogForm />', () => {
  test.only('create new blog with the right details', async () => {
    const container = render(
      <Provider store={store}>
        <AddBlogForm />
      </Provider>,
    ).container;

    const blogFormElement = container.querySelector('.blog-form');
    const inputTitleElement = blogFormElement.querySelector('.input-title');
    const inputAuthorElement = blogFormElement.querySelector('.input-author');
    const inputUrlElement = blogFormElement.querySelector('.input-url');
    const submitButtonElement = blogFormElement.querySelector('.btn-submit');

    const user = userEvent.setup();
    await user.click(inputTitleElement);
    await user.keyboard('title test');
    await user.click(inputAuthorElement);
    await user.keyboard('author test');
    await user.click(inputUrlElement);
    await user.keyboard('http://localhost:42069/test');
    await user.click(submitButtonElement);

    await waitFor(() => {
      const blogs = store.getState().blogs;
      console.log(store.getState());
      expect(blogs).toHaveLength(1);
    });
  });
});
