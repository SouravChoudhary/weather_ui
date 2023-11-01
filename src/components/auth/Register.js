import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import _ from "lodash";
import moment from "moment";
import { Button, Form, Input, notification, Flex } from "antd";

import * as authActions from "../../actions/authActions";
import { withRouter } from "../utils/withRouter";

import "../../css/login.css";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      dob: "",
    };
  }
  navigateToLogin = () => {
    this.props.navigate("/login");
  };

  onFinish = (values) => {
    var username = _.get(values, "username", "");
    var password = _.get(values, "password", "");
    var dob = _.get(values, "date_of_birth", "");
    this.props.authActions.register(username, password, dob).then((resp) => {

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
          description: _.get(resp, "data", ""),
          duration: 2,
        });
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
            <h2>REGISTRATION</h2>
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
                <Input />
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
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Date Of Birth"
                name="date_of_birth"
                rules={[
                  {
                    required: true,
                    validator: (rule, value) => {
                      return new Promise((resolve, reject) => {
                        const dateOfBirth = moment(value, "YYYY-MM-DD");
                        const today = moment();

                        if (
                          dateOfBirth.isValid() &&
                          dateOfBirth.isSameOrBefore(today, "day")
                        ) {
                          resolve();
                        } else {
                          reject(
                            "DOB must be in 'YYYY-MM-DD' format and cannot be a future date."
                          );
                        }
                      });
                    },
                  },
                ]}
              >
                <Input placeholder="DOB in YYYY-MM-DD" />
              </Form.Item>

              <Form.Item
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
            <Button type="primary" onClick={this.navigateToLogin}>
              Go To Login
            </Button>
          </div>
        </Flex>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(RegistrationForm);
