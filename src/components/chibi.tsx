import { useEffect, useRef, useState } from "react";

// Define the type of prop our Chibi component takes
interface ChibiProps {
    name: string | undefined;
    rating: number | undefined;
    review: string | undefined;
    colorOne: string | undefined;
    colorTwo: string | undefined;
}

interface BubbleProps {
    isClicked: boolean;
    review: string | undefined;
    colorOne: string | undefined;
    colorTwo: string | undefined;
}

interface ClickedProps {
    review: string | undefined;
    colorOne: string | undefined;
    colorTwo: string | undefined;
}

interface UnClickedProps {
    colorOne: string | undefined;
    colorTwo: string | undefined;
}

// Separate bubble to show when chibi is clicked
const ClickedBubble: React.FC<ClickedProps> = ({...props}) => {
    return (
        <div className="large-speech-block" style={{ background: `linear-gradient(to bottom right, ${props.colorOne}, ${props.colorTwo})` }}>
            <div className="large-speech-bubble large-bubble-text" style={{color: props.colorTwo}}>
                {props.review}
            </div>
        </div>
    )
}

const UnclickedBubble: React.FC<UnClickedProps> = ({...props}) => {
    return(
        <div className="speech-block" style={{ background: `linear-gradient(to bottom right, ${props.colorOne}, ${props.colorTwo})` }}>
            <div className="speech-bubble speech-bubble-text" style={{color: props.colorTwo}}>...</div>
        </div>
    )
}

// Component for speech bubbles
const SpeechBubble: React.FC<BubbleProps> = ({...props}) => {
    const clicked: boolean = props.isClicked;
    // If user hasn't clicked on character chibis, then show minimized speech bubble
    return (
        <>
            {clicked ? <ClickedBubble {...{review: props.review, colorOne: props.colorOne, colorTwo: props.colorTwo}}/> : 
                <UnclickedBubble {...{colorOne: props.colorOne, colorTwo: props.colorTwo}} />
            }
        </>
    )
}

// Component for Chibi
export const Chibi: React.FC<ChibiProps> = ({...props}) => {
    const wrapperRef = useRef<HTMLDivElement>(null); // 👈 Ref for the entire component
    const path = useRef<string>("/chibis");
    const name = useRef<string>("");
    const [imgPose, setImgPose] = useState<number>(1); // State variable to maintain which version chibi is being rendered
    const [isClicked, setIsClicked] = useState<boolean>(false); // State variable that determines if we show full speech bubble or not

    /* Image names are the same between each directory
        1: Base chibi
        2: Thinking pose Chibi
        3: Drinking Energy Drink pose Chibi
        4. IDK pose Chibi
    */

    // Grab path to specific chibi images based on name
    if(props.name === "David Koh") {
        path.current += "/david/";
        name.current = "david";
    }
    else if (props.name === "William Chung") {
        path.current += "/will/";
        name.current = "will";
    }
    else {
        path.current += "/anon/";
        name.current = "anon";
    }

    useEffect(() => {
        // If we've already clicked on the image, then no need to change the image as well
        if (isClicked) return;

        // When changing the pose of the chibi, check if the user has clicked
        if(imgPose > 2) {
            if(props.rating === -100) {
                setImgPose(4); // Indicating that this person had no review
            }
            setIsClicked(true);
        }

        console.log(imgPose)
        
        path.current += props.rating?.toString() + ".jpg"; // Update the path to the chibi image
    }, [imgPose, props.rating, isClicked]);

    // Effect to handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                // Click happened outside the Chibi component
                setImgPose(1);
                setIsClicked(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div ref={wrapperRef} className={`chibi ${name.current}`}>
            <div className="chibi-img" onMouseEnter={() => setImgPose(2)} onMouseLeave={() => setImgPose(1)} onMouseDown={() => setImgPose(3)}/>
            <SpeechBubble {...{isClicked: isClicked, review:props.review, colorOne:props.colorOne, colorTwo:props.colorTwo}}/>
        </div>
    );
}