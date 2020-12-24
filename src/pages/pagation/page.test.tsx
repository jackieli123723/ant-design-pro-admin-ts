import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Page, { PagationOptions } from './page';

//环境 ok commonjs
// const enzyme = require('enzyme');
// const Adapter = require('enzyme-adapter-react-16');
// // Setup enzyme's react adapter
// enzyme.configure({ adapter: new Adapter() });

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};
//测试分页算法 排出后面的问题
// const getPageTailEnd = (arr: any): any => {
//   if (arr.length < 5) return [];
//   const temp = arr.slice(2);
//   return temp.slice(0, -2);
// };
const renderPage = (options: PagationOptions): any => {
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
    expect(wrapper.find('.page-total').length).toBe(1); //总页数存在
    expect(wrapper.find('.page-total em').text()).toContain(1); //总页数
    expect(wrapper.find('.pagination span').length).toBe(5); //分页器
    expect(wrapper.find('.current.page-item').length).toBe(1); //currentPage
    expect(wrapper.find('.page-tail-button.disable').length).toBe(4); //不可点击
    expect(wrapper.find('.page-select').length).toBe(1); //选择分页
    expect(wrapper.find('select').find('option').eq(0).text()).toContain('10条/页');
    expect(wrapper.find('select').find('option').eq(1).text()).toContain('20条/页');
    expect(wrapper.find('.jump-text').length).toBe(2); //jump text
    expect(wrapper.find('.jump-input').length).toBe(1); //jump input
    expect(wrapper.find('.jump-button').length).toBe(1); //jump button
    expect(wrapper).toMatchSnapshot();

    const wrapperDom = shallow(renderPage(options));
    const pageButtonList: any[] = [];
    wrapperDom.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    expect(pageButtonList).toEqual(['首页', '<', '1', '>', '尾页']);
    expect(wrapperDom).toMatchSnapshot();
  });

  it('total page  is 11 render page', (): void => {
    const options = {
      totalPage: 11,
      currentPage: 1,
      pageSize: 20,
      onPageChange: noop,
      onPageSizeChange: noop,
    };
    const wrapper = render(renderPage(options));
    expect(wrapper.find('.page-total em').text()).toContain(11);
    expect(wrapper.find('.pagination span').length).toBe(5);
    expect(wrapper.find('.current.page-item').length).toBe(1);
    expect(wrapper.find('.page-tail-button.disable').length).toBe(4);
    expect(wrapper).toMatchSnapshot();

    const wrapperDom = shallow(renderPage(options));
    const pageButtonList: any[] = [];
    wrapperDom.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    expect(pageButtonList).toEqual(['首页', '<', '1', '>', '尾页']);
    expect(wrapperDom).toMatchSnapshot();
  });

  it('total page  is 31 render page', (): void => {
    const options = {
      totalPage: 31,
      currentPage: 1,
      pageSize: 10,
      onPageChange: noop,
      onPageSizeChange: noop,
    };
    const wrapper = render(renderPage(options));
    expect(wrapper.find('.page-total em').text()).toContain(31);
    expect(wrapper.find('.pagination span').length).toBe(8);
    expect(wrapper.find('.current.page-item').length).toBe(1);
    expect(wrapper.find('.page-tail-button.disable').length).toBe(2);
    expect(wrapper).toMatchSnapshot();

    const wrapperDom = shallow(renderPage(options));
    const pageButtonList: any[] = [];
    wrapperDom.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    expect(pageButtonList).toEqual(['首页', '<', '1', '2', '3', '4', '>', '尾页']);
    expect(wrapperDom).toMatchSnapshot();
  });

  it('total page  is 40 render page', (): void => {
    const options = {
      totalPage: 40,
      currentPage: 1,
      pageSize: 10,
      onPageChange: noop,
      onPageSizeChange: noop,
    };
    const wrapper = render(renderPage(options));
    expect(wrapper.find('.page-total em').text()).toContain(40);
    expect(wrapper.find('.pagination span').length).toBe(8);
    expect(wrapper.find('.current.page-item').length).toBe(1);
    expect(wrapper.find('.page-tail-button.disable').length).toBe(2);
    expect(wrapper).toMatchSnapshot();

    const wrapperDom = shallow(renderPage(options));
    const pageButtonList: any[] = [];
    wrapperDom.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    expect(pageButtonList).toEqual(['首页', '<', '1', '2', '3', '4', '>', '尾页']);
    expect(wrapperDom).toMatchSnapshot();
  });

  it('total page  is 50 render page', (): void => {
    const options = {
      totalPage: 50,
      currentPage: 4,
      pageSize: 10,
      onPageChange: noop,
      onPageSizeChange: noop,
    };
    const wrapper = render(renderPage(options));
    expect(wrapper.find('.page-total em').text()).toContain(50);
    expect(wrapper.find('.pagination span').length).toBe(9);
    expect(wrapper.find('.current.page-item').length).toBe(1);
    expect(wrapper.find('.page-tail-button.disable').length).toBe(0);
    expect(wrapper).toMatchSnapshot();

    const wrapperDom = shallow(renderPage(options));
    const pageButtonList: any[] = [];
    wrapperDom.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    expect(pageButtonList).toEqual(['首页', '<', '1', '2', '3', '4', '5', '>', '尾页']);
    expect(wrapperDom).toMatchSnapshot();
  });

  it('total page  is 51 render page', (): void => {
    const options = {
      totalPage: 51,
      currentPage: 1,
      pageSize: 10,
      onPageChange: noop,
      onPageSizeChange: noop,
    };
    const wrapper = render(renderPage(options));
    expect(wrapper.find('.page-total em').text()).toContain(51);
    expect(wrapper.find('.pagination span').length).toBe(10);
    expect(wrapper.find('.current.page-item').length).toBe(1);
    expect(wrapper.find('.page-tail-button.disable').length).toBe(2);
    expect(wrapper).toMatchSnapshot();

    const wrapperDom = shallow(renderPage(options));
    const pageButtonList: any[] = [];
    wrapperDom.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    expect(pageButtonList).toEqual(['首页', '<', '1', '2', '3', '4', '5', '6', '>', '尾页']);
    expect(wrapperDom).toMatchSnapshot();
  });

  it('total page  is 100 render page', (): void => {
    const options = {
      totalPage: 100,
      currentPage: 10,
      pageSize: 10,
      onPageChange: noop,
      onPageSizeChange: noop,
    };
    const wrapper = render(renderPage(options));
    expect(wrapper.find('.page-total em').text()).toContain(100);
    expect(wrapper.find('.pagination span').length).toBe(11);
    expect(wrapper.find('.current.page-item').length).toBe(1);
    expect(wrapper.find('.page-tail-button.disable').length).toBe(2);
    expect(wrapper).toMatchSnapshot();

    const wrapperDom = shallow(renderPage(options));
    const pageButtonList: any[] = [];
    wrapperDom.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    // console.log(pageButtonList);
    expect(pageButtonList).toEqual([
      '首页',
      '<',
      '1',
      '...',
      '6',
      '7',
      '8',
      '9',
      '10',
      '>',
      '尾页',
    ]);
  });

  it('total page  is 221 render page', (): void => {
    const options = {
      totalPage: 221,
      currentPage: 21,
      pageSize: 10,
      onPageChange: noop,
      onPageSizeChange: noop,
    };
    const wrapper = render(renderPage(options));
    expect(wrapper.find('.page-total em').text()).toContain(221);
    expect(wrapper.find('.pagination span').length).toBe(11);
    expect(wrapper.find('.page-dot').length).toBe(1);
    expect(wrapper.find('select').val()).toEqual('10');
    expect(wrapper.find('select').find('option').eq(0).text()).toContain('10条/页');
    expect(wrapper.find('select').find('option').eq(1).text()).toContain('20条/页');
    const currentPage = options.currentPage.toString();
    const lastPage = Math.ceil(options.totalPage / options.pageSize).toString();
    expect(wrapper.find('.page-item').last().text()).toBe(lastPage);
    expect(wrapper.find('.page-item').first().text()).toBe('1');
    expect(wrapper.find('.current.page-item').text()).toBe(currentPage);
    expect(wrapper).toMatchSnapshot();

    const wrapperDom = shallow(renderPage(options));
    const pageButtonList: any[] = [];
    wrapperDom.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    // console.log(pageButtonList);
    expect(pageButtonList).toEqual([
      '首页',
      '<',
      '1',
      '...',
      '19',
      '20',
      '21',
      '22',
      '23',
      '>',
      '尾页',
    ]);
  });
});

