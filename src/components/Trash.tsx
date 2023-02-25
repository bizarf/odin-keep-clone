import React from "react";
import { MdOutlineDelete } from "react-icons/md";

const Trash = () => {
    return (
        <div>
            <div className="flex justify-center italic">
                Notes in Trash are deleted after 7 days.
            </div>
            <div className="flex flex-col items-center">
                <div>
                    <MdOutlineDelete />
                </div>
                <div>No notes in Trash</div>
            </div>
        </div>
    );
};

export default Trash;
