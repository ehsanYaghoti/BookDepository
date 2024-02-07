import React from 'react';

const tableContext = React.createContext({
    posts : [] ,
    categories : [] ,
    users : [] ,
    sortHandler : () => {},
    deleteHandler : () => {},
    approveHandler : () => {}
})

export default tableContext;