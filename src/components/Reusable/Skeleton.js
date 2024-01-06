import classNames from "classnames";

function Skeleton({ times,className ,...rest }) {
    const outerClassNames =classNames(

        'relative',
        'overflow-hidden',
        'rounded',
        'mb-2.5',
        rest.dark ? 'bg-gray-800' : 'bg-gray-200',
        className
    );
    
    const innerClassNames =classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full',
        'bg-gradient-to-r',
        'from-gray-200',
        'via-white',
        'to-gray-200',
        rest.dark ? 'from-gray-800 to-gray-800 via-gray-600' : 'from-gray-200 to-gray-300'
    );


    const boxes = Array(times).fill(0).map((_, i) => {
        return <div key={i} className={outerClassNames} >
            <div className={innerClassNames}/>
        </div>
    })

    return(
        boxes
    )
}
export default Skeleton;