describe('react-hooks-page npm package test select jump click and page button list computed', (): void => {
  it('total page  is 221 render page ui render click test', (): void => {
    const value = 30;
    const onPageSizeChange = jest.fn();
    const onPageChange = jest.fn();
    const options = {
      totalPage: 221,
      currentPage: 21,
      pageSize: 10,
      onPageChange: onPageChange,
      onPageSizeChange: onPageSizeChange,
    };
    const wrapper = shallow(renderPage(options));

    expect(wrapper.find('.page-total em').text()).toContain(221);
    expect(wrapper.find('.pagination span').length).toBe(11);
    expect(wrapper.find('.page-dot').length).toBe(1);
    const pageButtonList: any[] = [];
    wrapper.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    // console.log(pageButtonList);
    expect(pageButtonList).toEqual([
      '首页',
      '<',
      '1',
      '...',
      '19',
      '20',
      '21',
      '22',
      '23',
      '>',
      '尾页',
    ]);

    // step1 分页 30 跳转到1页 ?不同步改变render？ 没起效果？ 下面是ok
    wrapper
      .find('select')
      .at(0)
      .simulate('change', {
        target: { value: value },
      });
    wrapper.find('select').find('option').at(2).simulate('click');
    //jest.fn（） 回调 点击事件
    expect(onPageSizeChange).toBeCalledWith(value);

    //restart render
    options.pageSize = 30;
    options.currentPage = 1;
    const wrapperDom = shallow(renderPage(options));
    const pageButtonList2: any[] = [];
    wrapperDom.find('.pagination span').forEach((item) => {
      pageButtonList2.push(item.text());
    });
    expect(pageButtonList2).toEqual([
      '首页',
      '<',
      '1',
      '2',
      '3',
      '4',
      '5',
      '...',
      '8',
      '>',
      '尾页',
    ]);

    const lastPage1 = Math.ceil(options.totalPage / options.pageSize).toString();
    expect(wrapperDom.find('.page-item').last().text()).toBe(lastPage1);
    expect(wrapperDom.find('.page-item').first().text()).toBe('1');

    //page list way2 mock

    options.pageSize = 30;
    options.currentPage = 1;
    const wrapper2 = render(renderPage(options));
    //shallow how to get select val ？
    // $$(".page-select")[0].value ---控制台
    // "30"
    // expect(wrapper.find('select').props().value).toEqual('10'); //10? re-render is 30 is ok why 10 shallow 方法
    expect(wrapper2.find('select').val()).toEqual('30'); //render
    expect(wrapper2.find('.current.page-item').length).toBe(1);
    expect(wrapper2.find('.page-dot').length).toBe(1);
    expect(wrapper2.find('.page-tail-button.disable').length).toBe(2);

    //step2 input  foucus 5也跳转 输入 点击确定跳转 不是渲染后的？-- shallow 重绘
    options.pageSize = 30;
    options.currentPage = 1;
    const wrapper3 = shallow(renderPage(options));
    const input = wrapper3.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: 5 } });
    wrapper3.find('button').simulate('click');
    expect(wrapper3.find('.page-dot').length).toBe(1);
    expect(wrapper3.find('.page-item.current').text()).toContain(5); //高亮当前current
    expect(wrapper3.find('.page-tail-button').length).toBe(4);
    const lastPage = Math.ceil(options.totalPage / options.pageSize).toString();
    expect(wrapper3.find('.page-item').last().text()).toBe(lastPage);
    expect(wrapper3).toMatchSnapshot();
  });
});

