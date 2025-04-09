import { Chibi } from "./chibi";

/* eslint-disable prefer-const */
interface GUIProps {
    flavor: string | undefined;
    ratingOne: number | undefined;
    ratingTwo: number | undefined;
    colorOne: string | undefined;
    colorTwo: string | undefined;
    nameOne: string | undefined;
    nameTwo: string | undefined
    reviewOne: string | undefined;
    reviewTwo: string | undefined;
}

// Helper function to round to two decimal places
const roundToTwo = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

// Helper function to return score as string
const ratingToString = (rating: number) => {
    if (rating === -100) {
        return "N/A"; // A value of -100 means no score/review
    }
    else {
        const score: number = roundToTwo(rating * 10);
        return score.toString() + "/10"; // Return score as a fraction over 10
    }
}

// Helper function to return average score as string
const averageToString = (ratingOne: number, ratingTwo: number) => {
    let avg: number = 0;
    let reviews: number = 0;
    if (ratingOne !== -100) {
        avg += ratingOne;
        reviews += 1;
    }
    if (ratingTwo !== -100) {
        avg += ratingTwo;
        reviews += 1;
    }
    avg = avg / reviews;
    return ratingToString(avg);
}

// Component for the GUI that will live in the middle flex container
export const OverlayGUI: React.FC<GUIProps> = ({ ...props }) => {
    let davidRating: string = "";
    let willsRating: string = "";
    let avgRating: string = "AVG: ";

    // Bool flags to prevent extra checks
    let one: boolean = false;
    let two: boolean = false;

    if (props.ratingOne !== undefined) {
        davidRating += ratingToString(props.ratingOne); // Return as string David's rating
        one = true;
    }
    if (props.ratingTwo !== undefined) {
        willsRating += ratingToString(props.ratingTwo); // Return as string Will's rating
        two = true;
    }
    if (one && two) {
        avgRating += averageToString(props.ratingOne as number, props.ratingTwo as number); // Return as string the avg score
    }

    return (
        <div className="middle-column">
            <div className="top-block" style={{ background: `linear-gradient(to bottom right, ${props.colorOne}, ${props.colorTwo})` }}>
                <div className="flavor-score">
                    <div className="flavor-text" style={{ color: props.colorTwo }}>{props.flavor}</div>
                </div>
            </div>
            <div className="chibi-layout">
                <Chibi {...{
                    name: props.nameOne,
                    rating: props.ratingOne,
                    review: props.reviewOne,
                    colorOne: props.colorOne,
                    colorTwo: props.colorTwo
                }}/>
                <Chibi {...{
                    name: props.nameTwo,
                    rating: props.ratingTwo,
                    review: props.reviewTwo,
                    colorOne: props.colorOne,
                    colorTwo: props.colorTwo
                }}/>
            </div>
            <div className="bottom-block">
                <div className="flex-one">
                    <div className="bottom-score-block bottom-left" style={{ background: props.colorTwo }}>
                        <div className="flavor-score">
                            <div className="score-text" style={{ color: props.colorTwo }}>{davidRating}</div>
                        </div>
                    </div>
                </div>
                <div className="flex-one">
                    <div className="bottom-score-block" style={{ background: props.colorOne }}>
                        <div className="flavor-score">
                            <div className="score-text" style={{ color: props.colorOne }}>{avgRating}</div>
                        </div>
                    </div>
                </div>
                <div className="flex-one">
                    <div className="bottom-score-block bottom-right" style={{ background: props.colorTwo }}>
                        <div className="flavor-score">
                            <div className="score-text" style={{ color: props.colorTwo }}>{willsRating}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

// Define button props specifically for these button components
type ButtonProps = {
    changeFlavor: (i: number) => void;
}

// A component for the left button
export const LeftButton: React.FC<ButtonProps> = ({ changeFlavor }) => {
    return (
        <svg className="left" viewBox="0 0 256 512" width="100" onClick={() => { changeFlavor(-1) }}>
            <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
        </svg>
    );
}

// // A component for the right button
export const RightButton: React.FC<ButtonProps> = ({ changeFlavor }) => {
    return (
        <svg className="right" viewBox="0 0 256 512" width="100" onClick={() => { changeFlavor(1) }}>
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
        </svg>
    );
}