const TheContainer = ({children}) =>{
    return(
        <div className="container row row-cols-1 border border-2 rounded-3 mb-3 p-3">
            {children}
        </div>
    )
}
export default TheContainer