describe('react-hooks-page npm package page button page click', (): void => {
  it('total page  is 221 render page button click test 2', (): void => {
    const value = 30;
    const onPageSizeChange = jest.fn();
    const onPageChange = jest.fn();
    const options = {
      totalPage: 221,
      currentPage: 21,
      pageSize: 10,
      onPageChange: onPageChange,
      onPageSizeChange: onPageSizeChange,
    };
    const wrapper = shallow(renderPage(options));

    expect(wrapper.find('.page-total em').text()).toContain(221);
    expect(wrapper.find('.pagination span').length).toBe(11);
    expect(wrapper.find('.page-dot').length).toBe(1);

    // 分页 30 跳转到1页

    wrapper.find('select').simulate('change', {
      target: { value },
    });
    options.pageSize = 30;
    options.currentPage = 1;
    const wrapper2 = render(renderPage(options));
    //shallow how to get select val ？
    // $$(".page-select")[0].value ---控制台
    // "30"
    // expect(wrapper.find('select').props().value).toEqual('10'); //10? re-render is 30 is ok why 10 shallow
    expect(wrapper2.find('select').val()).toEqual('30'); //render
    expect(wrapper2.find('.current.page-item').length).toBe(1);
    expect(wrapper2.find('.page-dot').length).toBe(1);
    expect(wrapper2.find('.page-tail-button.disable').length).toBe(2);

    //input  foucus 5也跳转 输入 点击确定跳转 不是渲染后的？-- shallow 重绘
    options.pageSize = 30;
    options.currentPage = 1;
    const wrapper3 = shallow(renderPage(options));
    const input = wrapper3.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: 5 } });
    wrapper3.find('button').simulate('click');
    expect(wrapper3.find('.page-dot').length).toBe(1);
    expect(wrapper3.find('.page-item.current').text()).toContain(5); //高亮当前current
    expect(wrapper3.find('.page-tail-button').length).toBe(4);
    const lastPage = Math.ceil(options.totalPage / options.pageSize).toString();
    expect(wrapper3.find('.page-item').last().text()).toBe(lastPage);
    expect(wrapper3).toMatchSnapshot();
  });
});

