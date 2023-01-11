import { React , useCallback} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../css/Register.css";
import { Form, Input, InputNumber, Button, Card, Layout, message} from "antd";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";

const { Content } = Layout;

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
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const Register = () => {

  const navigate = useNavigate();

  const Login = useCallback(() => navigate('/login', {replace: false}), [navigate]);

  

  const onFinish = (values) => {
    const {user} = values;
    
    if(user.age<18){
      
      axios.post('https://freevbackend.onrender.com/register/register',user)
      .then(
        message.success('Login to continue'),
        navigate('/login',{replace:true})
      )
      .catch((err)=>{
        if(err.response.status === 409){
          message.warning("Email already registered!");
        }
      })
    }
    else{
      navigate('/verify',{state:user});
    }
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <HeaderComponent/> 
          <Content style={{ margin: "0 16px" }}>
            <Card size="larger" className="cardClass">
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={["user", "name"]}
                  label="Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
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
                <Input.Password/>
                </Form.Item>
                
                <Form.Item
                  name={["user", "age"]}
                  label="Age"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 99,
                    },
                  ]}>

                  <InputNumber />
                </Form.Item>
                
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>

                  <Button type="dashed" style={{marginLeft:10}} onClick={Login}> Or Login </Button>
                </Form.Item>

              </Form>
            </Card>
          </Content>

          <FooterComponent/> 
        </Layout>
      </Layout>
    </>
  );
};

export default Register;
