import {React, useEffect, useState} from "react";
import { Layout, Card, Row, Col, Empty, Avatar } from "antd";
import { useLocation, Link } from "react-router-dom";
import { SiderComponent } from "../components/SiderComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";
import axios from "axios";

const { Content } = Layout;
const { Meta } = Card;

const Search = () => {

  const [result, setresult] = useState([]);
 
  const location = useLocation();
  
  async function getSearch(q){
    await axios.get(`/search/${q}`)
    .then((res)=>{
      setresult(res.data);
      console.log(res.data)
      })
  }

  useEffect(()=>{
    getSearch(location.state.query);
  },[location.state.query]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
       <SiderComponent/> 

        <Layout className="site-layout">
          
         <HeaderComponent/>

          <Content style={{ margin: '20px 16px' }}>

          <Row gutter={[16, 16]} justify={"space-between"}>
                {
                  result.length === 0 ? ( <Empty/> ) : 
                  (
                  result.map((item,index) => {
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
          
          </Content>

          <FooterComponent/>
        </Layout>
      </Layout>
    </>
  );
};

export default Search;