import { React , useCallback , useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../css/Register.css";
import { Form, Input, InputNumber, Button, Card, Layout} from "antd";

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
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const Register = () => {

  const [data, setdata] = useState([]);

  const navigate = useNavigate();

  const Login = useCallback(() => navigate('/login', {replace: false}), [navigate]);

  

  const onFinish = (values) => {
    console.log(values);
    setdata(values);
    if(values.user.age>18){
      //do normal login
      console.log("less than 18 fired");
      axios.post('/register',values)
      .then(
        alert("Now login to continue")
      );
    }
    else{
      navigate('/verify',{state:{data}});
    }
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
                <Input />
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

          <Footer style={{ textAlign: "center" }}>
            Cool video platform here for sharing videos freely and unrestricted
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Register;
