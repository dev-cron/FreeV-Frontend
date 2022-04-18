import React from "react";
import { Layout } from "antd";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const props = {
  name: "file",
  action: "http://localhost:5000/datacheck",
  headers: {
   "Content-Type":"multipart/form-data", 
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function MyUpload() {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Cool video platform here for sharing videos freely and unrestricted
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default MyUpload;
