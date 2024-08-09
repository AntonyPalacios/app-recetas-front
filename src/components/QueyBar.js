const QueyBar = () => {
    return (
        <div className="container">
            <div className="row rounded mt-3 row-cols-2 w-50 justify-content-center mx-auto">
                <div className="col-9">
                    <input type="text" className=" col form-control my-2 p-3" placeholder="Buscar..."/>
                </div>
                <div className="col-auto align-self-center">
                    <button className="btn col btn-secondary">Buscar</button>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default QueyBar