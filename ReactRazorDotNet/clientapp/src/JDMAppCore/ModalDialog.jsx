import React from "react";
import { useEffect, useState } from "react";

function ModalDialog ({ contents = null, width = '400px', height = 'auto', icon = '', title = '', cssClass = '', fnClose = null }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div class="dialogback">
            <div className="dialogfore">
                <div className="container">
                    <div className="titlebar">
                        <span className="material-symbols-outlined" style="float:right;cursor:pointer">close</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

