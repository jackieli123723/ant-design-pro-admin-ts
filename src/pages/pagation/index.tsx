import React, { useState } from 'react';
import Page from './page';
import './index.less';

import 'react-table-pagination/assets/theme.css';
import ReactHooksPage from 'react-table-pagination/es6/index';

//配合index.css使用
// headPageButtonText={getDom(1)}
// tailPageButtonText={getDom(4)}
// prevPageButtonText={getDom(2)}
// nextPageButtionText={getDom(3)}

//
// import Page from 'react-table-pagination/es6/index';
// import Page from 'react-table-pagination/umd/index';

// import useCounter from './useCounter/index';
// function Level() {
//   console.log('renderLevel12');
//   const { count, start, stop, reset } = useCounter(0, 500);
//   return (
//     <>
//       <div> count is {count}</div>
//       <button onClick={start}>start</button>
//       <button onClick={stop}>stop</button>
//       <button onClick={reset}>reset</button>
//     </>
//   );
// }
const showToast = (msg: string): void => {
  console.log(msg);
};

// interface IArray {
//     [position: number]: Customer;
// }
// var custs: IArray = [new Customer("A123"), new Customer("B456")];

// interface IArrayExtended {
//     [position: number]: Customer;
//     length: number;
//     push(item: Customer): number;
// };

//vs //array: any vs Array<MockTableData>

interface MockTableData {
  id: number;
  name: string;
  work: string;
  address: string;
}

function PaginationHooksAlgorithm() {
  //不优雅实现
  const [currentPage, setCurrentPage]: [number, any] = useState<number>(21);
  const [totalPage]: [number, any] = useState<number>(2221);
  const [pageSize, setPageSize]: [number, any] = useState<number>(10);

  const [currentPage2, setCurrentPage2]: [number, any] = useState<number>(1);
  const [totalPage2]: [number, any] = useState<number>(99);
  const [pageSize2, setPageSize2]: [number, any] = useState<number>(10);

  const [currentPage3, setCurrentPage3]: [number, any] = useState<number>(1);
  const [totalPage3]: [number, any] = useState<number>(1201);
  const [pageSize3, setPageSize3]: [number, any] = useState<number>(10);

  //点页码回调 数字
  const onPageChange = (page: number): void => {
    showToast('当前页码:' + page);
    setCurrentPage(page);
  };

  //分页器回调
  const onPageSizeChange = (page: number): void => {
    showToast('每页显示:' + page);
    setCurrentPage(1);
    setPageSize(page);
  };

  //点页码回调 数字
  const onPageChange2 = (page: number): void => {
    showToast('当前页码:' + page);
    setCurrentPage2(page);
  };

  //分页器回调
  const onPageSizeChange2 = (page: number): void => {
    showToast('每页显示:' + page);
    setCurrentPage2(1);
    setPageSize2(page);
  };

  //点页码回调 数字
  const onPageChange3 = (page: number): void => {
    showToast('当前页码:' + page);
    setCurrentPage3(page);
  };

  //分页器回调
  const onPageSizeChange3 = (page: number): void => {
    showToast('每页显示:' + page);
    setCurrentPage3(1);
    setPageSize3(page);
  };
  //mock table data

  //增加icon base64
  function getDom(type: any): any {
    switch (type) {
      case 1:
        return <i className="first"></i>;
      case 2:
        return <i className="prev"></i>;
      case 3:
        return <i className="next"></i>;
      case 4:
        return <i className="last"></i>;
    }
  }

  const mockArray = (length: number): Array<number> =>
    Array.from({ length }, (...args) => args[1] + 1);
  const arr = mockArray(totalPage);
  // const res = arr.map((item) => {
  //   return {
  //     id: item,
  //     name: 'jackieli',
  //     work: 'web前端开发',
  //     address: '四川省成都市天府软件园',
  //   };
  // });

  //way2
  const res: MockTableData[] = arr.map((item) => {
    return {
      id: item,
      name: 'jackieli',
      work: 'web前端开发',
      address: '四川省成都市天府二街',
    };
  });

  function sliceArray(array: MockTableData[], size: number): Array<any> {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
      var start = x * size;
      var end = start + size;
      result.push(array.slice(start, end));
    }
    return result;
  }

  function getPageArr(arr: MockTableData[], page: number): any {
    return arr.slice(page - 1, page);
  }

  let array: MockTableData[] = sliceArray(res, pageSize);
  let data = getPageArr(array, currentPage);

  return (
    <>
      <div>
        <div className="title">react-table-pagination-hooks-algorithm</div>
        <div className="react-page-form">
          <table className="react-page-table">
            <thead>
              <tr>
                <th>id</th>
                <th>姓名</th>
                <th>职业</th>
                <th>工作地址</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data[0].map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.work}</td>
                      <td>{item.address}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <ReactHooksPage
          totalPage={totalPage}
          currentPage={currentPage}
          pageSize={pageSize}
          pageSizeArray={[10, 20, 30, 50, 60, 90, 100, 200]}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
        <br />
        <Page
          totalPage={totalPage2}
          currentPage={currentPage2}
          pageSize={pageSize2}
          pageSizeArray={[10, 20, 30, 50, 60, 90, 100, 200]}
          showPageJump={true}
          showPagers={true}
          jumpText={'跳至'}
          jumpButtonText={'跳转'}
          showHeadTailPageButton={true}
          onPageChange={onPageChange2}
          onPageSizeChange={onPageSizeChange2}
        />
        <br />
        <Page
          totalPage={totalPage3}
          currentPage={currentPage3}
          pageSize={pageSize3}
          pageSizeArray={[10, 20, 30, 50, 60, 90, 100, 200]}
          showPageJump={true}
          showPagers={true}
          jumpText={'跳至'}
          jumpButtonText={'跳转'}
          showHeadTailPageButton={true}
          headPageButtonText={'	« '}
          tailPageButtonText={' » '}
          prevPageButtonText={' ‹ '}
          nextPageButtionText={' › '}
          onPageChange={onPageChange3}
          onPageSizeChange={onPageSizeChange3}
        />
      </div>
    </>
  );
}

export default PaginationHooksAlgorithm;
