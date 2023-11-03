import React, { Component } from "react";
import { Button, Form, Input, notification, Flex } from "antd";
import _ from "lodash";

import { withRouter } from "../utils/withRouter";
import { compose } from "redux";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "../../css/login.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToRegister = () => {
    this.props.navigate("/register");
  };
  navigateToSearchWeather = () => {
    this.props.navigate("/weather");
  };

  onFinish = (values) => {
    var username = _.get(values, "username", "");
    var password = _.get(values, "password", "");

    this.props.authActions.login(username, password).then((resp) => {
      var err = _.get(resp, "error", "");

      if (!_.isEmpty(err)) {
        notification.error({
          message: "ERROR",
          description: err,
          duration: 2,
        });
      } else {
        notification.success({
          message: "SUCCESS",
          description: "Logged In Successfully",
          duration: 2,
        });

        setTimeout(() => {
          this.navigateToSearchWeather();
        }, 3000);
      }
    });
  };

  onFinishFailed = (errorInfo) => {
    // do something
  };

  render() {
    return (
      <div>
        <Flex gap="small" vertical className="form-container">
          <div className="centered-container">
            <h2>LOGIN</h2>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address.",
                  },
                ]}
              >
                <Input autoComplete="username" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 5, // Minimum length of 5 characters
                    message: "Password must be at least 5 characters long.",
                  },
                ]}
              >
                <Input.Password autoComplete="current-password" />
              </Form.Item>

              <Form.Item
                name="submitBtn"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            <Button
              name="registerBtn"
              type="primary"
              onClick={this.navigateToRegister}
            >
              Register
            </Button>
          </div>
        </Flex>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(LoginForm);
