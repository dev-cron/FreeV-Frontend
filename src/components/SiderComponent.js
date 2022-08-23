import {React,useState,useCallback} from 'react';
import Cookies from 'js-cookie';
import {useNavigate , Link} from 'react-router-dom';
import {Menu , Layout} from 'antd';
import {
    UserOutlined,
    UploadOutlined,
    PlaySquareOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    HomeOutlined
} from '@ant-design/icons';
import bigLogo from '../assets/bigfreev.png';
import smolLogo from '../assets/smolfreev.png';
import '../css/Sider.css';
import SubMenu from 'antd/lib/menu/SubMenu';
import axios from 'axios';

const {Sider} = Layout;



export const SiderComponent = () => {

  const navigate = useNavigate();
  const [collapsed, setcollapsed] = useState(false);

  const onCollapse = () => {
    setcollapsed(!collapsed);
  };


  const Home = useCallback(() => navigate('/', {replace: true}), [navigate]);

  const userVideos = useCallback(() => navigate('/userVideos', {replace: false}), [navigate]);

  const SignIn = useCallback(() => navigate('/login', {replace: false}), [navigate]); 

  const User = Cookies.get('isUser');

  const Upload = () => {
    if(User !== 'Sign In'){navigate('/upload', {replace: false});}
    else navigate('/login',{replace:true});
  }

  const logout = async () => {
    try {
      await axios
        .get("/logout")
        .then(() => window.location.reload());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
    <Link to="/"><div className="logo">
      {collapsed?<img src={smolLogo} alt="logo"/>:<img src={bigLogo} alt="logo"/>}
    </div>
    </Link>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      {User === 'Sign In'?
      <Menu.Item key="1" icon={<UserOutlined />} title="User" onClick={SignIn}>
        Sign In
      </Menu.Item> :
      <SubMenu key="sub1" title={<span><AppstoreOutlined/><span>{User}</span></span>}>
            <Menu.Item key="3" icon={<HomeOutlined/>} onClick={Home}>Home</Menu.Item>
            <Menu.Item key="4" icon={<PlaySquareOutlined/>} onClick={userVideos}>Your videos</Menu.Item>
            <Menu.Item key="5" icon={<LogoutOutlined/>} onClick={logout}>Logout</Menu.Item>
        </SubMenu>}
      <Menu.Item key="2" icon={<UploadOutlined />} onClick={Upload}>
        Upload 
      </Menu.Item>
    </Menu>
  </Sider>
  )
}
