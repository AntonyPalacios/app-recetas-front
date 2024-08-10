const QueryBar = () => {
    return (
        <div className="container">
            <div className="row row-cols-2 w-75 mx-auto">
                <div className="col-9">
                    <input type="text" className="form-control my-2 w-100" placeholder="Buscar..."/>
                </div>
                <div className="col-3 align-self-center">
                    <button className="btn btn-secondary btn-sm">Buscar</button>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default QueryBar