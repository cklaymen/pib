import React from 'react';

const componentName = ({page, numberOfPages, changePage}) => {
    let button = {
        next: null,
        prev: null
    };

    if (page > 1) {
        button.prev = <button onClick={changePage.prev} className="button-prev"></button>;
    }
    if (page < numberOfPages) {
        button.next = <button onClick={changePage.next} className="button-next"></button>;
    }

    return (
        <div className="pages-nav">
            <div className="button-space">{button.prev}</div>
            {page} / {numberOfPages}
            <div className="button-space">{button.next}</div>
        </div>
    );
};

export default componentName;