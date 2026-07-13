import Box from "@/components/box";
import GetCursorPosition from "@/components/getCursorPosition";
import RainAnimation from "@/components/rainAnimation";
import AnimatedBalls from "@/components/animatedBalls";
import AnimatedBallsOnMouse from "@/components/animatedBallsOnMouse";
import Cards from "@/components/cards";

export default function Rotate() {
    return (
        <div className="flex relative items-center justify-center min-h-screen">
            {/* <Box /> */}
            {/* <GetCursorPosition /> */}
            {/* <RainAnimation /> */}
            {/* <AnimatedBalls /> */}
            {/* <AnimatedBallsOnMouse>
                <Cards />
            </AnimatedBallsOnMouse> */}
            <Cards />
        </div>
    )
}