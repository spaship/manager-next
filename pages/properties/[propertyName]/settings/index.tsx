import { useRouter } from "next/router";
import React from "react";
import Header from "../../../../components/layout/header";
import { DataPoint } from "../../../../components/models/chart";
import { AnyProps, ContextProps, Properties } from "../../../../components/models/props";
import ApiKey from "../../../../components/settings/apiKey";
import DeleteSpa from "../../../../components/settings/deleteSpa";
import ManageSpa from "../../../../components/settings/manageSpa";
import { get } from "../../../../utils/api.utils";
import { getHost } from "../../../../utils/config.utils";

export const getStaticPaths = async () => {
    const host = getHost();
    const url = `${host}/webproperty/list`;
    const propertyListResponse = await get<AnyProps>(url);
    const paths = propertyListResponse.map((property: AnyProps) => ({
        params: { propertyName: property.webPropertyName },
    }))
    return { paths, fallback: false }
}

export const getStaticProps = async (context: ContextProps) => {
    const propertyReq = getPropertyRequest(context);
    const host = getHost();
    const urlList = `${host}/webproperty/getspalist/${propertyReq}`;
    const response = await get<Properties>(urlList);
    let listResponse: DataPoint[] = [];
    const checkSpa = new Set();
    if (response) {
        const data = await response;
        listResponse = processProperties(data, checkSpa, listResponse);
    }
    return {
        props: { webprop: listResponse },
    };
};

const SettingsPage = ({ webprop }: Properties) => {
    const router = useRouter();
    const propertyName = router.query.propertyName;
    return (
        <>
            <Header
                breadcrumbs={[{ title: "Web Properties", path: "/properties" }, { title: `${propertyName}`, path: `/properties/${propertyName}` },
                { title: `Settings`, path: `/properties/${propertyName}/settings` }]}
                previous={`/properties/${propertyName}`}
                settings={`/properties/${propertyName}/settings`}
                title={`${propertyName}`} >
            </Header>
            <br></br>
            <ManageSpa webprop={webprop}></ManageSpa>
            <br></br>
            <ApiKey></ApiKey>
            <br></br>
            <DeleteSpa></DeleteSpa>
        </>
    );
};

export default SettingsPage;

function getPropertyRequest(context: AnyProps) {
    return context.params.propertyName;
}

function getSpaName(eachSpa: AnyProps): string {
    if (!eachSpa.spaName) return '';
    return eachSpa?.spaName.trim().replace(/^\/|\/$/g, '') || null;
}

function processProperties(data: AnyProps, checkSpa: Set<AnyProps>, response: AnyProps) {
    for (let item of data) {
        let spas = item?.spa;
        for (let eachSpa of spas) {
            const reqSpaName = getSpaName(eachSpa);
            if (eachSpa?.spaName && reqSpaName.length > 0 && !checkSpa.has(reqSpaName)) {
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


