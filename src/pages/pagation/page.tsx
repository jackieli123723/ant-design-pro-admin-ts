import React, { useState, useRef } from 'react';
// import './page.less';

// interface NumberArray {
//   [index: number]: number;
// }

const noop = () => {};

export interface PagationOptions {
  totalPage: number;
  currentPage: number;
  pageSize: number;
  defaultPageLink?: number;
  defaultPageStep?: number;
  pageSizeArray?: number[]; //[index: number]: number; || any || number[] ||   NumberArray | any;
  showPageJump?: boolean;
  showPagers?: boolean;
  headPageButtonText?: string;
  tailPageButtonText?: string;
  prevPageButtonText?: string;
  nextPageButtionText?: string;
  showHeadTailPageButton?: boolean;
  jumpText?: string;
  jumpButtonText?: string;
  onPageChange: (e: any) => void;
  onPageSizeChange: (e: any) => void;
}

const Page: React.FC<PagationOptions> = ({
  totalPage,
  currentPage = 1,
  pageSize = 10,
  defaultPageLink = 5,
  defaultPageStep = 2,
  pageSizeArray = [10, 20, 30, 50, 60, 90, 100],
  showPageJump = true,
  showPagers = true,
  headPageButtonText = '首页',
  tailPageButtonText = '尾页',
  prevPageButtonText = '<',
  nextPageButtionText = '>',
  showHeadTailPageButton = true,
  jumpText = '到第',
  jumpButtonText = '确定',
  onPageChange = (e: any) => noop,
  onPageSizeChange = (e: any) => noop,
}) => {
  const [jumpPage, setJumpPage]: [string, any] = useState<string>('');
  const [current, setCurrent]: [number, any] = useState<number>(currentPage);
  const [, setSize]: [number, any] = useState<number>(pageSize); //传参到调用组件第一个参数可以为空
  const jumpRef = useRef<HTMLInputElement>(null);

  //改变分页区间 每页显示多少条
  const changePageSize = (e: any): void => {
    setCurrent(1);
    setSize(parseInt(e.target.value));
    if (typeof onPageChange === 'function') {
      onPageSizeChange(parseInt(e.target.value));
    }
  };

  //way3 自行实现 修复 首页<12345...10>尾页 current = 4 因为4的索引在当前视图区域
  const pagersList = (
    countPage: number,
    currPage: number,
    pagelink: number,
    step: number,
    limit: number,
  ): any => {
    let pager = [];
    let count = countPage | 0;
    let curr = currPage | 0 || 1;
    let pages = Math.ceil(count / limit) || 1;
    let groups = pagelink;
    //当前页数超过了总的
    if (curr > pages) {
      curr = pages;
    }
    //连续分页个数不能低于0且不能大于总页数
    if (groups < 0) {
      groups = 1;
    } else if (groups > pages) {
      groups = pages;
    }
    //计算当前组
    let index =
      pages > groups ? Math.ceil((curr + (groups > 1 ? 1 : 0)) / (groups > 0 ? groups : 1)) : 1;
    if (count < 1) {
      pager.push(1);
    }

    //默认是否显示首页 1
    if (index > 1 && groups !== 0) {
      pager.push(1);
    }

    //计算当前页码组的起始页
    let middle = Math.floor((groups - 1) / 2), //页码数等分
      start = index > 1 ? curr - middle : 1,
      end =
        index > 1
          ? curr + (groups - middle - 1) > pages
            ? pages
            : curr + (groups - middle - 1)
          : groups;

    //防止最后一组出现“不规定”的连续页码数
    if (end - start < groups - 1) {
      start = end - groups + 1;
    }

    //输出左分割符
    if (start > step) {
      pager.push('...');
    }

    //输出连续页码 这里有个小魔法 注意哦
    for (; start <= end; start++) {
      pager.push(start);
    }

    //输出输出右分隔符 & 末页 //默认是否显示尾页 分页多的时候很有用哦 可以作为开启项目
    if (pages > groups && pages > end) {
      if (end + 1 < pages) {
        pager.push('...');
      }
      if (groups !== 0) {
        pager.push(pages);
      }
    }

    return pager;
  };

  //上一页 修复第一页还可以点上一页
  const goPrevPage = (): void => {
    let page = current;
    if (page == 1) {
      return;
    } else {
      goPage(current - 1);
    }
  };

  //下一页
  const goNextPage = (): void => {
    let page = current;
    const endPage = Math.ceil(totalPage / pageSize);
    if (page >= endPage) {
      return;
    } else {
      goPage(current + 1);
    }
  };

  //首页
  const goFisrtPage = (): void => {
    setCurrent(1);
    if (typeof onPageChange === 'function') {
      onPageChange(1);
    }
  };

  //尾页
  const goEndPage = (): void => {
    const endPage = Math.ceil(totalPage / pageSize);
    setCurrent(endPage);

    if (typeof onPageChange === 'function') {
      onPageChange(endPage);
    }
  };

  //页面跳转
  const goPage = (page: number): void => {
    setCurrent(page);
    if (typeof onPageChange === 'function') {
      onPageChange(page);
    }
  };

  //跳转到指定页码
  const goJumpPage = (page: number): void => {
    const startPage = currentPage;
    const endPage = Math.ceil(totalPage / pageSize);

    let currentPageTemp = page;

    if (page <= 0 || page == undefined || page == null || isNaN(page)) {
      if (jumpRef.current) {
        jumpRef.current.focus();
        return;
      }
    }

    if (currentPageTemp >= endPage && currentPageTemp !== startPage) {
      currentPageTemp = endPage;
    }

    setCurrent(currentPageTemp);

    if (typeof onPageChange === 'function') {
      onPageChange(currentPageTemp);
    }
  };

  //页码监听
  const jumpPageChange = (e: any): void => {
    setJumpPage(e.target.value);
  };

  //判断点击的键盘的keyCode是否为13，是就调用上面的跳转
  const handleKeyDownJump = (e: any): void => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      goJumpPage(e.target.value);
    }
  };

  const endPage = Math.ceil(totalPage / pageSize);
  const pagesAlgorithms = pagersList(
    totalPage,
    current,
    defaultPageLink,
    defaultPageStep,
    pageSize,
  );
  // console.log(pagesAlgorithms);
  return (
    <div className="react-page-pagination clearfix">
      <div className="fl">
        <span className="page-total">
          共 <em>{totalPage}</em> 条记录
        </span>
        {showPagers ? (
          <>
            <select
              className={pageSize >= 100 ? 'page-select large' : 'page-select'}
              onChange={changePageSize}
              value={pageSize}
            >
              {pageSizeArray.map((page: any, index: number) => {
                return (
                  <option id={page} value={page} key={index}>
                    {page + '条/页'}
                  </option>
                );
              })}
            </select>
          </>
        ) : null}

        {showPageJump ? (
          <>
            <em className="jump-text"> {jumpText}</em>
            <input
              type="text"
              ref={jumpRef}
              className="jump-input"
              value={jumpPage}
              onChange={(e) => jumpPageChange(e)}
              onKeyDown={handleKeyDownJump}
            />
            <em className="jump-text">页</em>
            <button className="jump-button" onClick={() => goJumpPage(Number(jumpPage))}>
              {jumpButtonText}
            </button>
          </>
        ) : null}
      </div>

      <div className="fr pagination">
        {showHeadTailPageButton ? (
          <>
            <span
              className={current == 1 ? 'page-tail-button disable' : 'page-tail-button'}
              onClick={() => {
                return current !== 1 ? goFisrtPage() : null;
              }}
            >
              {headPageButtonText}
            </span>
          </>
        ) : null}
        <span
          className={current == 1 ? 'page-tail-button disable' : 'page-tail-button'}
          onClick={() => goPrevPage()}
        >
          {prevPageButtonText}
        </span>
        {pagesAlgorithms.map((page: any, index: number) => {
          return typeof page === 'number' ? (
            <span
              className={current == page ? 'current page-item' : 'page-item'}
              key={index}
              onClick={() => (current !== page ? goPage(page) : null)}
            >
              {page}
            </span>
          ) : (
            <span key={index} className="page-dot">
              {page}
            </span>
          );
        })}
        <span
          className={current == endPage ? 'page-tail-button disable' : 'page-tail-button'}
          onClick={() => {
            goNextPage();
          }}
        >
          {nextPageButtionText}
        </span>

        {showHeadTailPageButton ? (
          <>
            <span
              className={current == endPage ? 'page-tail-button disable' : 'page-tail-button'}
              onClick={() => {
                return current !== endPage ? goEndPage() : null;
              }}
            >
              {tailPageButtonText}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
