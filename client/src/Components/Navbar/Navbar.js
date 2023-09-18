import React from "react";
import "./navbar.css";

export default function navbar() {
  return (
    <>
      <div class="navbar">
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/abm">ABM</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
