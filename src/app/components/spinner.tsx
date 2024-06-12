'use client';
import "@styles/spinner.scss";

import { TailSpin } from "react-loader-spinner";

export default function Spinner(
    {height="100%", width="100%"}:
    {height?: string, width?: string}
){
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
