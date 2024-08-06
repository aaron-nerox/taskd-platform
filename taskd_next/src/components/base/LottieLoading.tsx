import Lottie from "lottie-react";
import animation from '@/../public/assets/animations/loading.json'

export default function LottieLoading() {

    return (
        <Lottie
            className={"h-[320px] w-[320px]"}
            animationData={animation}
            autoplay={true}
            loop={true}/>
    )
}