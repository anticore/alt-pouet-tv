import { createContext, useState } from "react";

export const Context = createContext(null);

const initialState = {
    currentProd: null,
    searchParams: null,
};

export const Provider = ({ children }) => {
    const [data, setData] = useState(initialState);

    function getRandomProd(options) {
        let types = options.types && options.types.join(",");
        let platforms = options.platforms && options.platforms.join(",");
        let minimumOfCdc = options.minimumOfCdc || 0;

        const params = new URLSearchParams({ types, platforms, minimumOfCdc });

        console.log(params.toString());

        fetch("http://localhost:3001/random/?" + params.toString())
            .then((response) => response.json())
            .then((prod) =>
                setData({ ...data, searchParams: options, currentProd: prod })
            );
    }

    return (
        <Context.Provider value={{ ...data, getRandomProd }}>
            {children}
        </Context.Provider>
    );
};
