import { React, useEffect, useRef } from "react";

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
  const images = [];

  const videos = useRef([]);

  const loadVideos = async () => {

   try{
      await axios.get('http://localhost:5000/',{
      withCredentials:true
    }).then((res)=>{
      console.log(res.data);
      videos.current = res.data;
      console.log(videos);
    })
   }
   catch(err){
     console.log(err);
   } 
  };

  function loadimagedata() {
    videos.current.forEach((item) => {
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
  }, [videos]);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderComponent />

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />

          <Content style={{ margin: "0 16px" }}>
            <div className="site-layout-content">
              <Row gutter={[16, 16]} justify={"space-between"}>
              
              {videos.current.length===0?<h1>wait....</h1>:videos.current.map((item,index)=>{
               
              loadimagedata();
              console.log(videos.current);
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
