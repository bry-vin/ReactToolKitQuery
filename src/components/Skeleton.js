import classNames from "classnames";

function Skeleton ({times, className}) {
    const outerClassNames = classNames(
        "relative",
        "overflow-hidden",
        "bg-gray-200",
        "rounded",
        "mb-2.5",
        className
    );
    const innerClassNames = classNames(
        "animate-shimmer",
        "absolute",
        "inset-0",
        "-translate-x-full",
        "bg-gradient-to-r",
        "from-gray-200",
        "via-white",
        "to-gray-200"
    );

    //CODE BELOW IN COMMENT EASIER TO UNDERSTAND AND SAME AS CODE BELOW

    // const boxes = [];

    // for(let x = 0; x<times; x++){
    //     boxes.push(<div key={x} />)
    // }

    //CODE ABOVE IN COMMENT EASIER TO UNDERSTAND AND SAME AS CODE BELOW

    const boxes = Array(times).fill(0).map((_,i)=> {
        return <div key= {i} className = {outerClassNames}> 
            <div className= {innerClassNames} />
        </div>

    });


    return boxes;

}

export default Skeleton;