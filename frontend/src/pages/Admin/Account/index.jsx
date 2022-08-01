import React from "react";
import { Button, Input, Tabs } from "antd";
import Info from "./Info";
import ChangePassword from "./ChangePassword";

export default function UserAccount() {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Thông tin chung" key="1">
        <Info />
      </TabPane>
      <TabPane tab="Đổi mật khẩu" key="2">
        <ChangePassword />
      </TabPane>
    </Tabs>
  );
}
