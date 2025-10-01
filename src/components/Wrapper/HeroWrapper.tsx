// src/components/Wrapper/HeroWrapper.tsx
'use client'
import { forwardRef, memo, ReactNode } from 'react'
import LumenWrapper, { LumenWrapperProps } from './LumenWrapper'

type HeroWrapperProps = LumenWrapperProps & {
  children: ReactNode
}

const HeroWrapper = forwardRef<any, HeroWrapperProps>(
  ({ children, ...rest }, ref) => (
    <LumenWrapper
      ref={ref}
      as="section"
      variant="subtle"
      radius="large"
      {...rest}
    >
      {children}
    </LumenWrapper>
  )
)

HeroWrapper.displayName = 'HeroWrapper'

export default memo(HeroWrapper)
