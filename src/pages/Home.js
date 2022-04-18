import { React, useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { Buffer } from "buffer";

import { Layout, Card, Row, Col, Avatar } from "antd";

import { SiderComponent } from "../components/SiderComponent";

import { FooterComponent } from "../components/FooterComponent";

import "../css/Home.css";


const { Header, Content } = Layout;

const { Meta } = Card;

const Home = () => {
  const imgSrc = useRef();

  const images = [];

  const [videos, setvideos] = useState([]);

  const loadVideos = async () => {
    await axios.get("http://localhost:5000/").then((res) => {
      setvideos(res.data[0]);
      console.log(res.data[0]);
    });
  };

  // function imgData(src){
  //   return Buffer.from(src).toString("base64");
  // }
  
  function loadimagedata() {
    videos.forEach((item) => {
      images.push(
        `data:image/jpeg;base64,${Buffer.from(item.img.data.data).toString(
          "base64"
        )}`
      );
    });
  }

  useEffect(() => {
    console.log("useeffectworking");
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
              
              {videos.length===0?<h1>wait....</h1>:videos.map((item,index)=>{
               
              loadimagedata();
              return (
                

                <Link to={`/stream/${1}`}>

                <Col className="gutter-row" span={4.5}>

                <Card className="card-class"

                  hoverable

                  style={{ width: 300}}

                  cover={

                    <img

                      alt="example"

                      src={images[index]}

                    />
                  }
                >
                  <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={item.title}/>
                </Card>
                </Col>
                </Link>
          );})}

                {/* {videos.length === 0 ? (
                  <h1>wait....</h1>
                ) : (
                  videos.map((item, index) => {
                    loadimagedata();
                    console.log(images);
                    return (
                      <>
                      <img src={images[index]} alt="img"/>
                      </>
                    );
                  })
                )} */}
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
