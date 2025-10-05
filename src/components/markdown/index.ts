// src/components/markdown/index.ts
'use client'

import styled from 'styled-components'
import MarkdownBase from './MarkdownBase'
import { codeStyles } from './MarkdownCode'
import { tableStyles } from './MarkdownTables'
import { mediaStyles } from './MarkdownMedia'
import { calloutStyles } from './MarkdownCallouts'

const Markdown = styled(MarkdownBase)`
  ${codeStyles}
  ${tableStyles}
  ${mediaStyles}
  ${calloutStyles}
`

export default Markdown
export { MarkdownBase }
