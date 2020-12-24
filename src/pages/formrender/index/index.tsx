import React, { useState } from 'react';

// import Cascade from './Cascade.tsx';

import Cascade from './Cascade';

// import './index.less';
// 使用 Ant Design 体系
import FormRender from 'form-render/lib/antd';
import 'antd/dist/antd.css';
// 使用 Fusion Design 体系
// import "@alifd/next/dist/next.min.css";
// import FormRender from "form-render/lib/fusion";

const propsSchema = {
  type: 'object',
  properties: {
    name: {
      title: '姓名',
      type: 'string',
      'ui:width': '100%', // uiSchema 可以合并到 propsSchema 中（推荐写法，书写便捷）
    },
    sex: {
      title: '性别',
      type: 'string',
      enum: ['男', '女'],
    },
    company: {
      title: '工作单位名称',
      type: 'string',
    },
    jobNumber: {
      title: '数字',
      type: 'number',
    },
    select: {
      title: '单选',
      type: 'string',
      enum: () => ['a', 'b', 'c'],
      'ui:disabled': '{{rootValue.input1.length > 5}}',
    },
    input1: {
      title: '输入框',
      type: 'string',
      'ui:hidden': "{{formData.select === 'b'}}",
    },
    provice: {
      title: '工作地址',
      'ui:widget': 'cascade',
    },
  },
};

// 也可以选择单独使用 uiSchema 字段分开定义所有的 ui 属性，适用于遵循 json schema 的团队无缝接入
const uiSchema = {
  select: {
    'ui:disabled': false,
  },
};

function FormRenderJsonScheme() {
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      console.log(JSON.stringify(formData, null, 2));
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div style={{ padding: 60 }}>
      <FormRender
        propsSchema={propsSchema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={setData}
        onValidate={setValid}
        widgets={{ cascade: Cascade }}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}

export default FormRenderJsonScheme;
