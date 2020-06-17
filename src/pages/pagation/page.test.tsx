import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Page, { PagationOptions } from './page';

//环境 ok
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
// Setup enzyme's react adapter
enzyme.configure({ adapter: new Adapter() });

const noop = () => {};

const renderPage = (options: PagationOptions) => {
  return <Page {...options} />;
};

describe('react-hooks-page npm package test render', (): void => {
  it('total page  is 1 render page', (): void => {
    const options = {
      totalPage: 1,
      currentPage: 1,
      pageSize: 10,
      onPageChange: noop,
      onPageSizeChange: noop,
    };
    const wrapper = render(renderPage(options)); //works shallow and render
    expect(wrapper.find('span').length).toBe(6);
  });

  it('total page  is 11 render page', (): void => {
    const options = {
      totalPage: 11,
      currentPage: 2,
      pageSize: 10,
      onPageChange: noop,
      onPageSizeChange: noop,
    };

    const wrapper = render(renderPage(options));
    expect(wrapper.find('span').length).toBe(7);
  });
});
