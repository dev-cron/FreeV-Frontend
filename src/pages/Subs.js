import {React , useState , useCallback} from "react";
import { useNavigate } from "react-router-dom";

import { Menu, Layout } from "antd";
import { VideoCameraOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


const Subs = () => {
  const navigate = useNavigate();
  const [collapsed, setcollapsed] = useState(true);

  const onCollapse = () => {
    setcollapsed(!collapsed);
  };

  const Account = useCallback(() => navigate('/reg', {replace: true}), [navigate]);

  const Subscriptions = useCallback(() => navigate('/subs', {replace: false}), [navigate]);

  const Upload = useCallback(() => navigate('/upload', {replace: false}), [navigate]);


  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          

          <div className="logo" />  { /* logo will go here */ }


          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />} title="User" onClick={Account}>
              Account 
            </Menu.Item>
            <Menu.Item key="2" icon={<UploadOutlined />} onClick={Upload}>
              Upload 
            </Menu.Item>
            <Menu.Item key="9" icon={<VideoCameraOutlined />} onClick={Subscriptions}>
              Subscriptions
            </Menu.Item>
          </Menu>
        </Sider>


        <Layout className="site-layout">
          
          <Header className="site-layout-background" style={{ padding: 0 }} />
          
          <Content style={{ margin: '0 16px' }}>
          
          </Content>


          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Subs;