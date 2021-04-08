import { useContext } from "react";
import { Context } from "./context";
import YouTube from "react-youtube";

import "./Prod.css";

const Prod = () => {
    let context = useContext(Context);

    let prod = context.currentProd;
    console.log(prod);
    let youtubeUrl = prod.downloadLinks
        .map((dlLink) => dlLink.link)
        .find((dlLink) => dlLink.includes("youtube"));
    let videoId = youtubeUrl.split("v=")[1];
    var ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }

    return (
        <div id="Prod" className="container">
            <div className="section">
                <div className="box">
                    <h1 className="title">{prod.name}</h1>
                    <h2 className="subtitle">
                        {prod.groups.map((group) => group.name).join(" & ")}
                    </h2>

                    <YouTube
                        videoId={videoId} // defaults -> null
                        containerClassName={"yt"} // defaults -> ''
                        opts={{
                            playerVars: {
                                autoplay: 1,
                            },
                        }}
                        onEnd={() =>
                            context.getRandomProd(context.searchParams)
                        }
                    />

                    <div className="buttons">
                        <button
                            onClick={() => {
                                window.open(
                                    "https://www.pouet.net/prod.php?which=" +
                                        prod.id
                                );
                                return false;
                            }}
                            className="button is-button-link"
                        >
                            Pouet Link
                        </button>
                        <button
                            className="button is-button-link"
                            onClick={() =>
                                context.getRandomProd(context.searchParams)
                            }
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prod;
