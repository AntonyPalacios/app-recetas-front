const TheButton = ({children,className='', ...props}) =>{
    return(
        <button className={`btn col-md-2 col-lg-1 ${className}`} {...props}>
            {children}
        </button>
    )
}

export default TheButton