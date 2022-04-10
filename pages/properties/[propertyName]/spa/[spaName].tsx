import {
    Divider, PageSection, Gallery, GalleryItem
} from "@patternfly/react-core";
import React from "react";
import DeploymentWeek from "../../../../components/chart/deployment-week";
import TotalDeployment from "../../../../components/chart/total-deployment";
import ActivityStream from "../../../../components/web-property/activityStream";
import { post } from "../../../../utils/api.utils";
import styled from 'styled-components';
import { SPAIndexProps, Properties, AnyProps, ContextProps } from "../../../../components/models/props";
import { getHost } from "../../../../utils/config.utils";
import { useRouter } from "next/router";
import Header from "../../../../components/layout/header";

export const DividerComp = styled.hr`
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
    const response = await post<AnyProps>(url, payload);
    const paths: AnyProps = [];
    for (let prop of response) {
        if (prop?.propertyName && prop?.spaName)
            paths.push({ params: { propertyName: prop?.propertyName, spaName: prop?.spaName } });
    }
    // response.map((property: AnyProps) => ({
    //     params: { propertyName: property?.propertyName, spaName: property?.spaName },
    // }))
    return { paths, fallback: false }
}

export const getStaticProps = async (context: ContextProps) => {
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
    const response = await Promise.all([await post<Properties>(url, payloadActivites), await post<Properties>(url, payloadTotalDeploymenets), await post<Properties>(url, payloadMonthlyDeploymenets)]);
    const [activitesResponse, totalDeploymentsResponse, monthlyDeploymentResponse]: AnyProps = response;
    let chartData: AnyProps = [];
    let labelData: AnyProps = [];
    let count = 0;
    if (totalDeploymentsResponse) {
        for (let item of totalDeploymentsResponse) {
            count = processTotalDeployments(item, count, chartData, labelData);
        }
    }
    const processedMonthlyDeployments = [];
    const legendData = [];
    let tempLegendData: AnyProps = new Set;
    for (const item in monthlyDeploymentResponse) {
        const data = monthlyDeploymentResponse[item];
        const temp = [];
        let i = 1;
        for (const prop of data) {
            tempLegendData.add(prop.envs);
            temp.push({ name: prop.envs, x: `week ${i++}`, y: prop?.count })
        }
        processedMonthlyDeployments.push(temp);
    }
    for (let env of tempLegendData) {
        legendData.push({ name: env })
    }
    return {
        props: { activites: activitesResponse, totalDeployments: { chartData: chartData, labelData: labelData, count: count }, monthlyDeployments: { processedMonthlyDeployments: processedMonthlyDeployments, legendData: legendData } },
    };
};



const SPAProperties = ({ activites, totalDeployments, monthlyDeployments }: SPAIndexProps) => {
    const maxWidths = {
        'md': '780px',
        'lg': '380px',
        '2xl': '400px'
    };
    const router = useRouter();
    const propertyName = router.query.propertyName;
    const spaName = router.query.spaName;
    return (
        <>
            <Header
                breadcrumbs={[{ title: "Web Properties", path: "/properties" }, { title: `${propertyName}`, path: `/properties/${propertyName}` },
                { title: `${spaName}`, path: `/properties/${propertyName}/spa/${spaName}` }]}
                previous={`/properties/${propertyName}`}
                settings={`/properties/${propertyName}/settings`}
                title={`${spaName}`} >
            </Header>
            <br />
            <Gallery hasGutter
                maxWidths={maxWidths} >
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

export default SPAProperties;

function getSpaReq(context: AnyProps) {
    return context.params.spaName;
}

function getPropertyReq(context: AnyProps) {
    return context.params.propertyName;
}

function processTotalDeployments(item: AnyProps, count: number, chartData: AnyProps, labelData: AnyProps) {
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

