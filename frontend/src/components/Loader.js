import React from 'react';
import { ColorRing } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <div className='loader'>
            <ColorRing
                visible={true}
                height="120"
                width="120"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            <p>If it takes too long, try to reload a page or try later.</p>
        </div>
    );
};