import { Descriptions as DescriptionsAntd, DescriptionsProps as DescriptionsPropsAntd } from "antd";
import { FunctionComponent } from "react";

const { Item } = DescriptionsAntd;

export interface DescriptionsProps extends DescriptionsPropsAntd {
    title?: string | React.ReactNode
    disabledAnimation?: boolean
}

export const Descriptions: FunctionComponent<DescriptionsProps> = (props) => {
    return (
        <DescriptionsAntd
            key='DescriptionsAntd'
            size="small"
            bordered
            title={props.title}
            className={`${props.disabledAnimation ? '' : 'animate__animated animate__fadeInUp animate__faster'}`}
            layout={props.layout}
            {...props}
        >
            {props.children}
        </DescriptionsAntd>
    );
}

export interface DescriptionsItemProps {
    label?: string | React.ReactNode;
    span?: number,
    children?: React.ReactNode
}
export const DescriptionsItem: FunctionComponent<DescriptionsItemProps> = (props) => {
    return (
        <Item
            key='DescriptionsItem'
            label={props.label}
            span={props.span}
        >
            {props.children}
        </Item>
    );
}