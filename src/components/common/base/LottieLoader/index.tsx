import Lottie, { LottieProps  } from 'react-lottie';


interface LottieLoaderType {
    animationData: any;
    width?: number| string;
    height?: number | string;
    props?:LottieProps
}
const LottieLoader = ({animationData ,...props}:LottieLoaderType) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
        
    }
    return <div>
        <Lottie 
            isClickToPauseDisabled={true}            
            options={defaultOptions}
            height={200}
            width={200}
            {...props}
        />

    </div>
}
export default LottieLoader