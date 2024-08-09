import imagePlaceholder from '../assets/imagePlaceholder.png'

const Card = () => {
    return (
        <div className="col">
            <div className="card p-2">
                <img src={imagePlaceholder} className="card-img-top" alt="Comida"/>
                <div className="card-body">
                    <h5 className="card-title">Nombre del plato</h5>
                    <p className="card-text">Descripción del plato</p>
                </div>
                <div className="card-footer text-end">
                    FAV
                </div>
            </div>
        </div>
    )
}

export default Card