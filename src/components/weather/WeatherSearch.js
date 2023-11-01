import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import _ from "lodash";
import { Input, Button, Table, Pagination, Flex, notification } from "antd";

import * as weatherActions from "../../actions/weatherActions";
import { withRouter } from "../utils/withRouter";
import * as WEATHER_CONSTANTS from "../../constants/weather";
import "../../css/weather_component.css";

class WeatherSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        user_id: 1,
      },
      pagination: {
        pageNo: 1,
        pageLen: 5,
      },
      weatherHistoryList: [],
      selectedRowKeys: [],
      currentSearchedWeather: [],
    };
  }

  componentDidMount() {
    // sets user datails from props to component state
    this.setUserDetails();
    this.getWeatherHistory();
  }

  rowSelection = {
    type: "checkbox",
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({ ...this.state, selectedRowKeys: selectedRowKeys });
    },
  };

  setUserDetails = () => {
    var userData = _.get(this.props.user, "data", {});
    this.setState(() => {
      return {
        ...this.state,
        user: { ...this.state.user, ...userData },
      };
    });
  };

  navigateToLogin = () => {
    notification.warning({
      message: "ALERT",
      description: "LOGGING OUT",
      duration: 2,
    });

    setTimeout(() => {
      this.props.navigate("/login");
    }, 2000);
  };

  getWeatherHistory = () => {
    var pagination = this.state.pagination;
    var user = _.get(this.props.user, "data", {});
    var token = _.get(user, "Authorization", "");
    var userID = _.get(user, "user_id", "");

    if (_.isEmpty(token)) {
      notification.error({
        message: "ERROR",
        description: "Token is empty , Kindly Logout & then Login",
        duration: 2,
      });

      return;
    }

    this.props.weatherActions
      .fetchHistoricalWeather(
        pagination.pageNo,
        pagination.pageLen,
        userID,
        token
      )
      .then(() => {
        this.updateStateWeatherHistoryList();
      });
  };

  handlePageChange = (page) => {
    this.setState(
      () => {
        return {
          ...this.state,
          pagination: {
            ...this.state.pagination,
            pageNo: page,
          },
        };
      },
      () => {
        this.getWeatherHistory();
      }
    );
  };

  bulkDeleteHistoryRecords = () => {
    var user = this.state.user;
    var token = _.get(user, "Authorization", "");
    if (_.isEmpty(token)) {
      notification.error({
        message: "ERROR",
        description: "Token is empty , Kindly Logout & then Login",
        duration: 2,
      });

      return;
    }

    this.props.weatherActions
      .bulkDeleteWeatherHistory(this.state.selectedRowKeys, token)
      .then((resp) => {
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

          this.getWeatherHistory();
        }
      });
  };

  updateStateWeatherHistoryList = () => {
    var weatherHistoryList = _.get(this.props.historicalWeather, "data", []);
    weatherHistoryList = _.map(weatherHistoryList, (record) => {
      var weatherDataStr = _.get(record, "weather_data", "{}");
      var weatherDataObj = JSON.parse(weatherDataStr);
      var mainWeatherDataObj = _.get(weatherDataObj, "main", {});
      var mainWeatherDataStr = JSON.stringify(mainWeatherDataObj);
      return { ...record, weather_data: mainWeatherDataStr };
    });

    this.setState(() => {
      return {
        ...this.state,
        weatherHistoryList: weatherHistoryList,
      };
    });
  };

  onSearch = (value) => {

    if (_.isEmpty(value)) {
      notification.error({
        message: "ERROR",
        description: "City name cannot be empty",
        duration: 2,
      });
      return 
    } 

      var user = this.state.user;
      var token = _.get(user, "Authorization", "");

      if (_.isEmpty(token)) {
        notification.error({
          message: "ERROR",
          description: "Token is empty , Kindly Logout & then Login",
          duration: 2,
        });

        return;
      }

      this.props.weatherActions
        .fetchCurrentWeather(this.state.user.user_id, value, token)
        .then((resp) => {
          var error = _.get(resp, "error", "");
          if (!_.isEmpty(error)) {
            notification.error({
              message: "ERROR",
              description: error,
              duration: 2,
            });
            return;
          }

          var weatherDataStr = _.get(resp, "data", "{}");
          var weatherDataObj = JSON.parse(weatherDataStr);
          var mainWeatherDataObj = _.get(weatherDataObj, "main", {});
          var mainWeatherDataObjWithCity = {
            ...mainWeatherDataObj,
            city_name: value,
          };

          this.setState(() => {
            return {
              ...this.setState,
              currentSearchedWeather: [mainWeatherDataObjWithCity],
            };
          });

          this.getWeatherHistory();
        });
 
  };

  render() {
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.navigateToLogin}>
            LOGOUT
          </Button>
        </div>
        <div className="search-container">
          <Input.Search
            placeholder="search weather by city name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={this.onSearch}
          />
        </div>

        <div>
          <h2>Latest Weather Search</h2>
          <Table
            dataSource={this.state.currentSearchedWeather}
            columns={WEATHER_CONSTANTS.CurrentWeatherTableColumns}
            rowKey={(idx, record) => {
              return idx;
            }}
            pagination={false}
          />
        </div>

        <div>
          <h2>Historical Weather Search</h2>
          <Table
            dataSource={this.state.weatherHistoryList}
            columns={WEATHER_CONSTANTS.WeatherHistoryTableColumns}
            rowKey={(record) => {
              return record.id;
            }}
            pagination={false}
            rowSelection={this.rowSelection}
          />

          <Flex gap="small" wrap="wrap" style={{ marginTop: "16px" }}>
            <Pagination
              current={this.state.pagination.pageNo}
              total={30} // Total number of historical records
              pageSize={this.state.pagination.pageLen}
              onChange={this.handlePageChange}
            />
            {this.state.selectedRowKeys.length > 0 && (
              <Button type="primary" onClick={this.bulkDeleteHistoryRecords}>
                Delete
              </Button>
            )}
          </Flex>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    historicalWeather: state.weather.historicalWeather,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    weatherActions: bindActionCreators(weatherActions, dispatch),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(WeatherSearch);
