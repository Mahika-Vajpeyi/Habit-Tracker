import React from "react";

function Header({count = 0, max = 10, onShare, onReset}){
  return(
    <header className = "header">
      <div className = "toolbar">
        <div className = "left">
          <strong>Habit Tracker</strong>  
          <span className ="pill" aria-live="polite"> {count} / {max} habits </span>    
        </div>
        <div className = "right">
          <button className = "btn" onClick={onShare}>Share Link</button>
          <button className = "btn" onClick={onReset}>Reset</button>
        </div>
      </div>
    </header>
  )
}

export default Header;
