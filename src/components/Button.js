/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React from "react";

function Button() {
    return (
        <button
            css={css`
                text-transform: uppercase;
                background: #3BA5D1;
                color: white;
                border: none;
                font-size: 14px;
                text-align: center;
                line-height: 16px;
                padding: 8px 16px;
                border-radius: 2px;
                cursor: pointer;
                
                &:hover {
                background-color: #3bc0d1;
                }
              `}
        >
            Добавить ленту
        </button>
    )
}

export default Button;