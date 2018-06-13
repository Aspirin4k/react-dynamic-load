import React from 'react';

class Provider {
    static getCustomMessage() {
        return (
            () => <div>Im custom message!</div>
        )
    }
}

export default Provider;