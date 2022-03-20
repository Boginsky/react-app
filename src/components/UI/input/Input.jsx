import React, {useState} from 'react';

const Input = ({setSearchQuery}) => {

    const [query, setQuery] = useState('')

    function submit(e) {
        e.preventDefault()
        setSearchQuery(query)
    }

    return (
        <form onSubmit={submit}>
            <div className="input-group">
                <input value={query}
                       onChange={e => {
                           if (e.target.value === '') {
                               setSearchQuery(e.target.value)
                           }
                           setQuery(e.target.value)
                       }}
                       type="text"
                       className="form-control rounded"
                       placeholder="Search"
                       aria-label="Search"
                       aria-describedby="search-addon"/>
                <button className="btn btn-primary w-25">Go!</button>
            </div>
        </form>
    );
};

export default Input;