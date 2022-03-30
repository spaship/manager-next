import {
    Divider, PageSection,
} from "@patternfly/react-core";
import React from "react";
import ActivityStream from "../../../components/web-property/ActivityStream";
import SpaProperty from "../../../components/web-property/SpaProperty";
import { useRouter } from 'next/router'
import axios from "axios";

export const UsingHr = () => (
    <Divider
        style={{
            border: "1px solid #D2D2D2;",
            opacity: 1,
        }}
    />
);

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
    const token: any = process.env.AUTHENTICATION_TOKEN;
    const url = `${host}/webproperty/getspalist/${propertyReq}`;
    const res = await axios({
        method: "get",
        url: url,
        headers: {
            Authorization: token,
            rejectUnauthorized: true,
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
    const data = await response;

    const urlActivites = `${host}/event/fetch/analytics/filter`;
    const resActivites = await axios({
        method: "post",
        url: urlActivites,
        headers: {
            Authorization: token,
            rejectUnauthorized: true,
        },
        data: {
            "activities": {
                "propertyName": propertyReq
            }
        }
    });


    const urlCount = `${host}/event/fetch/analytics/filter`;
    const resCount = await axios({
        method: "post",
        url: urlCount,
        headers: {
            Authorization: token,
            rejectUnauthorized: true,
        },
        data: {
            "count": {
                "propertyName": "one.redhat.com"
            }
        }
    });
    const deploymentCountData = resCount.data.data;

    for (let i in data) {
        let obj = deploymentCountData.find(o => o.spaName === data[i].spaName);
        data[i].count = obj?.count || 0;
    }

    return {
        props: { webprop: data, activites: resActivites.data.data },
    };
};

const WebPropertyComponent = ({ webprop, activites }) => {

    return (
        <>
            <PageSection isFilled>
                <SpaProperty webprop={webprop}></SpaProperty>
                <br></br>
                <ActivityStream webprop={activites}></ActivityStream>
            </PageSection>
        </>
    );
};

export default WebPropertyComponent;