describe('Should render correct value when per page select change or jump click is changed', (): void => {
  it('select change click', () => {
    const onPageSizeChange = jest.fn();
    const onPageChange = jest.fn();
    const options = {
      totalPage: 221,
      currentPage: 1,
      pageSize: 30,
      onPageChange: onPageChange,
      onPageSizeChange: onPageSizeChange,
    };
    const wrapper = shallow(renderPage(options));
    const page = 30;
    wrapper
      .find('select')
      .at(0)
      .simulate('change', {
        target: { value: page },
      });
    expect(wrapper.find('select').at(0).prop('value')).toBe(page);

    const pageButtonList: any[] = [];
    wrapper.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });

    expect(pageButtonList).toEqual(['首页', '<', '1', '2', '3', '4', '5', '...', '8', '>', '尾页']);

    expect(wrapper).toMatchSnapshot();
  });

  //测试input 输入 点击 确定按钮
  it('input numbner button jump click', () => {
    const onPageSizeChange = jest.fn();
    const onPageChange = jest.fn();
    const options = {
      totalPage: 1000,
      currentPage: 1,
      pageSize: 10,
      onPageChange: onPageChange,
      onPageSizeChange: onPageSizeChange,
    };
    const wrapper = shallow(renderPage(options));

    //input 赋值 默认没有值
    //button渲染
    //dom 渲染可以连贯
    expect(wrapper.find('.jump-button')).toBeTruthy();

    const pageButtonList: any[] = [];
    wrapper.find('.pagination span').forEach((item) => {
      pageButtonList.push(item.text());
    });
    expect(pageButtonList).toEqual([
      '首页',
      '<',
      '1',
      '2',
      '3',
      '4',
      '5',
      '...',
      '100',
      '>',
      '尾页',
    ]);

    //跳转50
    const jumpPage = 50;
    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        target: { value: jumpPage },
      });

    expect(wrapper.find('input').at(0).prop('value')).toBe(jumpPage);
    wrapper.find('.jump-button').simulate('click');
    //jest.fn（） 回调 点击事件 和数据传递
    expect(onPageChange).toHaveBeenCalled();
    expect(onPageChange).toBeCalledWith(jumpPage);

    expect(wrapper.find('.current.page-item').length).toBe(1);
    expect(wrapper.find('.current.page-item').text()).toContain(jumpPage);

    const pageButtonList2: any[] = [];
    wrapper.find('.pagination span').forEach((item) => {
      pageButtonList2.push(item.text());
    });

    expect(pageButtonList2).toEqual([
      '首页',
      '<',
      '1',
      '...',
      '48',
      '49',
      '50',
      '51',
      '52',
      '...',
      '100',
      '>',
      '尾页',
    ]);

    expect(wrapper).toMatchSnapshot();
  });
});
