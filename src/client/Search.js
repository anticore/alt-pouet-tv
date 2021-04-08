import React, { useContext, useState } from "react";
import { Context } from "./context";
import { types, platforms } from "./enums";
import "./Search.css";

const Search = () => {
    const context = useContext(Context);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    function onTypesChange(event) {
        let index = selectedTypes.indexOf(event.target.value);

        if (index !== -1) {
            let newTypes = [...selectedTypes];
            newTypes.splice(index, 1);
            setSelectedTypes(newTypes);
        } else {
            setSelectedTypes([...selectedTypes, event.target.value]);
        }
    }

    function onPlatformsChange(event) {
        let index = selectedPlatforms.indexOf(event.target.value);

        if (index !== -1) {
            let newPlatforms = [...selectedPlatforms];
            newPlatforms.splice(index, 1);
            setSelectedPlatforms(newPlatforms);
        } else {
            setSelectedPlatforms([...selectedPlatforms, event.target.value]);
        }
    }

    function onStart() {
        context.getRandomProd({
            types: selectedTypes,
            platforms: selectedPlatforms,
        });
    }

    return (
        <div id="Search" className="container">
            <div className="search-form section">
                <div className="box">
                    <h1 className="title">alt pouet tv</h1>
                    <div className="selects">
                        <div className="select is-multiple">
                            <select
                                multiple
                                size="8"
                                value={selectedTypes}
                                onChange={onTypesChange}
                            >
                                {types.map((type) => (
                                    <option key={"type-" + type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="select is-multiple">
                            <select
                                multiple
                                size="8"
                                value={selectedPlatforms}
                                onChange={onPlatformsChange}
                            >
                                {platforms.map((platform) => (
                                    <option
                                        key={"platform-" + platform.slug}
                                        value={platform.slug}
                                    >
                                        {platform.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="buttons">
                        <button
                            className="button is-primary is-medium is-fullwidth"
                            onClick={onStart}
                        >
                            start
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
