// src/components/markdown/index.ts
'use client'

import styled from 'styled-components'
import MarkdownBase from './MarkdownBase'
import { codeStyles } from './MarkdownCode'
import { calloutStyles } from './MarkdownCallouts'

const Markdown = styled(MarkdownBase)`
  ${calloutStyles}
  ${codeStyles}
`

export default Markdown
export { MarkdownBase }
