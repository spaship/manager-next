import {
    Divider
} from "@patternfly/react-core";
import React from "react";
import ApiKey from "../../../../components/settings/ApiKey";
import DeleteSpa from "../../../../components/settings/DeleteSpa";
import ManageSpa from "../../../../components/settings/ManageSpa";
import { get, post } from "../../../../utils/APIUtil";

export interface DataPoint {
    count?: any;
    spaName: any;
    envs: any;
    contextPath: any;
    propertyName: any;
    createdAt: any;
}

export const getStaticPaths = async () => {
    const host = getHost();
    const url = `${host}/webproperty/list`;
    const propertyListResponse = await get<any>(url);
    const paths = propertyListResponse.map((property: any) => ({
        params: { propertyName: property.webPropertyName },
    }))
    return { paths, fallback: false }
}

export const getStaticProps = async (context : any) => {
    const propertyReq = getPropertyRequest(context);
    const host = getHost();
    const urlList = `${host}/webproperty/getspalist/${propertyReq}`;
    const response = await get<any>(urlList);
    let listResponse : DataPoint[] = [];
    const checkSpa = new Set();
    if (response) {
        const data = await response;
        listResponse = processProperties(data, checkSpa, listResponse);
    }
    return {
        props: { webprop: listResponse },
    };
};

const SettingsPage = ({ webprop } : any) => {
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

export default SettingsPage;

function getHost() {
    return process.env.HOST;
}

function getPropertyRequest(context: any) {
    return context.params.propertyName;
}

function getSpaName(eachSpa: any): string {
    return eachSpa?.spaName.trim().replace(/^\/|\/$/g, '') || null;
}

function processProperties(data: any, checkSpa: Set<any>, response: any[]) {
    for (let item of data) {
        let spas = item?.spa;
        for (let eachSpa of spas) {
            const reqSpaName = getSpaName(eachSpa);
            if (eachSpa?.spaName && !checkSpa.has(reqSpaName)) {
                checkSpa.add(reqSpaName);
                response.push({
                    spaName: reqSpaName,
                    envs: eachSpa.envs,
                    contextPath: eachSpa.contextPath,
                    propertyName: item.webPropertyName,
                    createdAt: item.createdAt
                });
            }
        }
    }
    return response;
}


