import React from 'react';
import { GoQuestion } from 'react-icons/go';
import { ICON_M } from './ICON_M';

export const IconC = ({ name, ...props }) => {
    const Icon = ICON_M?.[name] || GoQuestion;

    return <Icon {...props} />;
};
