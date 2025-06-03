// @ts-nocheck
import { CloseCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Result, Button, Typography } from "antd";
const { Paragraph, Text } = Typography;

import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }


    render() {
        if (this.state.hasError) {
            return <Result
                status="error"
                title="Something Went Wrong"
                subTitle="Please check and Reload the page"
                extra={[
                    <Button key="buy" type="primary" icon={<ReloadOutlined />}>Refresh Page</Button>,
                ]}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            className="text-base text-red-500"
                        >
                            {this.state.error.message}
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="mr-2" />
                        {this.state.error.stack}
                    </Paragraph>
                </div>
            </Result>;
        }

        return this.props.children;
    }
}