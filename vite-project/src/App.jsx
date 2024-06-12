import React from 'react';
import './App.css';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { data } from './Domain.json';

const items = data.map((ele, index) => {
  const hasLongtermChildren = Array.isArray(ele.longtermdata) && ele.longtermdata.length > 0;
  
  const longtermChildren = hasLongtermChildren ? ele.longtermdata.map((chil, childIndex) => {
    const hasShorttermChildren = Array.isArray(chil.shorttermdata) && chil.shorttermdata.length > 0;
    
    const shorttermChildren = hasShorttermChildren ? chil.shorttermdata.map((shortchil, shortchilIndex) => ({
      key: `childshort-${index}-${childIndex}-${shortchilIndex}`,
      label: shortchil.name,
    })) : undefined;

    return {
      key: `child-${index}-${childIndex}`,
      label: chil.name,
      ...(hasShorttermChildren && { children: shorttermChildren }),
    };
  }) : undefined;

  return {
    label: ele.name,
    key: `parent-${index}`,
    ...(hasLongtermChildren && { children: longtermChildren }),
  };
});

const App = () => {
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Click me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default App;
