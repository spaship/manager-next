import {
    Divider, PageSection, Gallery, GalleryItem
} from "@patternfly/react-core";
import React from "react";
import DeploymentWeek from "../../../../components/chart/DeploymentWeek";
import TotalDeployment from "../../../../components/chart/TotalDeployment";
import ActivityStream from "../../../../components/web-property/ActivityStream";
import axios from "axios";

export const getStaticPaths = async () => {
    const host = process.env.HOST;
    const url = `${host}/event/fetch/analytics/all`;
    const token: any = process.env.AUTHENTICATION_TOKEN;
    const res = await axios({
        method: "post",
        url: url,
        headers: {
            Authorization: token,
            rejectUnauthorized: false,
        },
        data:
        {
            "count": {
                "spa": true
            }
        }
    });
    const paths = res.data.data.map((property: any) => ({
        params: { propertyName: property?.propertyName || '', spaName: property?.spaName || ''},
    }))



    return { paths, fallback: false }
}


export const UsingHr = () => (
    <Divider
        style={{
            border: "1px solid #D2D2D2;",
            opacity: 1,
        }}
    />
);



export const getStaticProps = async (context) => {
    const propertyReq = context.params.propertyName;
    const spaReq = context.params.spaName;
    const host = process.env.HOST;
    const token: any = process.env.AUTHENTICATION_TOKEN;
    const url = `${host}/event/fetch/analytics/filter`;
    const resActivites = await axios({
        method: "post",
        url: url,
        headers: {
            Authorization: token,
            rejectUnauthorized: false,
        },
        data: {
            "activities": {
                "propertyName": propertyReq,
                "spaName": spaReq,
            }
        }
    });



    const resTotalDeployments = await axios({
        method: "post",
        url: url,
        headers: {
            Authorization: token,
            rejectUnauthorized: false,
        },
        data: {
            "count": {
                "propertyName": propertyReq,
                "spaName": spaReq,
            }
        }
    });
    const chartData = [];
    const labelData = [];
    let count = 0;
    count = 0;
    if (resTotalDeployments) {
        for (let item of resTotalDeployments.data.data) {
            const value = JSON.parse(JSON.stringify(item));
            count += value.count;
            const dataPoint = {
                x: value.env,
                y: value.count
            }
            chartData.push(dataPoint);
            const label = {
                name: value.env + " : " + value.count
            }
            labelData.push(label);
        }
    }

    return {
        props: { activites: resActivites.data.data, totalDeployments: { chartData: chartData, labelData: labelData, count: count } },
    };
};



const TestComponent = ({ activites, totalDeployments }) => {
    return (
        <>
            <Gallery hasGutter
                maxWidths={{
                    md: '780px',
                    lg: '380px',
                    '2xl': '400px'
                }} >
                <GalleryItem ><TotalDeployment webprop={totalDeployments}></TotalDeployment> </GalleryItem>
                <GalleryItem > <DeploymentWeek></DeploymentWeek> </GalleryItem>
            </Gallery>
            <PageSection isFilled>
                <br></br>
                <ActivityStream webprop={activites}></ActivityStream>
            </PageSection>
        </>
    );
};

export default TestComponent;
