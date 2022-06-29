import {React} from "react";

import { Layout } from "antd";
import { SiderComponent } from "../components/SiderComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";

const { Content } = Layout;


const userVideos = () => {
  
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
       <SiderComponent/> 

        <Layout className="site-layout">
          
         <HeaderComponent/>

          <Content style={{ margin: '0 16px' }}>
          
          </Content>

          <FooterComponent/>
        </Layout>
      </Layout>
    </>
  );
};

export default userVideos;