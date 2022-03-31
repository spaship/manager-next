import {
    Divider, PageSection
} from "@patternfly/react-core";
import React from "react";
import ActivityStream from "../../../components/web-property/ActivityStream";
import SpaProperty from "../../../components/web-property/SpaProperty";
import { get, post } from "../../../utils/APIUtil";
import styled from 'styled-components';

export const DividerComp = styled.footer`
  border-top: 1px solid var(--spaship-global--Color--bright-gray);
  width: 60vw;
`;
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

export const getStaticProps = async (context: any) => {
    const propertyReq = getPropertyRequest(context);
    const host = getHost();
    const urlList = `${host}/webproperty/getspalist/${propertyReq}`;
    const urlEvent = `${host}/event/fetch/analytics/filter`;
    const payloadActivites = {
        "activities": {
            "propertyName": propertyReq
        }
    };
    const payloadCount = {
        "count": {
            "propertyName": propertyReq
        }
    };
    const response = await Promise.all([await get<any>(urlList), await post<any>(urlEvent, payloadActivites), await post<any>(urlEvent, payloadCount)]);
    const [listResponse, activitesResponse, countResponse]: any = response;
    let processedListResponse: DataPoint[] = [];
    const checkSpa = new Set();
    if (listResponse) {
        const data = await listResponse;
        processedListResponse = processProperties(data, checkSpa, processedListResponse);
    }
    for (let i in processedListResponse) {
        let obj = countResponse.find((o: any) => o.spaName === processedListResponse[i].spaName);
        processedListResponse[i].count = obj?.count || 0;
    }
    return {
        props: { webprop: processedListResponse, activites: activitesResponse },
    };
};

const WebPropertyPage = ({ webprop, activites }: any) => {
    return (
        <>

            <PageSection isFilled>
                <SpaProperty webprop={webprop}></SpaProperty>
                <br />
                <DividerComp />
                <br />
                <ActivityStream webprop={activites}></ActivityStream>
                <br />
            </PageSection>
        </>
    );
};

export default WebPropertyPage;

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
