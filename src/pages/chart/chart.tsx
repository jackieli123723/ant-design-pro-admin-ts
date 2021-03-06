// import React, { useEffect, useState } from 'react';
// // import { Chart, Interval, Tooltip, Legend, View, Axis, Coordinate } from 'bizcharts';
// // import { DataView } from '@antv/data-set';
// // import DataSet from '@antv/data-set';

// import {
//     Chart,
//     Point,
// } from 'bizcharts';




// const BizCharts: React.FC<{}> = (props) => {

//     // const { DataView } = DataSet

// //   const [data,setData] = useState([
// //     { type: '美市', value: 90 },
// //     { type: '阿里巴巴', value: 5 },
// //     { type: '腾讯', value: 4 },
// //     { type: '其他', value: 1 },
// //   ])

// //   const [dv, setDv] = useState(new DataView())
// //   useEffect(() =>{
// //     // 通过 DataSet 计算百分比
// //         const dve = new DataView();
// //         dve.source(data).transform({
// //         type: 'percent',
// //         field: 'value',
// //         dimension: 'type',
// //         as: 'percent',
// //         });
// //         setDv(dve);
// //   })


// const [data, setData] = useState();
// useEffect(() => {
//     fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/point-scatter/0.2.8/mock.json')
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             setData(data);
//         })
// }, []);

// return (
//     <Chart
//         height={400}
//         data={data}
//         autoFit
//         interactions={['legend-highlight']}
//     >
//         <Point
//             position="height*weight"
//             color="gender"
//             shape="circle"
//             style={{
//                 fillOpacity: 0.85
//             }} />
//     </Chart>
// );
// };

// export default BizCharts;



import React, { useState, useEffect } from 'react'
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

const GITHUB_API = 'https://api.github.com/repos/chanshiyucx/blog/issues?page=10&per_page='

import BizChartsRows from './chartrow'


