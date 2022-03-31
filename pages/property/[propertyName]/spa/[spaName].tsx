import {
    Divider, PageSection, Gallery, GalleryItem
} from "@patternfly/react-core";
import React from "react";
import DeploymentWeek from "../../../../components/chart/DeploymentWeek";
import TotalDeployment from "../../../../components/chart/TotalDeployment";
import ActivityStream from "../../../../components/web-property/ActivityStream";
import { post } from "../../../../utils/APIUtil";
import styled from 'styled-components';

export const DividerComp = styled.footer`
  border-top: 1px solid var(--spaship-global--Color--bright-gray);
  width: 60vw;
`;

export const getStaticPaths = async () => {
    const host = getHost();
    const url = `${host}/event/fetch/analytics/all`;
    const payload = {
        "count": {
            "spa": true
        }
    }
    const response = await post<any>(url, payload);
    const paths = response.map((property: any) => ({
        params: { propertyName: property?.propertyName || 'NA', spaName: property?.spaName || '' },
    }))
    return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
    const propertyReq = getPropertyReq(context);
    const spaReq = getSpaReq(context);
    const host = getHost();
    const url = `${host}/event/fetch/analytics/filter`;
    const payloadActivites = {
        "activities": {
            "propertyName": propertyReq,
            "spaName": spaReq,
        }
    };
    const payloadTotalDeploymenets = {
        "count": {
            "propertyName": propertyReq,
            "spaName": spaReq,
        }
    };
    const payloadMonthlyDeploymenets = {
        "chart": {
            "month": true,
            "propertyName": propertyReq,
            "spaName": spaReq,
        }
    };
    const response = await Promise.all([await post<any>(url, payloadActivites), await post<any>(url, payloadTotalDeploymenets), await post<any>(url, payloadMonthlyDeploymenets)]);
    const [activitesResponse, totalDeploymentsResponse, monthlyDeploymentResponse]: any = response;

    let chartData: any[] = [];
    let labelData: any[] = [];
    let count = 0;
    if (totalDeploymentsResponse) {
        for (let item of totalDeploymentsResponse) {
            count = processTotalDeployments(item, count, chartData, labelData);
        }
    }

    const processedMonthlyDeployments = [];
    for (const item in monthlyDeploymentResponse) {
        const data = monthlyDeploymentResponse[item];
        const temp = [];
        let i = 1;
        for (const prop of data) {
            temp.push({ name: prop.envs, x: `week ${i++}`, y: prop.count })
        }
        processedMonthlyDeployments.push(temp);
    }

    return {
        props: { activites: activitesResponse, totalDeployments: { chartData: chartData, labelData: labelData, count: count }, monthlyDeployments: processedMonthlyDeployments },
    };
};



const SpaNamePage = ({ activites, totalDeployments, monthlyDeployments }: any) => {
    return (
        <>
            <Gallery hasGutter
                maxWidths={{
                    md: '780px',
                    lg: '380px',
                    '2xl': '400px'
                }} >
                <GalleryItem ><TotalDeployment webprop={totalDeployments}></TotalDeployment> </GalleryItem>
                <GalleryItem > <DeploymentWeek webprop={monthlyDeployments}></DeploymentWeek> </GalleryItem>
            </Gallery>
            <br />
            <DividerComp />
            <br />
            <PageSection isFilled>

                <ActivityStream webprop={activites}></ActivityStream>
            </PageSection>
            <br />
        </>
    );
};

export default SpaNamePage;

function getHost() {
    return process.env.HOST;
}

function getSpaReq(context: any) {
    return context.params.spaName;
}

function getPropertyReq(context: any) {
    return context.params.propertyName;
}

function processTotalDeployments(item: any, count: number, chartData: any[], labelData: any[]) {
    const value = JSON.parse(JSON.stringify(item));
    count += value.count;
    const dataPoint = {
        x: value.env,
        y: value.count
    };
    chartData.push(dataPoint);
    const label = {
        name: value.env + " : " + value.count
    };
    labelData.push(label);
    return count;
}

