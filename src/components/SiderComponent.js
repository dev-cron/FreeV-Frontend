import {React,useState,useCallback} from 'react';
import Cookies from 'js-cookie';
import {useNavigate , Link} from 'react-router-dom';
import {Menu , Layout} from 'antd';
import {
    VideoCameraOutlined,
    UserOutlined,
    UploadOutlined
} from '@ant-design/icons';
import bigLogo from '../assets/bigfreev.png';
import smolLogo from '../assets/smolfreev.png';
import '../css/Sider.css';

const {Sider} = Layout;



export const SiderComponent = () => {

  const navigate = useNavigate();
  const [collapsed, setcollapsed] = useState(false);

  const onCollapse = () => {
    setcollapsed(!collapsed);
  };

  const Account = useCallback(() => navigate('/login', {replace: false}), [navigate]);

  const Subscriptions = useCallback(() => navigate('/subs', {replace: false}), [navigate]);

  const Upload = () => {
    const Cookie = Cookies.get('isUser');
    console.log(Cookie);
    if(Cookie === '1'){navigate('/upload', {replace: false});}
    else navigate('/login',{replace:true});
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
    <Link to="/"><div className="logo">
      {collapsed?<img src={smolLogo} alt="logo"/>:<img src={bigLogo} alt="logo"/>}
    </div></Link>
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
