import { React, useState } from "react";
import { SiderComponent } from "../components/SiderComponent";
import { FooterComponent } from "../components/FooterComponent";
import { Layout, Form, Button, Upload, Input, Switch, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import axios from "axios";
import { HeaderComponent } from "../components/HeaderComponent";

const suid = require('short-unique-id');

const { Content } = Layout;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

async function videoUpload(values,uuid){

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
    withCredentials:true
  };

  const videoData = new FormData();
  videoData.append('title',uuid);
  videoData.append('video',values.video);
  await axios.post('/upload-video',videoData,config);
}

function MyUpload() {
  const navigate = useNavigate();
  const [Image, setImage] = useState("");

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    
    if(!values.nsfw){
      values.nsfw = "false";
    }

    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      withCredentials:true
    };
   
    const uuid = new suid({length:7});
    const videoID = uuid();

    const formData = new URLSearchParams();
    formData.append("title",values.title);
    formData.append("image",Image);
    formData.append("nsfw",values.nsfw);
    formData.append("uuid",videoID);


    await axios.post('/upload-data', formData, config)
    .then(
        videoUpload(values,videoID)
    )
    .then(res=>message.success(res.data))
    .then(()=>{navigate('/',{replace:true})})
  
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderComponent />
        <Layout className="site-layout">
          <HeaderComponent/> 
          <Content style={{ margin: "20px 16px" }}>
            
            <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
              <Form.Item name="title" label="Title">
                <Input />
              </Form.Item>
              
              <Form.Item
                name="Thumbnail"
                label="Thumbnail"
              > 
                <FileBase64
                multiple={ false }
                onDone={({base64})=>{setImage(base64)}}/>
              </Form.Item>

              <Form.Item label="Video">
                <Form.Item
                  name="video"
                  getValueFromEvent={({file}) => file.originFileObj}
                  noStyle
                >
                  <Upload.Dragger 
                  name="video" 
                  maxCount={1} 
                  accept="video/mp4"
                  customRequest={dummyRequest}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>

              <Form.Item name="nsfw" label="NSFW" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Content>
          <FooterComponent />
        </Layout>
      </Layout>
    </>
  );
}

export default MyUpload;
