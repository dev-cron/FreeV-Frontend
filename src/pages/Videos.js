import React from "react";

import { Layout, Row } from "antd";

import { SiderComponent } from "../components/SiderComponent";

import { FooterComponent } from "../components/FooterComponent";

import { useParams } from "react-router-dom";
import { HeaderComponent } from "../components/HeaderComponent";

const { Content } = Layout;

export const Videos = () => {
  
  const { param } = useParams();
  
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderComponent />

        <Layout className="site-layout">
        <HeaderComponent/> 

          <Content style={{ margin: "16px 16px" }}>
            <div className="site-layout-content">
              <Row gutter={[16, 16]} justify={"space-between"}>
                <video
                  id="videoPlayer"
                  width="750"
                  height="550"
                  controls
                  autoPlay 
                  style={{border:"1px solid #000000"}}
                >
                  <source src={`/mongo-video/${param}`} type="video/mp4" />
                </video>
              </Row>
            </div>
          </Content>

          <FooterComponent />
        </Layout>
      </Layout>
    </>
  );
};
