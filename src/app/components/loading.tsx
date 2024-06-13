'use client';

import { useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { LoadingContext } from "@components/providers/LoadingProvider";
import Spinner from "./spinner";

export default function Loading(
){
    const { loading } = useContext(LoadingContext);
    // console.log('loading change =', loading);
    if (!loading) return null;
    return (
        <div>
            <Spinner />
        </div>
    );
}