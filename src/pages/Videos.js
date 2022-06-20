import React from "react";

import { Layout, Row } from "antd";

import { SiderComponent } from "../components/SiderComponent";

import { FooterComponent } from "../components/FooterComponent";

import { useParams } from "react-router-dom";

const { Header, Content } = Layout;

export const Videos = () => {
  
  const { param } = useParams();
  
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderComponent />

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />

          <Content style={{ margin: "0 16px" }}>
            <div className="site-layout-content">
              <Row gutter={[16, 16]} justify={"space-between"}>
                <video
                  id="videoPlayer"
                  width="750"
                  height="550"
                  controls
                  autoPlay  
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
