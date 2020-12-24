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
  
  //接收props 
  console.log(props)
  const {dataSource} = props  //接收数据解耦

  const { DataView } = DataSet;  
  const [dv, setData] = useState(new DataView());// null 默认参数可以吗？
//   const [charts,setChartsR] = useState(dataSource) //不能用这个  直接用props 传递不能用useState 来存储 否则会有问题？

   //test props 数组组装或者增加 
   //改造源数据结构组装 
   const newDataSource = dataSource.slice(0)
   newDataSource.push({
        State: "newxxxx",
        "Under 5 Years": 358280,
        "5 to 13 Years": 587154,
        "14 to 17 Years": 261701,
        "18 to 24 Years": 466194,
        "25 to 44 Years": 1464939,
        "45 to 64 Years": 1290094,
        "65 Years and Over": 511094
   })
   console.log('newDataSource',newDataSource)
   //增加一个数组？
 

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
    ds.source(newDataSource)
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
    // console.log('当前type-data',charts)

    setData(ds)

  }, [props])

 

  return (
    <div>
      
      <hr />



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