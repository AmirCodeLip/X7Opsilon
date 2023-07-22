import React from 'react';
import { ContractContext } from '../Contexts/ContractContext';
import { ApplicationStates } from '../Types';

export default function ErrorPage(props: { error: string }) {
    return (<div>
        {props.error}
    </div>);
}