import { React, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { Layout, Card, Row, Col, Avatar, Space, Spin } from "antd";

import { SiderComponent } from "../components/SiderComponent";

import { FooterComponent } from "../components/FooterComponent";


const { Header, Content } = Layout;

const { Meta } = Card;

const Home = () => {
  const [Videos, setVideos] = useState([]);

  const loadVideos = async () => {
    try {
      await axios
        .get("http://localhost:5000/", {
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
          <Header className="site-layout-background" style={{ padding: 0 }} />

          <Content style={{ margin: "0 16px" }}>
            <div className="site-layout-content">
              <Row gutter={[16, 16]} justify={"space-between"}>
                {Videos.length === 0 ? (
                  <Space size="middle">
                    <Spin size="large" />
                  </Space>
                ) : (
                  Videos.map((item, index) => {
                    return (
                      <Link to={`/stream/${item.uuid}`}>
                        <Col className="gutter-row" span={4.5}>
                          <Card
                            className="card-class"
                            hoverable
                            style={{ width: 300 }}
                            cover={<img alt="example" src={item.img} />}
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
