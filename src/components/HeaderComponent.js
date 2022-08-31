import React from 'react'
import { Layout, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';


const { Header } = Layout;
const { Search } = Input;

const css = {
    display:'flex',
    justifyContent:'flex-end',
    paddingTop:'15px' 
};


export const HeaderComponent = () => {

  const navigate = useNavigate();

  const onSearch = (value)=>{
    if(value===""){
      message.error("search can not be empty");
    }
    else navigate(`/search/${value}`,{state:{query:value}}); 
  }

  return (
    <Header className="site-layout-background" style={css}>
     <Search placeholder="Search" onSearch={onSearch} enterButton style={{
        width: 250,
      }}/>
    </Header>
  )
}
