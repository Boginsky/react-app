import React, {useEffect, useState} from 'react';
import axios from "axios";

const TagService = () => {

    const [tags, setTags] = useState([])

    const fetchUserProfiles = () => {
        axios.get('http://localhost:5000/tags').then(response => {
            setTags(response.data.content)
        });
    }

    useEffect(() => {
        fetchUserProfiles();
    }, [])

    return <div className="container">
        <table className="table">
            <thread>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                </tr>
                {tags.map((tag) => {
                    return <div>
                        <tbody>
                        <td>{tag.id}</td>
                        <td>{tag.name}</td>
                        </tbody>
                    </div>
                })}
            </thread>
        </table>
    </div>
}

export default TagService;