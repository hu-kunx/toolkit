import * as React from 'react'

const { useState, useEffect, useCallback, useMemo, useRef } = React

interface EventContext {
  isDown: boolean
  prevX: number,
  prevY: number,
  currentX: number,
  currentY: number,
}

function useListenerGesture ( domRef: React.RefObject<HTMLDivElement> ) {
  const context = useRef<EventContext>( {
    isDown: false,
    prevX: 0,
    prevY: 0,
    currentX: 0,
    currentY: 0,
  } )
  useEffect( () => {
    if ( domRef.current ) {
      domRef.current.onmousedown = function ( event ) {
        context.current.isDown = true
        context.current.prevX = event.x
        context.current.prevY = event.y
      }
      domRef.current.onmousemove = function ( event ) {
        context.current.currentX = event.x
        context.current.currentY = event.y
      }
      document.documentElement.onmouseup = function ( event ) {
        context.current.isDown = false
      }
    }
    return function () {
      if ( domRef.current ) {
        domRef.current.onmousedown = null;
        domRef.current.onmousemove = null;
        document.documentElement.onmouseup = null;
      }
    }
  }, [] )
}

function useMountEvent<T = undefined> ( domRef: React.RefObject<HTMLDivElement>, deps: T[] ) {
}

export interface PullRefreshProps {
  children: React.FC<any>
}


export function PullRefresh ( props: PullRefreshProps ) {
  const containerRef = useRef<HTMLDivElement>( null )
  useListenerGesture( containerRef )
  const { children } = props
  return (
    <div ref={ containerRef }>
      { children }
    </div>
  )
}
