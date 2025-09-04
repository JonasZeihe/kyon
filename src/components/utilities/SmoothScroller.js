import React from 'react'
import PropTypes from 'prop-types'

function SmoothScroller({ targetId, children }) {
  const handleClick = (e) => {
    e.preventDefault()

    const target = document.getElementById(targetId)
    if (target) {
      try {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      } catch {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }

  const handleKeyDown = (e) => {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault()
      handleClick(e)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'inline-block',
      }}
    >
      {children}
    </button>
  )
}

SmoothScroller.propTypes = {
  targetId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default SmoothScroller
