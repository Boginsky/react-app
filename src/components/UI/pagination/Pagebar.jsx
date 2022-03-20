import React, {useState} from 'react';
import CustomSelect from "../select/CustomSelect";
import {getPagesArray} from "../../../utils/pages";

const Pagebar = ({amountOfPages, setPage, size, setSize}) => {

    const [limit, setLimit] = useState(10)
    let pagesArray = getPagesArray(amountOfPages, limit)

    return (
        <div style={{alignContent: "center"}}>
            <button
                onClick={() => setPage(0)}
                type="button"
                className="btn btn-light btn-sm">««
            </button>
            <button onClick={
                limit === 10
                    ? () => setLimit(10)
                    : () => setLimit(limit - 10)
            }
                    type="button"
                    className="btn btn-light btn-sm">«
            </button>
            {pagesArray.map(page =>
                <button key={page} onClick={() => setPage(page - 1)} type="button"
                        className="btn btn-light btn-sm">{page}</button>
            )
            }
            <button
                onClick={() => setLimit(limit + 10)}
                type="button"
                className="btn btn-light btn-sm">»
            </button>
            <button
                onClick={() => setPage(amountOfPages - 1)}
                type="button"
                className="btn btn-light btn-sm">»»
            </button>
            <CustomSelect className="float-right"
                          value={size}
                          onChange={size => setSize(size)}
                          defaultValue=" "
                          options={[
                              {value: 10, name: '10'},
                              {value: 20, name: '20'},
                              {value: 50, name: '50'}
                          ]}
            />
        </div>
    );
};

export default Pagebar;