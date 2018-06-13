import React from 'react';

import { CustomMessage } from './components/custom-message';

class CustomProvider {
    static getCustomMessage() {
        return CustomMessage;
    }
}

export default CustomProvider;