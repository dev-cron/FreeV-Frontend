import { React, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { Layout, Card, Row, Col, Avatar, Space, Spin } from "antd";

import { SiderComponent } from "../components/SiderComponent";

import { FooterComponent } from "../components/FooterComponent";

import { HeaderComponent } from "../components/HeaderComponent";


const { Content } = Layout;

const { Meta } = Card;

const Home = () => {
  const [Videos, setVideos] = useState([]);

  const loadVideos = async () => {
    try {
      await axios
        .get("/home", {
          withCredentials: true,
        })
        .then((res) => {
          setVideos(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderComponent />

        <Layout className="site-layout">
            
          <HeaderComponent/>
          
          <Content style={{ margin: "20px 16px" }}>
            <div className="site-layout-content">
              <Row gutter={[16, 16]} justify={"space-between"}>
                {Videos.length === 0 ? (
                  <Space size="middle">
                    <Spin size="large" />
                  </Space>
                ) : (
                  Videos.map((item, index) => {
                    return (
                      <Link to={`/stream/${item.uuid}`} key={index}>
                        <Col className="gutter-row" span={4.5}>
                          <Card
                            className="card-class"
                            hoverable
                            style={{ width: 300 }}
                            cover={
                              <div style={{ overflow: "hidden", height: "250px"}}>
                                <img
                                  alt="example"
                                  style={{ height: "100%" , width:"100%" }}
                                  src={item.img}
                                />
                              </div>
                            }
                          >
                            <Meta
                              avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                              }
                              title={item.title}
                            />
                          </Card>
                        </Col>
                      </Link>
                    );
                  })
                )}
              </Row>
            </div>
          </Content>

          <FooterComponent />
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
