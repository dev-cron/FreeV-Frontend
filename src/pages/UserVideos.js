import {React, useEffect, useState} from "react";
import axios from "axios";

import { Layout , Row, Col, Card, Empty } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SiderComponent } from "../components/SiderComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";

const { Content } = Layout;
const { Meta } = Card;

const Uservideos = () => {

  const [videos, setvideos] = useState([]);
  
  async function getData(){
    await axios.get('https://freevbackend.onrender.com/videos',{
      withCredentials:true
    })
    .then((obj)=>{
      console.log(obj.data);
      setvideos(obj.data);
    })
  };

  useEffect(()=>{
    getData();
  },[])

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
       <SiderComponent/> 

        <Layout className="site-layout">
          
         <HeaderComponent/>

          <Content style={{ margin: '20px 16px' }}>

          <Row gutter={[16, 16]} justify={"space-between"}>
                {
                  videos.length === 0 ? ( <Empty/> ) : 
                  (
                  videos.map((item) => {
                    return (
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
                            actions={[
                              <EditOutlined key="edit"/>,
                              <DeleteOutlined key="setting"/>,
                            ]}
                            >
                            <Meta 
                              title={item.title}
                            />
                          </Card>
                        </Col>
                    );
                  })
                )}
              </Row>
          
          </Content>

          <FooterComponent/>
        </Layout>
      </Layout>
    </>
  );
};

export default Uservideos;