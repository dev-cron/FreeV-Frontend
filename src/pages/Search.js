import {React, useEffect} from "react";
import { Layout } from "antd";
import { useParams } from "react-router-dom";
import { SiderComponent } from "../components/SiderComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";
import axios from "axios";

const { Content } = Layout;


const Search = () => {
 
  const { query } = useParams();
  
  async function getSearch(q){
    const form = new URLSearchParams();
    form.append('query',query);
    await axios.get('http://localhost:5000/search',form)
    .then((res)=>{console.log(res)})
  }

  useEffect(()=>{
    getSearch(query);
  })

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

export default Search;