import {
    Divider
} from "@patternfly/react-core";
import React from "react";
import ApiKey from "../../../../components/settings/ApiKey";
import DeleteSpa from "../../../../components/settings/DeleteSpa";
import ManageSpa from "../../../../components/settings/ManageSpa";
import axios from "axios";

export const getStaticPaths = async () => {
    const host = process.env.HOST;
    const url = `${host}/webproperty/list`;
    const token: any = process.env.AUTHENTICATION_TOKEN;
    const res = await axios({
        method: "get",
        url: url,
        headers: {
            Authorization: token,
            rejectUnauthorized: false,
        },
    });
    const paths = res.data.data.map((property) => ({
        params: { propertyName: property.webPropertyName },
    }))
    return { paths, fallback: false }
}


export const getStaticProps = async (context) => {
    const propertyReq = context.params.propertyName;
    const host = process.env.HOST;
    const url = `${host}/webproperty/getspalist/${propertyReq}`;
    const token: any = process.env.AUTHENTICATION_TOKEN;

    const res = await axios({
        method: "get",
        url: url,
        headers: {
            Authorization: token,
            rejectUnauthorized: false,
        },
    });
    const response = [];
    const checkSpa = new Set();
    if (res) {
        const data = await res.data.data;
        for (let item of data) {
            let spas = item?.spa;
            for (let eachSpa of spas) {
                if (eachSpa?.spaName && !checkSpa.has(eachSpa.spaName.trim().replace(/^\/|\/$/g, ''))) {
                    checkSpa.add(eachSpa.spaName.trim().replace(/^\/|\/$/g, ''));
                    response.push({
                        spaName: eachSpa.spaName.trim().replace(/^\/|\/$/g, ''),
                        envs: eachSpa.envs,
                        contextPath: eachSpa.contextPath,
                        propertyName: item.webPropertyName,
                        createdAt: item.createdAt
                    });
                }
            }
        }
    }

    return {
        props: { webprop: response },
    };
};

export const UsingHr = () => (
    <Divider
        style={{
            border: "1px solid #D2D2D2;",
            opacity: 1,
        }}
    />
);

const Settings = ({ webprop }) => {
    return (
        <>
            <ManageSpa webprop={webprop}></ManageSpa>
            <br></br>
            <ApiKey></ApiKey>
            <br></br>
            <DeleteSpa></DeleteSpa>
        </>
    );
};

export default Settings;
