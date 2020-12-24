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

//这个是子组件 通过chart 传递props 渲染
const BizChartsRows: React.FC<{}> = (props) => {
  const { DataView } = DataSet;  
  const [dv, setData] = useState(new DataView());// null 默认参数可以吗？
  const [charts,setChartsR] = useState([
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
  ])

  const ages = [
    "Under 5 Years",
    "5 to 13 Years",
    "14 to 17 Years",
    "18 to 24 Years",
    "25 to 44 Years",
    "45 to 64 Years",
    "65 Years and Over"
  ];

  const colorMap = {
    "Under 5 Years": "#E3F4BF",
    "5 to 13 Years": "#BEF7C8",
    "14 to 17 Years": "#86E6C8",
    "18 to 24 Years": "#36CFC9",
    "25 to 44 Years": "#209BDD",
    "45 to 64 Years": "#1581E6",
    "65 Years and Over": "#0860BF"
  };
  const cols = {
    population: {
      tickInterval: 1000000
    }
  };


//https://bizcharts.net/product/bizcharts/demo/26
  useEffect(() => {
    //chart mvvm 存在 需要改变 ?
    //编译器 卡死 ？ let ds = dv.source(charts);ds.sources(charts). ..... 不重新渲染
    //重新new 一个 解决溢出问题 

        // //bug way 
    // let ds = dv.source(charts)

    //way1
    let ds = new DataView();
    ds.source(charts)
    .transform({
        type: "fold",
        fields: ages,
        key: "age",
        value: "population",
        retains: ["State"]
      })
      .transform({
        type: "map",
        callback: obj => {
          const key = obj.age;
          let type;

          if (
            key === "Under 5 Years" ||
            key === "5 to 13 Years" ||
            key === "14 to 17 Years"
          ) {
            type = "a";
          } else if (key === "18 to 24 Years") {
            type = "b";
          } else if (key === "25 to 44 Years") {
            type = "c";
          } else {
            type = "d";
          }

          obj.type = type;
          return obj;
        }
      });

    //改变实例  这里需要改变数据 来测试chart 重绘  ？么有效果
    //切换type 没有改变？chart 
    //俩会切换 就有问题 应该是实例数据没有更新
    console.log('当前type-data',charts)

    setData(ds)

  }, [charts])

 
  const updateChartR = (num: number): void => {
    if(num == 1) {
      setChartsR([
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
      setData(dv)
    }
    if(num == 2){
      setChartsR([{
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
      
      <hr />


      <button onClick={() => {updateChartR(1)}}>dv.rows11</button>
      <button onClick={() => {updateChartR(2)}}>dv.rows22</button>


      <Chart
          data={dv.rows}
          height={400}
          scale={cols}
          padding={[20, 160, 80, 60]}
          autoFit
        >
          <Axis
            name="population"
            label={{
              formatter: function(val) {
                return val / 1000000 + "M";
              }
            }}
          />
          <Legend position="right" />
          <Tooltip />
          <Geom
            type="interval"
            position="State*population"
            color={[
              "age",
              function(age) {
                return colorMap[age];
              }
            ]}
            tooltip={[
              "age*population",
              (age, population) => {
                return {
                  name: age,
                  value: population
                };
              }
            ]}
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
          />
        </Chart>

    </div>
  )
}

export default BizChartsRows;