import React from 'react';

const paginationContext = React.createContext({
    pagination : {} ,
    inputHandler : () => {}
})

export default paginationContext;