const BizCharts: React.FC<{}> = (props) => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  // 添加 loading 和 error 状态
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const [dv, setData] = useState([]);
  const [charts,setCharts] = useState([
    {
      time: '2019-02',
      level_s_amount: 123,
      level_a_amount: 223,
      level_b_amount: 310,
      level_c_amount: 412,
      level_other_amount: 312,
      level_s_gaap: 123,
      level_a_gaap: 542,
      level_b_gaap: 123,
      level_c_gaap: 432,
      level_other_gaap: 531,
    },
    {
      time: '2019-03',
      level_s_amount: 993,
      level_a_amount: 133,
      level_b_amount: 343,
      level_c_amount: 123,
      level_other_amount: 632,
      level_s_gaap: 342,
      level_a_gaap: 322,
      level_b_gaap: 564,
      level_c_gaap: 422,
      level_other_gaap: 965,
    },
    {
      time: '2019-04',
      level_s_amount: 312,
      level_a_amount: 533,
      level_b_amount: 111,
      level_c_amount: 222,
      level_other_amount: 333,
      level_s_gaap: 444,
      level_a_gaap: 523,
      level_b_gaap: 383,
      level_c_gaap: 343,
      level_other_gaap: 431,
    },
    {
      time: '2019-05',
      level_s_amount: 300,
      level_a_amount: 300,
      level_b_amount: 300,
      level_c_amount: 300,
      level_other_amount: 300,
      level_s_gaap: 300,
      level_a_gaap: 300,
      level_b_gaap: 300,
      level_c_gaap: 300,
      level_other_gaap: 300,
    },
    {
      time: '2019-06',
      level_s_amount: 300,
      level_a_amount: 300,
      level_b_amount: 300,
      level_c_amount: 300,
      level_other_amount: 300,
      level_s_gaap: 300,
      level_a_gaap: 300,
      level_b_gaap: 300,
      level_c_gaap: 300,
      level_other_gaap: 300,
    },
    {
      time: '2019-07',
      level_s_amount: 300,
      level_a_amount: 300,
      level_b_amount: 300,
      level_c_amount: 300,
      level_other_amount: 300,
      level_s_gaap: 300,
      level_a_gaap: 300,
      level_b_gaap: 300,
      level_c_gaap: 300,
      level_other_gaap: 300,
    },
  ])

  const [childSource,setChildSource] = useState([
      {
          State: "AL",
          "Under 5 Years": 310504,
          "5 to 13 Years": 552339,
          "14 to 17 Years": 259034,
          "18 to 24 Years": 450818,
          "25 to 44 Years": 1231572,
          "45 to 64 Years": 1215966,
          "65 Years and Over": 641667
        },
        {
          State: "AK",
          "Under 5 Years": 52083,
          "5 to 13 Years": 85640,
          "14 to 17 Years": 42153,
          "18 to 24 Years": 74257,
          "25 to 44 Years": 198724,
          "45 to 64 Years": 183159,
          "65 Years and Over": 50277
        },
        {
          State: "AZ",
          "Under 5 Years": 515910,
          "5 to 13 Years": 828669,
          "14 to 17 Years": 362642,
          "18 to 24 Years": 601943,
          "25 to 44 Years": 1804762,
          "45 to 64 Years": 1523681,
          "65 Years and Over": 862573
        },
        {
          State: "AR",
          "Under 5 Years": 202070,
          "5 to 13 Years": 343207,
          "14 to 17 Years": 157204,
          "18 to 24 Years": 264160,
          "25 to 44 Years": 754420,
          "45 to 64 Years": 727124,
          "65 Years and Over": 407205
        },
        {
          State: "CA",
          "Under 5 Years": 2704659,
          "5 to 13 Years": 4499890,
          "14 to 17 Years": 2159981,
          "18 to 24 Years": 3853788,
          "25 to 44 Years": 10604510,
          "45 to 64 Years": 8819342,
          "65 Years and Over": 4114496
        },
        {
          State: "CO",
          "Under 5 Years": 358280,
          "5 to 13 Years": 587154,
          "14 to 17 Years": 261701,
          "18 to 24 Years": 466194,
          "25 to 44 Years": 1464939,
          "45 to 64 Years": 1290094,
          "65 Years and Over": 511094
        },
        {
          State: "CT",
          "Under 5 Years": 211637,
          "5 to 13 Years": 403658,
          "14 to 17 Years": 196918,
          "18 to 24 Years": 325110,
          "25 to 44 Years": 916955,
          "45 to 64 Years": 968967,
          "65 Years and Over": 478007
        }
    ]
  )

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const url = `${GITHUB_API}${page}`
        const response = await fetch(url)
        const data = await response.json()
        setList(data)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    fetchData();

    //chart 

      const ds = new DataSet();
      const dv = ds.createView().source(charts);
      dv.transform({
        type: 'fold',
        fields: [
          'level_s_amount',
          'level_a_amount',
          'level_b_amount',
          'level_c_amount',
          'level_s_gaap', 'level_a_gaap', 'level_b_gaap', 'level_c_gaap'
        ],
        //   fields: ['time'],
        // 展开字段集
        key: 'key',
        // key字段
        value: 'value', // value字段
      })
      .transform({
      type: 'map',
      callback: (obj) => {
      if(obj.key.indexOf('amount') !== -1) {
        obj.type = '合同金额'
      } else if(obj.key.indexOf('gaap') !== -1) {
          obj.type = 'GAAP收入'
      }
        obj.level = obj.key.split('_')[1].toUpperCase() + '级'
        // console.log(obj)
        return obj;
      },
    });

    //改变实例  这里需要改变数据 来测试chart 重绘 
    setData(dv)

  }, [page,charts])

  const handleNextPage = () => setPage(page + 1)

  const updateChart = (num: number): void => {
    if(num == 1) {
      setCharts([{
        time: '2019-11',
        level_s_amount: 111,
        level_a_amount: 111,
        level_b_amount: 111,
        level_c_amount: 111,
        level_other_amount: 111,
        level_s_gaap: 111,
        level_a_gaap: 111,
        level_b_gaap: 300,
        level_c_gaap: 300,
        level_other_gaap: 300,
      }])
    }
    if(num == 2){
      setCharts([{
        time: '2019-12',
        level_s_amount: 2222,
        level_a_amount: 2222,
        level_b_amount: 2222,
        level_c_amount: 2222,
        level_other_amount: 2222,
        level_s_gaap: 2222,
        level_a_gaap: 2222,
        level_b_gaap: 300,
        level_c_gaap: 300,
        level_other_gaap: 300,
      }])
    }
  }


  const updateChartR = (num: number): void => {
    if(num == 1) {
      setChildSource([
        {
            State: "11",
            "Under 5 Years": 310504,
            "5 to 13 Years": 552339,
            "14 to 17 Years": 259034,
            "18 to 24 Years": 450818,
            "25 to 44 Years": 1231572,
            "45 to 64 Years": 1215966,
            "65 Years and Over": 641667
          },
          {
            State: "CA",
            "Under 5 Years": 2704659,
            "5 to 13 Years": 4499890,
            "14 to 17 Years": 2159981,
            "18 to 24 Years": 3853788,
            "25 to 44 Years": 10604510,
            "45 to 64 Years": 8819342,
            "65 Years and Over": 4114496
          },
          {
            State: "CO",
            "Under 5 Years": 358280,
            "5 to 13 Years": 587154,
            "14 to 17 Years": 261701,
            "18 to 24 Years": 466194,
            "25 to 44 Years": 1464939,
            "45 to 64 Years": 1290094,
            "65 Years and Over": 511094
          }
      ])
    }
    if(num == 2){
      setChildSource([{
        State: "22",
        "Under 5 Years": 211637,
        "5 to 13 Years": 403658,
        "14 to 17 Years": 196918,
        "18 to 24 Years": 325110,
        "25 to 44 Years": 916955,
        "45 to 64 Years": 968967,
        "65 Years and Over": 478007
      },
      {
        State: "CA",
        "Under 5 Years": 2704659,
        "5 to 13 Years": 4499890,
        "14 to 17 Years": 2159981,
        "18 to 24 Years": 3853788,
        "25 to 44 Years": 10604510,
        "45 to 64 Years": 8819342,
        "65 Years and Over": 4114496
      },
      {
        State: "CO",
        "Under 5 Years": 358280,
        "5 to 13 Years": 587154,
        "14 to 17 Years": 261701,
        "18 to 24 Years": 466194,
        "25 to 44 Years": 1464939,
        "45 to 64 Years": 1290094,
        "65 Years and Over": 511094
      }])
    }
  }





  return (
    <div>
      <button onClick={handleNextPage}>NextPage</button>

      <button onClick={() => {updateChart(1)}}>type1</button>
      <button onClick={() => {updateChart(2)}}>type2</button>

 

     {list && list.length > 1 ? (
      <ul>
      {list.map(o => (
        <li key={o.id}>{o.title}</li>
      ))}
    </ul>
     ) : null}

      {/* 不同的状态展示不同的提示内容 */}
      {isError && <div>Something went wrong ...</div>}
      {isLoading && <div>Loading ...</div>}

      <Chart height={400} data={dv.rows} forceFit>
          <Legend />
          <Axis name="key" />
          <Axis name="type" />
          <Tooltip />
          <Geom
            type="interval"
            position="time*value*type"
            color={'level*type'}
            tooltip={['time*value*level*type', (time, value, level, type)=>{ // array
              console.log(time, value, level, type)
              return {
                name: level,
                value: type + ':' + value
              }
            }]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
            adjust={[
              {
                type: "dodge",
                dodgeBy: "type",
                // 按照 type 字段进行分组
                marginRatio: 0 // 分组中各个柱子之间不留空隙
              },
              {
                type: "stack"
              }
            ]}
            >       
          </Geom>
        </Chart>


        <br />

        <button onClick={() => {updateChartR(1)}}>dv.rows11</button>
      <button onClick={() => {updateChartR(2)}}>dv.rows22</button>


        <BizChartsRows a={[1]} b={[2]} dataSource={childSource} />

    </div>
  )
}

export default BizCharts;

