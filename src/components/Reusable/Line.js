import className from "classnames"

function Line({
    ...props
}) {

    const classes = className(
        "bg-gray-300 w-full h-0.5 mx-2",
        props.className
    )

    return <div className={classes} />;
};

export default Line;