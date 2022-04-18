import { React , useCallback } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Card, Layout} from "antd";

const { Header, Content, Footer } = Layout;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const Login = () => {
    const navigate = useNavigate();

    const Register = useCallback(() => navigate('/reg', {replace: false}), [navigate]);

    const onFinish = (values) => {
        axios.post('/login',values).then(res=>{
           console.log(res); 
        });
    };


  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            
            
            <Card size="larger" className="cardClass">
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}>
                
                <Form.Item
                  name={["user", "email"]}
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                <Input />
                </Form.Item>
                
                <Form.Item
                  name={["user", "password"]}
                  label="Password" 
                >
                <Input />
                </Form.Item>
                
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button type="dashed" style={{marginLeft:10}} onClick={Register}> Or Register </Button>
                </Form.Item>

              </Form>
            </Card>
          </Content>

          
          <Footer style={{ textAlign: "center" }}>
            Cool video platform here for sharing videos freely and unrestricted{" "}
          </Footer>

        </Layout>
      </Layout>
    </>
  );
};

export default Login;
