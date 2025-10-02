// src/components/pagekit/recipes/ToolRecipe.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import Typography from '@/styles/Typography'
import ListComponent from '@/components/data-display/ListComponent'
import LumenWrapper from '@/components/Wrapper/LumenWrapper'

type Item = {
  id?: string | number
  icon?: ReactNode
  text?: ReactNode
}

type Props = {
  title?: ReactNode
  items: Item[]
  align?: 'left' | 'center' | 'right'
  surface?: 'subtle' | 'intense' | 'none'
}

export default function ToolRecipe({
  title,
  items,
  align = 'center',
  surface = 'subtle',
}: Props) {
  return (
    <LumenWrapper as="section" variant={surface} radius="large">
      {title ? (
        <Header>
          {typeof title === 'string' ? (
            <Typography as="h3" variant="h3" align="center">
              {title}
            </Typography>
          ) : (
            title
          )}
        </Header>
      ) : null}
      <ListComponent items={items} mode="cards" align={align} />
    </LumenWrapper>
  )
}

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  display: grid;
  justify-items: center;
`
