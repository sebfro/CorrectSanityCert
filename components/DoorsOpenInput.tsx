import React from 'react';
import {NumberInputProps, useFormValue} from "sanity";
import {Stack, Text} from "@sanity/ui";

function subtractMinutesFromDate(date: string | undefined, minutes: number | undefined) {
    if (!date || ! minutes) return 'Date not avaiable';
    return new Date(new Date(date).getTime() - (minutes || 0) * 60000).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
}

export function DoorsOpenInput(props: NumberInputProps) {
    const date = useFormValue(['date']) as string | undefined;
    return (
        <Stack space={3}>
            {props.renderDefault(props)}
            <Text size={1}>
                Doors open{' '}
                {subtractMinutesFromDate(date, props.value)}
            </Text>
        </Stack>
    );
};

export default DoorsOpenInput;
