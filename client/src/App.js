import WebcamComponent from './WebcamComponent';
import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Typography } from 'antd';
import { Card } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const items1 = ['Translate!'].map((key) => ({
  key,
  label: `${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App = () => {
  const [translation, setTranslation] = useState([]);
  
  const handleResponse = (response) => {
    // Update state with response data
    setTranslation(response);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Title style={{width:'15%', marginTop: '1%', color: 'white'}}>Transl-AI-tor</Title>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Let's</Breadcrumb.Item>
          <Breadcrumb.Item>Translate</Breadcrumb.Item>
          <Breadcrumb.Item>Together</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={400}
          >
            <Card
              title={<Title level={3} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>English Translation <SoundOutlined style={{marginLeft: '20px', marginTop: '5px'}}/></Title>}
              bordered={false}
              style={{
                margin: 'auto'
              }}>
              {translation.map((item, index) => (
                <center><Title level={4} key={index} style={{color: 'darkgreen'}}>{item}</Title></center>
              ))}
            </Card>
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 500,
            }}
          >
            <WebcamComponent handleResponse={handleResponse} />
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Created by <a href='https://www.linkedin.com/in/emaankhan/'>Emaan Khan</a>
      </Footer>
    </Layout>
  );
};
export default App;