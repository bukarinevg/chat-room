'use client';

import "@styles/loading.scss";

import { useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { LoadingContext } from "@components/providers/LoadingProvider";

export default function Loading(
    {height="100%", width="100%"}:
    {height?: string, width?: string}
){
    const { loading } = useContext(LoadingContext);
    if (!loading) return null;
    return (
        <div className="spinner-default">
            <TailSpin
                height={height}
                width={width}
                color="gray"
                ariaLabel="tail-spin-loading"
                radius={1}
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}