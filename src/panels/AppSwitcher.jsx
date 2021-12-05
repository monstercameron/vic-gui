import axios from 'axios';

export default (props) => {

    const handleAppSwitcher = (window) => () => {
        axios.get(`http://localhost:3000/api/window?title=${window}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className='container-fuild'>
            <div className="row">
                <div className="col-1">
                    <button className='btn btn-success'
                    onClick={handleAppSwitcher('calculator')}>
                        <h1>Calculator</h1>
                    </button>
                </div>
                <div className="col-1">
                    <button className='btn btn-success'
                    onClick={handleAppSwitcher('maps')}>
                        <h1>Maps</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}