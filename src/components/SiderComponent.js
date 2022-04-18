import {React,useState,useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Menu , Layout} from 'antd';
import {
    VideoCameraOutlined,
    UserOutlined,
    UploadOutlined
} from '@ant-design/icons';

const {Sider} = Layout;



export const SiderComponent = () => {

  const navigate = useNavigate();
  const [collapsed, setcollapsed] = useState(true);

  const onCollapse = () => {
    setcollapsed(!collapsed);
  };

  const Account = useCallback(() => navigate('/reg', {replace: false}), [navigate]);

  const Subscriptions = useCallback(() => navigate('/subs', {replace: false}), [navigate]);

  const Upload = useCallback(() => navigate('/upload', {replace: false}), [navigate]);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
    <div className="logo" />
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
  )
}
