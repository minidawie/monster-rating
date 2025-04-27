import { useEffect, useState } from "react";
import { Showcase } from "./showcase";
import drinks from "../data/ratings.json";
import "../css/global.css";
import { LeftButton, OverlayGUI, RightButton } from "./gui";

// Define rating type cuz eslint throws some weird ass errors if you don't
type rating = {
    critic: string;
    type: string;
    flavor: string;
    rating: number;
    review: string;
}
// Define color type
type color = {
    flavor: string;
    colorOne: string;
    colorTwo: string;
}

// Define props 
interface InfoProps {
    david: rating | null;
    william: rating | null;
    flavorHues: color | null;
    changeFlavor(i: number): void;
}

// Component for the main page overlay housing our UI
const CanvasOverlay: React.FC<InfoProps> = ({ ...props }) => {
    return (
        <div className="three-portions">
            <div className="flex-one">
                <LeftButton changeFlavor={props.changeFlavor}/>
            </div>
            <div className="flex-one middle-part">
                <OverlayGUI {...{ 
                    flavor: props.flavorHues?.flavor, 
                    ratingOne: props.david?.rating, 
                    ratingTwo: props.william?.rating, 
                    colorOne: props.flavorHues?.colorOne, 
                    colorTwo: props.flavorHues?.colorTwo,
                    nameOne: props.david?.critic,
                    nameTwo: props.william?.critic,
                    reviewOne: props.david?.review,
                    reviewTwo: props.william?.review
                }} />
            </div>
            <div className="flex-one">
                <RightButton changeFlavor={props.changeFlavor}/>
            </div>
        </div>
    );
}

export const RatingsLayout: React.FC = () => {
    const [flavor, setFlavor] = useState<number>(0);  // State variable to keep track of which flavor is shown on the screen

    // Function to handle changing of flavors
    const changeFlavor = (i: number) => {
        setFlavor(prevFlavor => {
            let newIndex = prevFlavor + i; // Add 1 or -1
            // Check for bounds of the array (NOTE: change this so index values are dynamic)
            if (newIndex < 0) {
                newIndex = 22;
            } else if (newIndex > 22) {
                newIndex = 0;
            }
            return newIndex; // Return the updated flavor index
        });
    };

    const keyDownHandler: React.KeyboardEventHandler = (event) => {
        if (event.key === "ArrowLeft") {
            changeFlavor(-1); // Go backwards in the array if we press the left arrow key
        }
        else if (event.key === "ArrowRight") {
            changeFlavor(1); // Go forwards in the array if we press the right arrow key
            event.preventDefault();
            console.log('Enter key pressed');
        }
    };

    // Effect hook to define our event handlers
    useEffect(() => {
        // Define our event handlers
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                changeFlavor(-1); // Go backwards in the array if we press the left arrow key
            }
            else if (event.key === "ArrowRight") {
                changeFlavor(1); // Go forwards in the array if we press the right arrow key
            }
        };

        window.addEventListener('keydown', keyDownHandler); // Add our event listener to the window

        // Cleaning up
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, []); // Run only on mount/unmount

    return (
        <div className="parent" onKeyDown={keyDownHandler}>
            <CanvasOverlay {...{ david: drinks.ratings[flavor*2], william: drinks.ratings[(flavor*2)+1], flavorHues: drinks.colors[flavor], changeFlavor: changeFlavor }} />
            <div className="child">
                <Showcase />
            </div>
        </div>
    );
}
