import className from "classnames";

function Panel({
    children,
    ...rest
}) {
    const classes = className(
        "flex flex-col justify-center items-center bg-white px-6  py-6 shadow-xl rounded-md m-2",
        rest.className
    )
    return (
        <div className={classes}>
            {children}
        </div>
    )
}
export default Panel;