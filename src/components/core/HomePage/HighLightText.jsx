import React from 'react'

function HighLightText({text, gradiant}) {
  return (
    <span className={`text_highlight${gradiant ? '_'+gradiant : ''}`}>
        {text}
    </span>
  )
}

export default HighLightText