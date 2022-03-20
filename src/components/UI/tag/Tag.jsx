import React from 'react';
import {WithContext as ReactTags} from 'react-tag-input';

const Tag = ({tags, setTags}) => {

    const KeyCodes = {
        comma: 188,
        enter: 13
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag])
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };

    const onTagUpdate = (i, newTag) => {
        const updatedTags = tags.slice();
        updatedTags.splice(i, 1, newTag);
        setTags(updatedTags);
    };

    return (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Tags:</label>
            <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                minQueryLength={3}
                maxQueryLength={15}
                maxLength={15}
                minLength={3}
                inputFieldPosition="top"
                onTagUpdate={onTagUpdate}

            />
        </div>
    );
};

export default Tag;